import OpenAI from 'openai'
import { BaseProvider } from './BaseProvider'
import { ChatMessageProps } from '../types'
import { ChatCompletionCreateParamsStreaming } from "openai/resources/chat/completions/completions";
import { convertMessages } from "../utils";

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
    return stream
  }
}
