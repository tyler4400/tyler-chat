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
