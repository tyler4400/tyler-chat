export interface ConversationProps {
	id: number
	title: string
	selectedModel: string
	createdAt: string
	updatedAt: string
	providerId: number
}

export interface ProviderProps {
	id: number;
	name: string; // 是唯一的
	title?: string;
	desc?: string;
	avatar?: string;
	createdAt: string;
	updatedAt: string;
	models: string[];
}

export interface MessageEmits {
	(e: 'send', value: string, imagePath?: string): void;
}

export interface MessageListInstance {
	scrollIntoView: () => void;
}

export type MessageStatus = 'loading' | 'streaming' | 'finished' | 'error'

export interface MessageProps {
	id: number;
	content: string;
	type: 'question' | 'answer';
	conversationId: number;
	imagePath?: string;
	status?: MessageStatus;
	createdAt: string;
	updatedAt: string;
}
export interface SendMsg {
	role: string;
	content: string,
	imagePath?: string
}

export interface CreateChatProps {
	messages: SendMsg[];
	providerName: string;
	selectedModel: string;
	messageId: number;
}

export interface UpdatedStreamData {
	messageId: number;
	data: {
		is_end: boolean; // 大模型的stream是否结束
		result: string;
	}
}

export interface UpdatedStreamError {
	messageId: number;
	errorMsg: string;
}
export type OnUpdatedCallback = (data: UpdatedStreamData | UpdatedStreamError) => void;
export type SelectFile = (fileType?: string[]) => Promise<{ canceled: boolean, filePaths: string[] }>

export type MsgContent = {
	type: string
	text: string
} | {
	type: string
	image_url: {
		url: string
	}
}

export interface ChatMessageProps {
	role: string;
	content: string;
	imagePath?: string;
}

export interface UniversalChunkProps {
	is_end: boolean;
	result: string;
}

export interface BaiduChunkProps {
	is_end: boolean;
	result: string;
}

export type LanguageType = 'zh' | 'en'

export interface AppConfig {
	language: LanguageType
	fontSize: number
}
