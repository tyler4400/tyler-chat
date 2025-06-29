import {
  CreateChatProps,
  OnUpdatedCallback,
  SelectFile,
  AppConfig,
  ProviderName,
  TestConnectionResult,
} from './src/types'
export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void
  onUpdateMessage: (callback: OnUpdatedCallback) => any
  selectFile: SelectFile
  getConfig: () => Promise<AppConfig>
  updateConfig: (config: Partial<AppConfig>) => Promise<AppConfig>
  testProviderConnection: (providerName: ProviderName) => Promise<TestConnectionResult>
  downloadConfig: () => Promise<{ success: boolean; message?: string }>
  showNotification: (options: { title: string; body: string }) => void
}
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
