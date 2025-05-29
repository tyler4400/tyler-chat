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
          <Icon icon="radix-icons:chat-bubble" class="mr-2" />
          新建聊天
        </button>
        <button
          class="shadow-sm inline-flex items-center justify-center
          bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 hover:text-white
          h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
        >
          <Icon icon="radix-icons:gear" class="mr-2" />
          应用设置
        </button>
      </div>
    </div>
    <div class="h-full flex-1">
      <ProviderSelect :items="providers" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ConversationList from "./components/ConversationList.vue";
import { ConversationProps, ProviderProps } from "./types";
import { Icon } from "@iconify/vue"
import ProviderSelect from "./components/ProviderSelect.vue";

const items: ConversationProps[] = [
  { id: 1, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用1', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
  { id: 2, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
  { id: 3, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
  { id: 4, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用, 你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1}
]

const providers: ProviderProps[] = [
  {
    id: 1,
    name: '文心一言',
    desc: '文心一言 百度出品的大模型',
    models: ['ERNIE-4.0-8K', 'ERNIE-3.5-8K', 'ERNIE-Speed-8K'],
    avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  },
  {
    id: 2,
    name: '通义千问',
    desc: '通义千问',
    // https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.5bf41507xgULX5#b148acc634pfc
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max'],
    avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  }
]

</script>
