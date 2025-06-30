import { app, BrowserWindow, ipcMain, dialog, protocol, net, Notification } from 'electron'
import path from 'node:path'
import started from 'electron-squirrel-startup'
import { AppConfig, CreateChatProps, ProviderName } from './types'
import 'dotenv/config'
import fs from 'node:fs/promises'
import * as url from 'node:url'
import { createProvider } from './providers/createProvider'
import { systemConfig } from './utils'
import { createMenu, updateMenu } from "./menu";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

/**
 * window上可能需要额外的步骤  注册安全协议
 * https://coding.imooc.com/learn/questiondetail/pylDvPyEva1PkBNm.html
 */
// protocol.registerSchemesAsPrivileged([
//   {
//     scheme: 'tyler-file',
//     privileges: {
//       standard: true,
//       secure: true,
//       supportFetchAPI: true,
//     },
//   },
// ])

const copyImageToUserDir = async (imagePath: string) => {
  const userDataPath = app.getPath('userData')
  const userImageDir = path.join(userDataPath, 'images')
  await fs.mkdir(userImageDir, { recursive: true })
  const imageName = path.basename(imagePath)
  const destPath = path.join(userImageDir, imageName)
  await fs.copyFile(imagePath, destPath)
  return destPath
}

const createWindow = async () => {
  // 初始化配置
  const config = await systemConfig.load()
  console.log('[tyler-chat] 初始系统配置为', config)

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // spellcheck: false,
      // enableWebSQL: false,
    },
    // titleBarStyle: 'hiddenInset',
    // vibrancy: 'under-window',
    // visualEffectState: 'active',
  })

  createMenu(mainWindow)


  protocol.handle('tyler-file', async (req) => {
    console.log('tyler-file::req', req)
    const filePath = decodeURIComponent(req.url.slice('tyler-file://'.length))
    // const data = await fs.readFile(filePath)
    // return new Response(data, {
    //   headers: {
    //     'Content-Type': lookup(filePath) as string
    //   },
    //   status: 200,
    // })
    const dataUrl = url.pathToFileURL(filePath).toString()
    return net.fetch(dataUrl)
  })

  ipcMain.handle(
    'select-file',
    async (event, fileType: string[] = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp']) => {
      const { canceled, filePaths } = await dialog.showOpenDialog({
        title: '请选择文件',
        filters: [{ name: 'files', extensions: fileType }],
        properties: ['openFile'],
      })
      if (canceled) {
        console.log('用户取消选择')
        return { canceled, filePaths: [] }
      }
      console.log('用户选择的文件：', filePaths.join('\n'))
      const filePath = await copyImageToUserDir(filePaths[0])
      return { canceled, filePaths: [filePath] }
    }
  )

  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    console.log('start-chat', data)
    const { providerName, messageId, selectedModel, messages } = data

    // 检查窗口是否已销毁
    if (mainWindow.isDestroyed()) {
      console.log('Window has been destroyed, cannot send messages')
      return
    }

    try {
      const provider = await createProvider(providerName)
      const stream = await provider.chat(messages, selectedModel)
      for await (const chunk of stream) {
        console.log('the chunk', chunk)
        const content = { messageId, data: chunk }
        mainWindow.webContents.send('update-message', content)
      }
    } catch (error) {
      console.error('Error in chat stream:', error)
      mainWindow.webContents.send('update-message', {
        messageId,
        errorMsg: error.message,
      })
    }
  })

  ipcMain.handle('get-config', async () => {
    return await systemConfig.load()
  })

  ipcMain.handle('update-config', async (event, newConfig: AppConfig) => {
    if (newConfig.language) {
      updateMenu(mainWindow)
    }
    return await systemConfig.update(newConfig)
  })

  // 添加测试provider连通性的IPC处理
  ipcMain.handle('test-provider-connection', async (event, providerName: ProviderName) => {
    try {
      const provider = await createProvider(providerName)
      const result = await provider.testConnection()
      return result
    } catch (error: any) {
      return {
        success: false,
        message: `创建provider失败：${error.message}`,
      }
    }
  })

  // 下载配置文件
  ipcMain.handle('download-config', async () => {
    try {
      const result = await dialog.showSaveDialog({
        title: '保存配置文件',
        defaultPath: `tyler-chat-config-${new Date().toISOString().split('T')[0]}.json`,
        filters: [
          { name: 'JSON 文件', extensions: ['json'] },
          { name: '所有文件', extensions: ['*'] },
        ],
      })

      if (result.canceled || !result.filePath) {
        return { success: false, message: '用户取消了保存操作' }
      }

      const config = await systemConfig.load()
      const configJson = JSON.stringify(config, null, 2)
      await fs.writeFile(result.filePath, configJson, 'utf-8')

      // 显示成功通知
      new Notification({
        title: '配置文件下载',
        body: '配置文件保存成功！',
      }).show()

      return { success: true, message: '配置文件保存成功' }
    } catch (error) {
      // 显示失败通知
      new Notification({
        title: '配置文件下载',
        body: `保存失败: ${error.message}`,
      }).show()

      return { success: false, message: `保存失败: ${error.message}` }
    }
  })

  // 显示系统通知
  ipcMain.on('show-notification', (event, { title, body }: { title: string; body: string }) => {
    new Notification({
      title,
      body,
    }).show()
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 全局未捕获异常处理
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error)
  dialog.showErrorBox('应用程序错误', `发生未捕获的异常: ${error.message}`)
})

// 全局未处理的 Promise 拒绝处理
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason)
  dialog.showErrorBox('Promise 错误', `未处理的 Promise 拒绝: ${reason}`)
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
