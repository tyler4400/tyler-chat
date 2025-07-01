<template>
  <div v-if="currentConversation" class="conversation-header h-[5%] bg-gray-200 flex items-center justify-between border-b border-gray-300 px-2">
    <h3 class="font-semibold text-gray-900">{{currentConversation.title}}</h3>
    <span class="text-sm text-gray-500">{{dayjs(currentConversation.updatedAt).format('YYYY-MM-DD HH:mm:ss')}}</span>
  </div>
  <div class="w-full mx-auto h-[80%] overflow-y-auto pt-2 px-6" v-if="messages.length" @wheel="takeoverScroll">
     <MessageList ref="messageListRef" :messages="messages" />
  </div>
  <div class="w-[80%] mx-auto h-[80%] flex justify-center items-center" v-else>
    <Icon icon="hugeicons:license-no" width="124" height="124" class="text-gray-300" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] pt-2">
    <MessageInput @send="askNewQuestion" />
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import MessageInput from '../components/MessageInput.vue'
import MessageList from '../components/MessageList.vue';
import { CreateChatProps, MessageListInstance, SendMsg } from '../types'
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from "vue";
import dayjs from "dayjs";
import { useMessage } from "../hooks/useMessage";
import { useConversationStore } from "../stores/useConversationStore";
import { useProviderStore } from "../stores/useProviderStore";
import { useLoadingMsgStore } from "../stores/useLoadingMsgStore";

const messageListRef = useTemplateRef<MessageListInstance>('messageListRef')

const route = useRoute()
const initMessageId = computed(() => parseInt(route.query.init as string))
const conversationId = computed(() => parseInt(route.params.id as string))

const enableAutoScroll = ref<boolean>(true)

const loadingMsgStore = useLoadingMsgStore()
const providerStore = useProviderStore()
const conversationStore = useConversationStore()
const currentConversation = computed(() => conversationStore.getConversationById(conversationId.value))

const { messages, updateStreamMessage, createMessage, deleteMessage } = useMessage(conversationId)

const sentMessages = computed<SendMsg[]>(() => messages.value
    .filter(message => message.status !== 'loading')
    .map(msg => ({
      role: msg.type === 'question' ? 'user' : 'assistant',
      content: msg.content,
      ...(msg.imagePath && { imagePath: msg.imagePath })
    }))
)

const getAnswerMsg = async () => {
  enableAutoScroll.value = true
  // step1 先创建一条空的loading信息
  loadingMsgStore.setLoading(true)
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
      window.electronAPI.startChat(data)
    }
  }
}

const askNewQuestion = async (question: string, imagePath?: string) => {
  await createMessage({
    content: question,
    type: 'question',
    conversationId: conversationId.value,
    ...(imagePath && { imagePath })
  })
  await getAnswerMsg()
}

onMounted(async () => {
  if (initMessageId.value) {
    await getAnswerMsg()
  }

  // 这两个注册事件应该在组件卸载的时候清除
  window.electronAPI.onUpdateMessage(updateStreamMessage)
  window.electronAPI.onDeleteMessage(deleteMessage)
})

watch(messages, async () => {
  if (!enableAutoScroll.value) return
  await nextTick()
  if (messageListRef.value) {
    messageListRef.value.scrollIntoView()
  }
}, { deep: 1, immediate: true })

// 监听用户滚动事件
const takeoverScroll = () => {
  enableAutoScroll.value = false
}

onBeforeRouteUpdate(() => {
  enableAutoScroll.value = true
})
</script>
