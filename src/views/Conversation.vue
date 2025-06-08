<template>
  <div v-if="currentConversation" class="conversation-header h-[5%] bg-gray-200 flex items-center justify-between border-b border-gray-300 px-2">
    <h3 class="font-semibold text-gray-900">{{currentConversation.title}}</h3>
    <span class="text-sm text-gray-500">{{dayjs(currentConversation.updatedAt).format('YYYY-MM-DD HH:mm:ss')}}</span>
  </div>
  <div class="w-[80%] mx-auto h-[80%] overflow-y-auto pt-2" v-if="messages.length">
     <MessageList :messages="messages" />
  </div>
  <div class="w-[80%] mx-auto h-[80%] flex justify-center items-center" v-else>
    <Icon icon="hugeicons:license-no" width="124" height="124" class="text-gray-300" />
  </div>
  <div class="w-[80%] mx-auto h-[15%]">
    <MessageInput />
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import MessageInput from '../components/MessageInput.vue'
import MessageList from '../components/MessageList.vue';
import { CreateChatProps } from '../types'
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import dayjs from "dayjs";
import { useMessage } from "../hooks/useMessage";
import { useConversationStore } from "../stores/useConversationStore";
import { useProviderStore } from "../stores/useProviderStore";

const route = useRoute()
const initMessageId = computed(() => parseInt(route.query.init as string))
const conversationId = computed(() => parseInt(route.params.id as string))

const providerStore = useProviderStore()
const conversationStore = useConversationStore()
const currentConversation = computed(() => conversationStore.getConversationById(conversationId.value))

const { messages, updateStreamMessage, createMessage } = useMessage(conversationId)

const sentMessages = computed(() => messages.value
    .filter(message => message.status !== 'loading')
    .map(msg => ({
      role: msg.type === 'question' ? 'user' : 'assistant',
      content: msg.content,
    }))
)

const CreateInitMessage = async () => {
  // step1 先创建一条空的loading信息
  const newMessageId = await createMessage({
    content: '',
    type: 'answer',
    conversationId: conversationId.value,
    status: 'loading',
  })

  // step2 使用上步的messageID，向主线程发送聊天请求
  if (currentConversation.value) {
    const provider = providerStore.getProviderById(currentConversation.value.providerId)
    if (provider) {
      const data: CreateChatProps = {
        messages: sentMessages.value,
        providerName: provider.name,
        selectedModel: currentConversation.value.selectedModel,
        messageId: newMessageId,
      }
      await window.electronAPI.startChat(data)
    }
  }
}

onMounted(async () => {
  if (initMessageId.value) {
    await CreateInitMessage()
  }
  window.electronAPI.onUpdateMessage(updateStreamMessage)
})
</script>
