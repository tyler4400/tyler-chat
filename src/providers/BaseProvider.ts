import { ChatMessageProps, TestConnectionResult, UniversalChunkProps } from '../types'
export abstract class BaseProvider {
  abstract chat(messages: ChatMessageProps[], modelName: string): Promise<AsyncIterable<UniversalChunkProps>>;

  abstract testConnection(): Promise<TestConnectionResult>

  protected abstract transformResponse(chunk: any): UniversalChunkProps
}
