import Dexie, { EntityTable } from "dexie";
import { ConversationProps, MessageProps, ProviderProps } from "./types";
import { providers } from "./DBInitData";

export const db = new Dexie('tylerChatDB') as Dexie & {
	providers: EntityTable<ProviderProps, 'id'>;
	conversations: EntityTable<ConversationProps, 'id'>;
	messages: EntityTable<MessageProps,'id'>;
}

db.version(1).stores({
	providers: '++id, name',
	conversations: "++id, providerId",
	messages: '++id, conversationId',
})

export const initProviders = async () => {
	const count = await db.providers.count()
	if (count === 0) {
		db.providers.bulkAdd(providers)
		console.log('[tyler-chat] 未找到模型配置，加载默认providers', providers)
	}
}
