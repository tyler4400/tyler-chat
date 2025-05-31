<template>
  <div class="w-[80%] mx-auto h-[85%] overflow-y-auto pt-2">
     <MessageList :messages="filteredMessages" />
  </div>
  {{route.params}}
  <div class="w-[80%] mx-auto h-[15%]">
    <MessageInput />
  </div>
</template>

<script lang="ts" setup>
import MessageInput from '../components/MessageInput.vue'
import MessageList from '../components/MessageList.vue';
import { MessageProps } from '../types'
import { useRoute } from "vue-router";
import { computed, ref, watch, watchEffect } from "vue";

const route = useRoute()
const conversationId = computed(() => +route.params.id)
const filteredMessages = ref<MessageProps[]>()

const messages: MessageProps[] = [
  { id: 1, content: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'question', conversationId: 1 },
  { id: 2, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 1 },
  { id: 3, content: '请告诉我更多', createdAt: '2024-07-03',updatedAt: '2024-07-03',  type: 'question', conversationId: 1 },
  { id: 4, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 1 },
  { id: 5, content: '还有更多的信息吗', createdAt: '2024-07-03', type: 'question', updatedAt: '2024-07-03', conversationId: 1 },
  { id: 6, content: '', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', status: 'loading', conversationId: 1 },
  { id: 7, content: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'question', conversationId: 2 },
  { id: 8, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 2 },
  { id: 9, content: '请告诉我更多', createdAt: '2024-07-03',updatedAt: '2024-07-03',  type: 'question', conversationId: 2 },
  { id: 10, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 2 },
  { id: 11, content: '还有更多的信息吗', createdAt: '2024-07-03', type: 'question', updatedAt: '2024-07-03', conversationId: 3 },
  { id: 12, content: '', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', status: 'loading', conversationId: 3 },
]

watchEffect(() => {
  filteredMessages.value = messages.filter(message => message.conversationId === conversationId.value)
})
</script>
