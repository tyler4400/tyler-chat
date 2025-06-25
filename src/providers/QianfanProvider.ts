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

  /**
   * 测试百度千帆API的连通性
   * 发送一个简单的测试消息来验证access key和secret key是否正确
   */
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      // 发送一个简单的测试消息
      const testMessages = [{ role: 'user', content: '你好' }];
      const stream = await this.client.chat({
        messages: testMessages as any,
        stream: false // 使用非流式请求进行测试
      }, 'ERNIE-Speed-128K') as any;

      if (stream && stream.result) {
        return {
          success: true,
          message: '连接成功！API配置正确'
        };
      } else {
        return {
          success: false,
          message: '连接失败：响应格式异常'
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `连接失败：${error.message || '未知错误'}`
      };
    }
  }

  protected transformResponse(chunk: BaiduChunkProps): UniversalChunkProps {
    return {
      is_end: chunk.is_end,
      result: chunk.result
    }
  }
}
