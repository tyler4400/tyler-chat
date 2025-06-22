<template>
  <div class="flex justify-between items-center h-screen">
    <div class="w-[300px] h-full bg-gray-200 text-gray-700 border-r border-gray-300">
      <div class="h-[calc(100%-60px)] overflow-y-auto">
        <ConversationList :items="conversationStore.conversations" />
        <h3 class="text-center text-gray-500 text-sm mt-1">
          {{ t('common.totalConversations', { count: conversationStore.totalNumber }) }}
        </h3>
      </div>
      <div class="h-[60px] grid grid-cols-2 gap-2 px-2 items-center">
        <RouterLink to="/">
          <Button icon-name="radix-icons:chat-bubble" class="w-full">
            {{ t('common.newChat') }}
          </Button>
        </RouterLink>
        <RouterLink to="/settings">
          <Button icon-name="radix-icons:gear" plain class="w-full">
            {{ t('common.settings') }}
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
import ConversationList from './components/ConversationList.vue'
import Button from './components/Button.vue'
import { onMounted } from 'vue'
import { useConversationStore } from './stores/useConversationStore'
import { useProviderStore } from './stores/useProviderStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const conversationStore = useConversationStore()
const providerStore = useProviderStore()

onMounted(async () => {
  await providerStore.init()
  await conversationStore.fetchConversations()
})
</script>
