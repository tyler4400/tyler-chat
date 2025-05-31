<template>
  <div class="flex justify-between items-center h-screen">
    <div class="w-[300px] h-full bg-gray-200 text-gray-700 border-r border-gray-300">
      <div class="h-[calc(100%-60px)] overflow-y-auto">
        <ConversationList :items="conversations" />
      </div>
      <div class="h-[60px] grid grid-cols-2 gap-2 px-2 items-center">
        <RouterLink to="/">
          <button
            class="shadow-sm inline-flex justify-center items-center
            bg-green-700 text-white text-sm hover:bg-green-700/90
            border-green-700 rounded-[4px] h-[32px] py-[8px] px-[15px]
            active:bg-green-800 active:translate-y-0.5 active:shadow-inner"
          >
            <Icon icon="radix-icons:chat-bubble" class="mr-2" />
            新建聊天
          </button>
        </RouterLink>
        <RouterLink to="/settings">
          <button
            class="shadow-sm inline-flex items-center justify-center
            bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 hover:text-white
            h-[32px] py-[8px] px-[15px] text-sm rounded-[4px] active:bg-green-800 active:translate-y-0.5 active:shadow-inner"
          >
            <Icon icon="radix-icons:gear" class="mr-2" />
            应用设置
          </button>
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
import { Icon } from "@iconify/vue"
import { conversations } from "./components/testData";

</script>
