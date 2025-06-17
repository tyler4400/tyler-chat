import { BaseProvider } from './BaseProvider'
import { QianfanProvider } from './QianfanProvider'
import { OpenAIProvider } from './OpenAIProvider'

export function createProvider(providerName: string): BaseProvider {
  switch (providerName) {
    case 'qianfan':
      return new QianfanProvider(process.env['QIANFAN_ACCESS_KEY'] as string, process.env['QIANFAN_SECRET_KEY'] as string)
    case 'dashscope':
      return new OpenAIProvider(process.env['ALI_API_KEY'] as string, 'https://dashscope.aliyuncs.com/compatible-mode/v1')
    default:
      throw new Error(`Unsupported provider: ${providerName}`)
  }
}
