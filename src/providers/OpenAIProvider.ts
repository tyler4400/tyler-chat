import OpenAI from 'openai'
import { BaseProvider } from './BaseProvider'
import { ChatMessageProps, UniversalChunkProps } from '../types'
import { ChatCompletionCreateParamsStreaming } from "openai/resources/chat/completions/completions";
import { convertMessages } from "../utils";
import util from 'node:util'

/**
 * # 阿里 百炼
 *   https://dashscope.console.aliyun.com/model
 * 控制台 https://bailian.console.aliyun.com/?tab=model#/api-key
  */
export class OpenAIProvider extends BaseProvider {
  private client: OpenAI;
  constructor(apiKey: string, baseURL: string) {
    super()
    this.client = new OpenAI({
      apiKey,
      baseURL
    })
  }
  async chat(messages: ChatMessageProps[], model: string) {
    const convertedMessages = await convertMessages(messages)
    const stream = await this.client.chat.completions.create({
      model,
      messages: convertedMessages as ChatCompletionCreateParamsStreaming['messages'],
      stream: true
    })

    const self = this
    return {
      async *[Symbol.asyncIterator]() {
        for await (const chunk of stream) {
          yield self.transformResponse(chunk)
        }
      }
    }
  }

  /**
   * 测试OpenAI兼容API的连通性
   * 通过调用models接口来验证API key和base URL是否正确
   */
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      // 尝试获取模型列表来测试连通性
      const models = await this.client.models.list();
      console.log('models:', util.inspect(models, { depth: null, colors: true }))
      if (models.data && models.data.length > 0) {
        return {
          success: true,
          message: `连接成功！找到 ${models.data.length} 个可用模型`
        };
      } else {
        return {
          success: false,
          message: '连接成功但未找到可用模型'
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `连接失败：${error.message || '未知错误'}`
      };
    }
  }

  protected transformResponse(chunk: OpenAI.Chat.Completions.ChatCompletionChunk): UniversalChunkProps {
      const choice = chunk.choices[0]
      return {
        is_end: choice.finish_reason === 'stop',
        result: choice.delta.content || '',
      }
  }

}
