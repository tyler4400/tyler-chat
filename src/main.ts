import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import started from 'electron-squirrel-startup'
import { CreateChatProps } from './types'
import { ChatCompletion } from '@baiducloud/qianfan'
import { ChatBody, RespBase } from '@baiducloud/qianfan/dist/src/interface'
import { OpenAI } from 'openai'
import 'dotenv/config'
import { ChatCompletionCreateParamsStreaming } from 'openai/resources/chat/completions/completions'

// import { qianfanDemo } from "./example/baidu_qianfan";
// import { aliDemo2 } from "./example/ali_bailian";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
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
      if (providerName === 'qianfan') {
        const client = new ChatCompletion()
        const stream = (await client.chat(
          {
            messages: messages as ChatBody['messages'],
            stream: true,
          },
          selectedModel
        )) as AsyncIterable<RespBase>

        for await (const chunk of stream) {
          const { is_end, result } = chunk
          const content = {
            messageId,
            data: { is_end, result },
          }
          mainWindow.webContents.send('update-message', content)
        }
      } else if (providerName === 'dashscope') {
        const client = new OpenAI({
          apiKey: process.env['ALI_API_KEY'],
          baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        })
        const stream = await client.chat.completions.create({
          messages: messages as ChatCompletionCreateParamsStreaming['messages'],
          model: selectedModel,
          stream: true,
        })

        for await (const chunk of stream) {
          const choice = chunk.choices[0]
          const content = {
            messageId,
            data: {
              is_end: choice.finish_reason === 'stop',
              result: choice.delta.content || '',
            },
          }
          mainWindow.webContents.send('update-message', content)
        }
      } else {
        throw new Error('Provider not supported')
      }
    } catch (error) {
      console.error('Error in chat stream:', error)
      mainWindow.webContents.send('update-message', {
        messageId,
        errorMsg: error.message,
      })
    }
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
