import { AppConfig, ProviderConfig, ProviderConfigItem, ProviderName } from "../../types";


// 百度文心一言配置
export const qianfanConfig: ProviderConfigItem[] = [
  {
    key: 'accessKey',
    label: 'Access Key',
    value: '',
    type: 'text',
    required: true,
    placeholder: '请输入Access Key'
  },
  {
    key: 'secretKey',
    label: 'Secret Key',
    value: '',
    type: 'password',
    required: true,
    placeholder: '请输入Secret Key'
  }
];

// API Key + Base URL 通用配置模板
export const apiKeyBaseUrlConfig: ProviderConfigItem[] = [
  {
    key: 'apiKey',
    label: 'API Key',
    value: '',
    type: 'password',
    required: true,
    placeholder: '请输入API Key'
  },
  {
    key: 'baseURL',
    label: 'Base URL',
    value: '',
    type: 'text',
    required: false,
    placeholder: '请输入API基础URL'
  }
];

// 所有Provider的配置映射
export const providerConfigs: Record<ProviderName, ProviderConfigItem[]> = {
  qianfan: qianfanConfig,
  dashscope: apiKeyBaseUrlConfig,
  deepseek: apiKeyBaseUrlConfig,
  openai: apiKeyBaseUrlConfig,
};
