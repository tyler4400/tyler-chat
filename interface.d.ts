import { CreateChatProps, OnUpdatedCallback, SelectFile, AppConfig, ProviderName, TestConnectionResult } from './src/types'
export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void;
  onUpdateMessage: (callback: OnUpdatedCallback) => any;
  selectFile: SelectFile
  getConfig: () => Promise<AppConfig>;
  updateConfig: (config: Partial<AppConfig>) => Promise<AppConfig>;
  testProviderConnection: (providerName: ProviderName) => Promise<TestConnectionResult>;
}
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
