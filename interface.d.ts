import { CreateChatProps, OnUpdatedCallback } from './src/types'
export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void;
  onUpdateMessage: (callback: OnUpdatedCallback) => any;
  selectFile: (fileType?: string[]) => Promise<{ canceled: boolean, filePaths: string[] }>
}
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
