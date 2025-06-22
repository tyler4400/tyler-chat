import { app, BrowserWindow, ipcMain, dialog, protocol, net } from 'electron'
import path from 'node:path'
import started from 'electron-squirrel-startup'
import { AppConfig, CreateChatProps } from './types'
import 'dotenv/config'
import fs from 'node:fs/promises'
import * as url from 'node:url'
import { createProvider } from './providers/createProvider'
import { systemConfig } from './utils'

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
  await systemConfig.load()

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

  ipcMain.handle('select-file', async (event, fileType: string[] = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp']) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: '请选择文件',
      filters: [{ name: 'Images', extensions: fileType }],
      properties: ['openFile'],
    })
    if (canceled) {
      console.log('用户取消选择')
      return { canceled, filePaths: [] }
    }
    console.log('用户选择的文件：', filePaths.join('\n'))
    const filePath = await copyImageToUserDir(filePaths[0])
    return { canceled, filePaths: [filePath] }
  })

  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    console.log('start-chat', data)
    const { providerName, messageId, selectedModel, messages } = data

    // 检查窗口是否已销毁
    if (mainWindow.isDestroyed()) {
      console.log('Window has been destroyed, cannot send messages')
      return
    }

    try {
      const provider = createProvider(providerName)
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

  ipcMain.handle('get-config', () => {
    return systemConfig.get()
  })

  ipcMain.handle('update-config', async (event, newConfig: AppConfig) => {
    return await systemConfig.update(newConfig)
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
