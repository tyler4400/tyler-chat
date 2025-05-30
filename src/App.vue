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
    <div class="h-full flex-1 flex items-center">
      <div class="w-[80%] mx-auto">
        <ProviderSelect :items="providers" />
      </div>
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
    avatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PGcgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IiM1YTQ1ZmUiIHJ4PSI2MCIvPjxwYXRoIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTQ2LjYxNyAxNjAuNjg5TDg5LjQ2IDYzLjMxN0M5Ni42OTQgNDYuOTAzIDExMC42MDQgMzggMTI4LjEzIDM4czMxLjQzNyA4LjkwMyAzOC42NzEgMjUuMzE3bDQyLjg0NCA5Ny4zNzJjMS45NDcgNC43MyAzLjYxNiAxMC44NSAzLjYxNiAxNi4xMzZjMCAyNC4yMDQtMTYuOTcxIDQxLjE3NS00MS4xNzUgNDEuMTc1Yy04LjI0MyAwLTE0Ljc5My0yLjEwNC0yMS40MTktNC4yMzRjLTYuNzkxLTIuMTgyLTEzLjY2Ni00LjM5MS0yMi41MzctNC4zOTFjLTguNzY4IDAtMTUuODE2IDIuMjMxLTIyLjc0MSA0LjQyMkM5OC42OTIgMjE1LjkxNiA5Mi4xMDYgMjE4IDg0LjE3NCAyMThDNTkuOTcxIDIxOCA0MyAyMDEuMDI5IDQzIDE3Ni44MjVjMC01LjI4NiAxLjY3LTExLjQwNiAzLjYxNy0xNi4xMzZtODEuNTE0LTgwLjRMODUuODQ0IDE3NS45OWMxMi41Mi01Ljg0MyAyNi45ODYtOC42MjUgNDIuMjg3LTguNjI1YzE0Ljc0NSAwIDI5Ljc2OCAyLjc4MiA0MS43MzEgOC42MjV6IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L2c+PC9zdmc+',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  },
  {
    id: 2,
    name: '通义千问',
    desc: '通义千问',
    // https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.5bf41507xgULX5#b148acc634pfc
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max'],
    avatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PGcgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IiMwNDk3ODkiIHJ4PSI2MCIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMjcuNSA0MUM3OS43NDMgNDEgNDEgNzkuNzQzIDQxIDEyNy41Uzc5Ljc0MyAyMTQgMTI3LjUgMjE0czg2LjUtMzguNzQzIDg2LjUtODYuNVMxNzUuMjU3IDQxIDEyNy41IDQxbS00LjUwNyAxNTUuODM5di01NC4yNThIOTIuODMxbDQzLjMzNi04NC40MnY1NC4yNThoMjkuMDM2eiIvPjwvZz48L3N2Zz4=',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  }
]

</script>
