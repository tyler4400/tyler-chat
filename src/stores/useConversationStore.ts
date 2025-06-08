import { defineStore } from "pinia";
import { computed, ref, watchEffect } from "vue";
import { ConversationProps } from "../types";
import { db } from "../db";
import { useRoute } from "vue-router";

export const useConversationStore = defineStore('conversation', () => {
	const route = useRoute()

	const conversations = ref<ConversationProps[]>([])

	const selectedId = ref(-1)
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

	const createConversation = async (createData: Omit<ConversationProps, 'id' | 'createdAt' | 'updatedAt'>) =>{
		const id = await db.conversations.add({
			...createData,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		})
		await fetchConversations()
		return id
	}

	const totalNumber = computed(() => conversations.value.length)

	return {
		conversations,
		createConversation,
		fetchConversations,
		totalNumber,
		selectedId,
	}
})
