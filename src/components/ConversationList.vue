<script setup lang="ts">
import { ConversationProps } from "../types";
import { useRouter } from "vue-router";
import dayjs from 'dayjs'

const router = useRouter()


defineProps<{ items: ConversationProps[] }>()
const goToConversation = (id: number) => {
  console.log(id)
  router.push({ path: `/conversation/${id}` })
}
</script>

<template>
  <div class="conversation-list">
    <div
      class="conversation-item border-gray-300 border-t cursor-pointer bg-white hover:bg-green-100 p-2.5"
      v-for="item in items"
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
