<template>
  <div class="w-[80%] h-full mx-auto">
    <div class="h-[85%] flex items-center">
      <ProviderSelect v-model="currentProvider" :items="providerStore.providers" />
    </div>
    <div class="h-[15% flex items-start pt-2">
      <MessageInput @send="createConversation" :disabled-input="!currentProvider" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageInput from '../components/MessageInput.vue'
import { db } from "../db";
import { useConversationStore } from "../stores/useConversationStore";
import { useProviderStore } from "../stores/useProviderStore";

const router = useRouter()

const conversationStore = useConversationStore()
const providerStore = useProviderStore()

const currentProvider = ref<string>('')
const modelInfo = computed(() => {
  const [ providerId, selectedModel ] = currentProvider.value.split('/')
  return {
    providerId: parseInt(providerId),
    selectedModel
  }
})
const createConversation = async (content: string) => {
  const { providerId, selectedModel } = modelInfo.value

  const conversationId = await conversationStore.createConversation({
    title: content,
    providerId,
    selectedModel,
  })
  const newMessageId = await db.messages.add({
    content,
    conversationId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    type: 'question'
  })
  await router.push(`/conversation/${conversationId}?init=${newMessageId}`) // t通过init来判断是否是新建对话
}
</script>
