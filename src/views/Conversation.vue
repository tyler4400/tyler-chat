<template>
  <div v-if="conversation" class="conversation-header h-[5%] bg-gray-200 flex items-center justify-between border-b border-gray-300 px-2">
    <h3 class="font-semibold text-gray-900">{{conversation.title}}</h3>
    <span class="text-sm text-gray-500">{{conversation.updatedAt}}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2" v-if="filteredMessages?.length">
     <MessageList :messages="filteredMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[75%] flex justify-center items-center" v-else>
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
import { MessageProps } from '../types'
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import { conversations, messages } from "../components/testData";

const route = useRoute()
const filteredMessages = ref<MessageProps[]>()
const conversation = computed(() => conversations.find( item => item.id === +route.params.id))
watch(() => route.params.id, (newId) => {
  filteredMessages.value = messages.filter(message => message.conversationId === +newId)
})
</script>
