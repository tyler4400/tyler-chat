<template>
  <div class="flex justify-between items-center h-screen">
    <div class="w-[300px] h-full bg-gray-200 text-gray-700 border-r border-gray-300">
      <div class="h-[calc(100%-60px)] overflow-y-auto">
        <ConversationList :items="items" />
      </div>
      <div class="h-[60px] grid grid-cols-2 gap-2 px-2 items-center">
        <button
          class="shadow-sm inline-flex justify-center items-center
          bg-green-700 text-white text-sm hover:bg-green-700/90
          border-green-700 rounded-[4px]
          h-[32px] py-[8px] px-[15px]
          "
        >
          <span>@</span>新建聊天
        </button>
        <button
          class="shadow-sm inline-flex items-center justify-center
          bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 hover:text-white
          h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
        >应用设置</button>
      </div>
    </div>
    <div class="h-full flex-1">
      content
    </div>
  </div>
</template>

<script setup lang="ts">
import ConversationList from "./components/ConversationList.vue";
import { ConversationProps } from "./types";

console.log('👋 This message is being logged by "App.vue", included via Vite');

const items: ConversationProps[] = [
  { id: 1, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用1', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
  { id: 2, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
  { id: 3, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
  { id: 4, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用, 你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1}
]

</script>
