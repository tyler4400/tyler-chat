import { ChatCompletion } from "@baiducloud/qianfan"
import { BaseProvider } from './BaseProvider'
import { BaiduChunkProps, ChatMessageProps, UniversalChunkProps } from '../types'
import { ChatBody, RespBase } from "@baiducloud/qianfan/dist/src/interface";
import { convertMessages } from "../utils";

/**
 *
 * 百度 千帆
 * 控制台 https://console.bce.baidu.com/iam/#/iam/accesslist
 * sdk https://github.com/baidubce/bce-qianfan-sdk
 * 文档 https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Zlt2agedu
  */
export class QianfanProvider extends BaseProvider {
  private client: ChatCompletion;
  constructor(accessKey: string, secretKey: string) {
    super()
    this.client = new ChatCompletion({
      QIANFAN_ACCESS_KEY: accessKey,
      QIANFAN_SECRET_KEY: secretKey,
      ENABLE_OAUTH: true,
    })
  }
  async chat(messages: ChatMessageProps[], model: string) {
    const convertedMessages = await convertMessages(messages)
    const stream = (await this.client.chat({
      messages: convertedMessages as ChatBody['messages'],
      stream: true
    }, model)) as AsyncIterable<RespBase>
    const self = this
    return {
      async *[Symbol.asyncIterator]() {
        for await (const chunk of stream) {
          yield self.transformResponse(chunk as BaiduChunkProps)
        }
      }
    }
  }

  protected transformResponse(chunk: BaiduChunkProps): UniversalChunkProps {
    return {
      is_end: chunk.is_end,
      result: chunk.result
    }
  }
}
