import { ChatCompletion } from "@baiducloud/qianfan"
import { BaseProvider } from './BaseProvider'
import { ChatMessageProps } from '../types'

export class QianfanProvider extends BaseProvider {
  private client: any;
  constructor(accessKey: string, secretKey: string) {
    super()
    this.client = new ChatCompletion({ QIANFAN_ACCESS_KEY: accessKey, QIANFAN_SECRET_KEY: secretKey })
  }
  async chat(messages: ChatMessageProps[], model: string) {
    const stream = await this.client.chat({
      messages,
      stream: true
    }, model)
    return stream
  }
}