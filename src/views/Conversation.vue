<template>
  <div v-if="conversation" class="conversation-header h-[5%] bg-gray-200 flex items-center justify-between border-b border-gray-300 px-2">
    <h3 class="font-semibold text-gray-900">{{conversation.title}}</h3>
    <span class="text-sm text-gray-500">{{dayjs(conversation.updatedAt).format('YYYY-MM-DD HH:mm:ss')}}</span>
  </div>
  <div class="w-[80%] mx-auto h-[80%] overflow-y-auto pt-2" v-if="filteredMessages?.length">
     <MessageList :messages="filteredMessages" />
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
import { ConversationProps, CreateChatProps, MessageProps, MessageStatus, UpdatedStreamData } from '../types'
import { useRoute } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { db } from "../db";
import dayjs from "dayjs";

const route = useRoute()
const filteredMessages = ref<MessageProps[]>([])
const conversation = ref<ConversationProps>()

const conversationId = computed(() => parseInt(route.params.id as string))
const initMessageId = computed(() => parseInt(route.query.init as string))

const CreateInitMessage = async () => {
  // step1 先创建一条空的loading信息
  const newMessageId = await db.messages.add({
    content: '',
    type: 'answer',
    conversationId: conversationId.value,
    status: 'loading',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
  filteredMessages.value = await db.messages.where({ conversationId: conversationId.value }).toArray()

  // step2 使用上步的messageID，向主线程发送聊天请求
  if (conversation.value) {
    const  message = await db.messages.where({ id: initMessageId.value }).first()

    const provider = await db.providers.where({ id: conversation.value?.providerId }).first()
    if (provider) {
      const data: CreateChatProps = {
        content: message?.content || '',
        providerName: provider.name,
        selectedModel: conversation.value.selectedModel,
        messageId: newMessageId,
      }
      await window.electronAPI.startChat(data)
    }
  }
}

watch(() => route.params.id, async (newId) => {
  const id = parseInt(newId as string)
  filteredMessages.value = await db.messages.where({ conversationId: id }).toArray()
  conversation.value = await db.conversations.where({ id }).first()
})

onMounted(async () => {
  conversation.value = await db.conversations.where({ id: conversationId.value }).first()
  filteredMessages.value = await db.messages.where({ conversationId: conversationId.value }).toArray()
  if (initMessageId.value) {
    await CreateInitMessage()
  }
  window.electronAPI.onUpdateMessage(async (streamData: UpdatedStreamData) => {
    const { messageId, data } = streamData
    const currentMessage = await db.messages.where({ id: messageId }).first()
    if (currentMessage) {
      const { is_end,result } = data
      const updatedMessage = {
        content: currentMessage.content + result,
        updatedAt: new Date().toISOString(),
        status: is_end ? 'finished' : 'streaming' as MessageStatus,
      }
      await db.messages.update(messageId, updatedMessage)
      const index = filteredMessages.value?.findIndex(item => item.id === messageId)
      filteredMessages.value.splice(index, 1, {
        ...currentMessage,
        ...updatedMessage,
      })
    }
  })
})
</script>
