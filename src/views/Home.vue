<template>
  <div class="w-[80%] h-full mx-auto">
    <div class="h-[85%] flex items-center">
      <ProviderSelect v-model="selectedModel" :items="providers" />
    </div>
    <div class="h-[15% flex items-start">
      <MessageInput @send="(text) => console.log(text)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageInput from '../components/MessageInput.vue'
import { providers } from "../components/testData";

const selectedModel = ref('')
</script>
