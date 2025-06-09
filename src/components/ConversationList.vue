<script setup lang="ts">
import { ConversationProps } from "../types";
import { useRouter } from "vue-router";
import dayjs from 'dayjs'
import { useConversationStore } from "../stores/useConversationStore";
import { useLoadingMsgStore } from "../stores/useLoadingMsgStore";

const router = useRouter()

const conversationStore = useConversationStore()
const loadingMsgStore = useLoadingMsgStore()

defineProps<{ items: ConversationProps[] }>()
const goToConversation = (id: number) => {
  console.log(id)
  if (loadingMsgStore.isLoading) {
    alert('AI正在回复中，现在切换将导致数据丢失')
    return
  }
  router.push({ path: `/conversation/${id}` })
}
</script>

<template>
  <div class="conversation-list">
    <div
      class="conversation-item border-gray-300 border-t cursor-pointer hover:bg-green-100 p-2.5"
      v-for="item in items"
      :class="conversationStore.selectedId === item.id ? 'bg-green-100' : 'bg-white'"
      :key="item.id"
      @click="goToConversation(item.id)"
    >
      <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
        <span>{{item.selectedModel}}</span>
        <span>{{dayjs(item.updatedAt).format('YYYY-MM-DD')}}</span>
      </div>
      <h2 class="font-semibold leading-5 text-gray-700 truncate">{{item.title}}</h2>
    </div>
  </div>
</template>

<style scoped>

</style>
