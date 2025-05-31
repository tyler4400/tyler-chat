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
import { ref, watch } from "vue";
import { messages } from "../components/testData";

const route = useRoute()
const filteredMessages = ref<MessageProps[]>()
watch(() => route.params.id, (newId) => {
  filteredMessages.value = messages.filter(message => message.conversationId === +newId)
})
</script>
