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
	(e: 'send', value: string): void;
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
	status?: MessageStatus;
	createdAt: string;
	updatedAt: string;
}

export interface CreateChatProps {
	messages: { role: string; content: string}[];
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
export type OnSelectFile = (fileType?: string[]) => Promise<string>
