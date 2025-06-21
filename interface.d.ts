import { CreateChatProps, OnUpdatedCallback, SelectFile, AppConfig } from './src/types'
export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void;
  onUpdateMessage: (callback: OnUpdatedCallback) => any;
  selectFile: SelectFile
  getConfig: () => Promise<AppConfig>;
  updateConfig: (config: Partial<AppConfig>) => Promise<AppConfig>;
}
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
