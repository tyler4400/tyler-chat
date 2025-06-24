import { defineStore } from "pinia";
import { computed, ref, watchEffect } from "vue";
import { ConversationProps, MessageProps } from "../types";
import { db } from "../db";
import { useRoute, useRouter } from "vue-router";

export const useConversationStore = defineStore('conversation', () => {
	const route = useRoute()
	const router = useRouter()

	const conversations = ref<ConversationProps[]>([])

	const selectedId = ref(-1)

	// 动态设置selectedConversationId值。具体做法是watch路由，/conversation/:id路由下动态设置Id， 非/conversation/:id路由将Id设置为-1
	watchEffect(() => {
		if (route.path.startsWith('/conversation/') && route.params.id) {
			selectedId.value = parseInt(route.params.id as string);
		} else {
			selectedId.value = -1;
		}
	})

	const fetchConversations = async () => {
		conversations.value = await db.conversations.toArray()
	}

	const deleteConversation = async (id: number) => {
		await db.conversations.delete(id)
		await db.messages.where('conversationId').equals(id).delete()
		await fetchConversations()
		if (selectedId.value === id) {
			await router.push('/')
		}
	}

	const createConversation = async (createData: Omit<ConversationProps, 'id' | 'createdAt' | 'updatedAt'>) =>{
		const id = await db.conversations.add({
			...createData,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		})
		await fetchConversations()
		return id
	}

	const getConversationById = (conversationId: number) => {
		return conversations.value.find(item => item.id === conversationId)
	}

	const addNewMessage = (...args: Parameters<typeof db.messages.add>) => {
		return db.messages.add(...args)
	}

	const totalNumber = computed(() => conversations.value.length)

	return {
		conversations,
		createConversation,
		fetchConversations,
		deleteConversation,
		getConversationById,
		addNewMessage,
		totalNumber,
		selectedId,
	}
})
