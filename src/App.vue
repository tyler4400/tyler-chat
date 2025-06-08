<template>
  <div class="flex justify-between items-center h-screen">
    <div class="w-[300px] h-full bg-gray-200 text-gray-700 border-r border-gray-300">
      <div class="h-[calc(100%-60px)] overflow-y-auto">
        <ConversationList :items="conversationStore.conversations" />
        <h3 class="text-center text-gray-500 text-sm mt-1">共{{conversationStore.totalNumber}}条对话</h3>
      </div>
      <div class="h-[60px] grid grid-cols-2 gap-2 px-2 items-center">
        <RouterLink to="/">
          <Button icon-name="radix-icons:chat-bubble" class="w-full">
            新建聊天
          </Button>
        </RouterLink>
        <RouterLink to="/settings">
          <Button icon-name="radix-icons:gear" plain  class="w-full">
            应用设置
          </Button>
        </RouterLink>
      </div>
    </div>
    <div class="h-full flex-1">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import ConversationList from "./components/ConversationList.vue";
import Button from "./components/Button.vue";
import { initProviders } from "./db";
import { onMounted } from "vue";
import { useConversationStore } from "./stores/useConversationStore";

const conversationStore = useConversationStore()

onMounted(async () => {
  await initProviders();
  await conversationStore.fetchConversations()
})
</script>
