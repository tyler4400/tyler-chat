import { BaseProvider } from './BaseProvider'
import { QianfanProvider } from './QianfanProvider'
import { OpenAIProvider } from './OpenAIProvider'
import { systemConfig } from "../utils";
import { ProviderName } from "../types";

export async function createProvider(providerName: ProviderName): Promise<BaseProvider>{
  const config = await systemConfig.load()
  const providerConfig = config.providerConfigs[providerName]

  switch (providerName) {
    case 'qianfan':
      if (!providerConfig.accessKey || !providerConfig.secretKey) {
        throw new Error('缺少千帆API配置：请在设置中配置 accessKey 和 secretKey')
      }
      return new QianfanProvider(providerConfig.accessKey, providerConfig.secretKey)
    case 'dashscope':
      if (!providerConfig.apiKey || !providerConfig.baseURL) {
        throw new Error('缺少通义千问 API配置：请在设置中配置 apiKey 和 baseUrl')
      }
      return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseURL)
    case 'deepseek':
      if (!providerConfig.apiKey || !providerConfig.baseURL) {
        throw new Error('缺少DeepSeek API配置：请在设置中配置 apiKey 和 baseUrl')
      }
      return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseURL)
    default:
      throw new Error(`Unsupported provider: ${providerName}`)
  }
}
