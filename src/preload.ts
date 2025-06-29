// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'
import { AppConfig, CreateChatProps, OnUpdatedCallback, ProviderName, TestConnectionResult } from './types'
contextBridge.exposeInMainWorld('electronAPI', {
  startChat: (data: CreateChatProps) => ipcRenderer.send('start-chat', data),
  onUpdateMessage: (callback: OnUpdatedCallback) => ipcRenderer.on('update-message', (_event, data) => callback(data)),
  selectFile: (fileType?: string[]): Promise<{ canceled: boolean, filePaths: string[] }> => ipcRenderer.invoke('select-file', fileType),
  getConfig: () => ipcRenderer.invoke('get-config'),
  updateConfig: (newConfig: Partial<AppConfig>): Promise<AppConfig> => ipcRenderer.invoke('update-config', newConfig),
  testProviderConnection: (providerName: ProviderName): Promise<TestConnectionResult> => ipcRenderer.invoke('test-provider-connection', providerName),
  downloadConfig: (): Promise<{ success: boolean; message?: string }> => ipcRenderer.invoke('download-config'),
})
