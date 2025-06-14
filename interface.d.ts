import { CreateChatProps, OnUpdatedCallback, SelectFile } from './src/types'
export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void;
  onUpdateMessage: (callback: OnUpdatedCallback) => any;
  selectFile: SelectFile
}
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
