import { app, Menu, BrowserWindow, MenuItemConstructorOptions } from 'electron'
import en from "./i18n/en";
import zh from "./i18n/zh";
import { systemConfig } from "./utils";
import { LanguageType } from "./types";
import path from 'node:path'
import pkg from '../package.json'

type MessageSchema = typeof zh
const messages: Record<string, MessageSchema> = {
  en,
  zh
}

// 创建一个通用的翻译函数
const createTranslator = async () => {
  const config = await systemConfig.load()
  return (key: string) => {
    const keys = key.split('.')
    let result: any = messages[config.language]
    for (const k of keys) {
      result = result[k]
    }
    return result as string
  }
}

export const createContextMenu = async (win: BrowserWindow, id: number) => {
  const t = await createTranslator()
  const template = [
    {
      label: t('contextMenu.deleteMessage'),
      click: () => {
        win.webContents.send('delete-message', id)
      }
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.popup({ window: win })
}

export const createMenu = async (mainWindow: BrowserWindow, language?: LanguageType) => {
  let lan = language
  if (!lan) {
    lan = (await systemConfig.load()).language
  }
  const t = (key: string) => {
    const keys = key.split('.')
    let result: any = messages[lan]
    for (const k of keys) {
      result = result[k]
    }
    return result as string
  }

  const template: (MenuItemConstructorOptions)[] = [
    {
      label: 'about',
      click: () => {
        // 打开新的小点窗口， 展示作者 ，GitHub链接， electron，vue，vite版本号
        const { app } = require('electron')
        const aboutWindow = new BrowserWindow({
          width: 450,
          height: 400,
          modal: true,
          parent: mainWindow,
          resizable: false,
          minimizable: false,
          maximizable: false,
          webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            additionalArguments: [
              `appVersion=${app.getVersion()}`,
              `electronVersion=${process.versions.electron}`,
              `vueVersion=${pkg.dependencies.vue?.replace('^', '') || '-'}`,
              `viteVersion=${pkg.devDependencies.vite?.replace('^', '') || '-'}`
            ]
          },
          title: t('about.title'),
          show: false,
        })

        aboutWindow.center()
        aboutWindow.loadFile(path.join(__dirname, '../about.html'))
        aboutWindow.once('ready-to-show', () => {
          aboutWindow.show()
        })
      }
    },
    {
      label: app.name,
      submenu: [
        {
          label: t('menu.app.newConversation'),
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('menu-new-conversation')
          }
        },
        {
          label: t('menu.app.settings'),
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            mainWindow.webContents.send('menu-open-settings')
          }
        },
        { type: 'separator' },
        {
          role: 'quit',
          label: t('menu.app.quit')
        }
      ]
    },
    {
      label: t('menu.edit.title'),
      submenu: [
        {
          role: 'undo',
          label: t('menu.edit.undo')
        },
        {
          role: 'redo',
          label: t('menu.edit.redo')
        },
        { type: 'separator' },
        {
          role: 'cut',
          label: t('menu.edit.cut')
        },
        {
          role: 'copy',
          label: t('menu.edit.copy')
        },
        {
          role: 'paste',
          label: t('menu.edit.paste')
        },
        {
          role: 'selectAll',
          label: t('menu.edit.selectAll')
        },
        ...(process.platform === 'darwin' ? [
          { type: 'separator' as const },
          {
            label: t('menu.edit.speech.title'),
            submenu: [
              {
                role: 'startSpeaking',
                label: t('menu.edit.speech.startSpeaking')
              },
              {
                role: 'stopSpeaking',
                label: t('menu.edit.speech.stopSpeaking')
              }
            ]
          },
          {
            role: 'emoji',
            label: t('menu.edit.emoji')
          }
        ] as MenuItemConstructorOptions[] : [])
      ]
    },
    {
      label: t('menu.view.title'),
      submenu: [
        {
          role: 'reload',
          label: t('menu.view.reload')
        },
        {
          role: 'forceReload',
          label: t('menu.view.forceReload')
        },
        {
          role: 'toggleDevTools',
          label: t('menu.view.toggleDevTools')
        },
        { type: 'separator' },
        {
          role: 'resetZoom',
          label: t('menu.view.resetZoom')
        },
        {
          role: 'zoomIn',
          label: t('menu.view.zoomIn')
        },
        {
          role: 'zoomOut',
          label: t('menu.view.zoomOut')
        },
        { type: 'separator' },
        {
          role: 'togglefullscreen',
          label: t('menu.view.togglefullscreen')
        }
      ]
    },
    ...(process.platform === 'darwin' ? [{
      role: 'windowMenu' as const
    }] : [])
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// 导出一个更新菜单的函数，在语言改变时调用
export const updateMenu = (mainWindow: BrowserWindow, language?: LanguageType) => {
  createMenu(mainWindow, language)
}

