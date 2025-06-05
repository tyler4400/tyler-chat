<template>
  <div class="w-[80%] h-full mx-auto">
    <div class="h-[85%] flex items-center">
      <ProviderSelect v-model="currentProvider" :items="providers" />
    </div>
    <div class="h-[15% flex items-start">
      <MessageInput @send="createConversation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageInput from '../components/MessageInput.vue'
import { db } from "../db";
import { ProviderProps } from "../types";

const router = useRouter()

const providers = ref<ProviderProps[]>([])
onMounted(async () => {
  providers.value = await db.providers.toArray()
})
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
  // todo 校验是否选择模型
  const currentDate = new Date().toISOString()
  const conversationId = await db.conversations.add({
    title: content,
    providerId,
    selectedModel,
    createdAt: currentDate,
    updatedAt: currentDate,
  })
  const newMessageId = await db.messages.add({
    content,
    conversationId,
    createdAt: currentDate,
    updatedAt: currentDate,
    type: 'question'
  })
  await router.push(`/conversation/${conversationId}?init=${newMessageId}`) // t通过init来判断是否是新建对话
}
</script>
