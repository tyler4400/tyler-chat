import { Ref, ref, watch } from "vue";
import { MessageProps, UpdatedStreamData } from "../types";
import { db } from "../db";


export const useMessage = (conversationId: Ref<number>) => {
	const messages = ref<MessageProps[]>([])

	const fetchMessages = async () => {
		messages.value = await db.messages.where({ conversationId: conversationId.value }).toArray()
	}

	watch(conversationId, async () => await fetchMessages(), { immediate: true})

	const createMessage = async (message: Omit<MessageProps, 'id' | 'createdAt' | 'updatedAt'>) => {
		const id = await db.messages.add({
			...message,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		})
		await fetchMessages()
		return id
	}

	const updateStreamMessage = async (message: UpdatedStreamData) => {
		const { messageId, data } = message
		const currentMessage = await db.messages.where({ id: messageId }).first()
		 if (currentMessage) {
			 const { is_end, result } = data
			 const updatedMessage: Partial<MessageProps> = {
				 content: currentMessage.content + result,
				 updatedAt: new Date().toISOString(),
				 status: is_end ? 'finished' : 'streaming',
			 }
			 await db.messages.update(messageId, updatedMessage)
			 const index = messages.value?.findIndex(item => item.id === messageId)
			 messages.value.splice(index, 1, {
				 ...currentMessage,
				 ...updatedMessage,
			 })
		 }
	}

	return {
		messages,
		fetchMessages,
		createMessage,
		updateStreamMessage,
	}
}
