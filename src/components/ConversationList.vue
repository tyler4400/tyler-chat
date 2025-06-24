<script setup lang="ts">
import { ConversationProps } from '../types'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { useConversationStore } from '../stores/useConversationStore'
import { useLoadingMsgStore } from '../stores/useLoadingMsgStore'
import { useI18n } from 'vue-i18n'
import { Icon } from "@iconify/vue";
import { ref } from 'vue'

const { t } = useI18n()
const router = useRouter()

const conversationStore = useConversationStore()
const loadingMsgStore = useLoadingMsgStore()

defineProps<{ items: ConversationProps[] }>()

const goToConversation = (id: number) => {
  if (loadingMsgStore.isLoading) {
    alert(t('common.aiResponding'))
    return
  }
  router.push({ path: `/conversation/${id}` })
}

// 跟踪悬停状态的Map
const hoveredItems = ref<Map<number, boolean>>(new Map())

// 处理鼠标进入事件
const handleMouseEnter = (id: number) => {
  hoveredItems.value.set(id, true)
}

// 处理鼠标离开事件
const handleMouseLeave = (id: number) => {
  hoveredItems.value.set(id, false)
}
</script>

<template>
  <div class="conversation-list">
    <div
      class="conversation-item border-gray-300 border-t cursor-pointer hover:bg-green-100 p-2.5"
      v-for="item in items"
      :class="conversationStore.selectedId === item.id ? 'bg-green-100' : 'bg-white'"
      :key="item.id"
      @click="() => goToConversation(item.id)"
      @mouseenter="() => handleMouseEnter(item.id)"
      @mouseleave="() => handleMouseLeave(item.id)"
    >
      <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
        <span>{{ item.selectedModel }}</span>
        <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
      </div>
      <div class="flex items-center">
        <h2 class="flex-1 font-semibold leading-5 text-gray-700 truncate">{{ item.title }}</h2>
        <Icon
          v-if="hoveredItems.get(item.id)"
          class="text-green-900 transition-all duration-200"
          icon="line-md:trash"
          @click.stop="() => conversationStore.deleteConversation(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
