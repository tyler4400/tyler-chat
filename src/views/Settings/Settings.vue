<template>
  <div class="settings w-[80%] mx-auto p-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">
        {{ t('settings.title') }}
      </h1>
      <div class="flex gap-2 justify-end items-center">
        <Icon icon="line-md:file-download" width="24" height="24" class="m-1 cursor-pointer" />
        <Icon icon="line-md:file-upload" width="24" height="24" class="m-1 cursor-pointer" />
      </div>
    </div>

    <TabsRoot v-model="activeTab" class="w-full">
      <TabsList class="flex border-b border-gray-200 mb-6">
        <TabsTrigger value="general" class="px-4 py-2 -mb-[1px] text-sm font-medium text-gray-600 hover:text-gray-800 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600">
          {{ t('settings.general') }}
        </TabsTrigger>
        <TabsTrigger value="models" class="px-4 py-2 -mb-[1px] text-sm font-medium text-gray-600 hover:text-gray-800 data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600">
          {{ t('settings.models') }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general" class="space-y-6">
        <div class="space-y-6">
          <div class="setting-item">
            <label for="language" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('settings.language') }}
            </label>
            <SelectRoot v-model="currentConfig.language" id="language" class="select-root">
              <SelectTrigger
                  class="w-40 flex items-center justify-between rounded-md px-3 py-2 text-sm gap-1 bg-white border border-gray-300"
              >
                <SelectValue :placeholder="t('settings.selectLanguage')" />
                <SelectIcon>
                  <Icon icon="radix-icons:chevron-down" />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectContent class="bg-white rounded-md shadow-lg border">
                  <SelectViewport class="p-2">
                    <SelectGroup>
                      <SelectItem
                          value="zh"
                          class="relative flex items-center px-8 py-2 rounded-md cursor-default text-sm text-green-700 data-[highlighted]:text-white data-[highlighted]:bg-green-700"
                      >
                        <SelectItemText>{{ t('settings.chinese') }}</SelectItemText>
                        <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                          <Icon icon="radix-icons:check" />
                        </SelectItemIndicator>
                      </SelectItem>
                      <SelectItem
                          value="en"
                          class="relative flex items-center px-8 py-2 rounded-md cursor-default text-sm text-green-700 data-[highlighted]:text-white data-[highlighted]:bg-green-700"
                      >
                        <SelectItemText>{{ t('settings.english') }}</SelectItemText>
                        <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                          <Icon icon="radix-icons:check" />
                        </SelectItemIndicator>
                      </SelectItem>
                    </SelectGroup>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
          </div>
          <div class="setting-item">
            <label for="fontSize" class="block text-sm font-medium text-gray-700 mb-2">{{
                t('settings.fontSize')
              }}</label>
            <NumberFieldRoot
                v-model="currentConfig.fontSize"
                id="fontSize"
                class="number-root inline-flex w-40"
                :min="12"
                :max="20"
            >
              <NumberFieldDecrement
                  class="px-2 border border-r-0 border-gray-300 rounded-l-md hover:bg-green-100 focus:outline-none disabled:bg-gray-50"
              >
                <Icon icon="radix-icons:minus" />
              </NumberFieldDecrement>
              <NumberFieldInput
                  class="number-input w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 text-center"
              />
              <NumberFieldIncrement
                  class="px-2 border border-l-0 border-gray-300 rounded-r-md hover:bg-green-100 focus:outline-none disabled:bg-gray-50"
              >
                <Icon icon="radix-icons:plus" />
              </NumberFieldIncrement>
            </NumberFieldRoot>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="models" class="space-y-4">
        <AccordionRoot type="single" collapsible>
          <AccordionItem v-for="provider in providerStore.providers" :key="provider.id" :value="provider.name" class="border rounded-lg mb-2">
            <AccordionTrigger class="AccordionTrigger group flex items-center justify-between w-full p-4 text-left">
              <div class="flex items-center gap-2">
                <img :src="provider.avatar" :alt="provider.name" class="w-6 h-6 rounded">
                <span class="font-medium">{{ provider.title }}</span>
              </div>
              <Icon icon="radix-icons:chevron-down" class="transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-180" />
            </AccordionTrigger>
            <AccordionContent class="AccordionContent p-4 pt-0.5 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
              <div class="space-y-4 ">
                <div class="flex items-center gap-4" v-for="config in getProviderConfig(provider.name)">
                  <label class="text-sm font-medium text-gray-700 w-24">{{ config.key }}</label>
                  <input
                    :type="config.type"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    :placeholder="config.placeholder"
                    :required="config.required"
                    :value="config.value"
                    @input="e => updateProviderConfig(provider.name, config.key, (e.target as HTMLInputElement).value)"
                  />
                </div>
                <div class="flex items-center gap-4">
                  <label class="text-sm font-medium text-gray-700 w-24 min-w-24">{{ t('settings.testConnection') }}</label>
                  <div class="flex items-center gap-2">
                    <Button
                        class="shrink-0"
                        :color="(testingStates[provider.name]?.success === false) ? 'red' : 'green'"
                        @click="() => testConnection(provider.name)"
                        :disabled="testingStates[provider.name]?.loading"
                        plain
                        size="small"
                        :loading="testingStates[provider.name]?.loading"
                        :icon-name="getStatusIcon(testingStates[provider.name])"
                    >
                      {{ testingStates[provider.name]?.loading ? t('settings.testing') : t('settings.test') }}
                    </Button>
                    <span
                        v-if="testingStates[provider.name]?.message"
                        class="text-sm break-all"
                        :class="testingStates[provider.name]?.success ? 'text-green-700' : 'text-red-500'"
                    >
                      {{testingStates[provider.name]?.message}}
                    </span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </TabsContent>
    </TabsRoot>




  </div>
</template>
<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  NumberFieldRoot,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from 'radix-vue'
import { onMounted, reactive, ref, watch, toRaw } from 'vue'
import { AppConfig, ProviderConfig, ProviderConfigItem, ProviderName } from '../../types'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { setI18nLanguage } from '../../i18n'
import { useProviderStore } from "../../stores/useProviderStore";
import { providerConfigs } from "./providerConfig";
import Button from '../../components/Button.vue'

const { t } = useI18n()

const providerStore = useProviderStore()

const activeTab = ref<'general' | 'models'>('general')


const currentConfig = reactive<AppConfig>({} as AppConfig)

onMounted(async () => {
  const config = await window.electronAPI.getConfig()
  Object.assign(currentConfig, config)
})

const getProviderConfig = (providerName: ProviderName) => {
  const fieldConfig = providerConfigs[providerName]
  return fieldConfig.map(item => ({
    ...item,
    value: currentConfig.providerConfigs?.[providerName]?.[item.key] ?? item.value,
  }) as ProviderConfigItem)
}

const updateProviderConfig = (providerName: ProviderName, key: keyof ProviderConfig, value: string) => {
  if (!currentConfig.providerConfigs[providerName]) {
    currentConfig.providerConfigs[providerName] = {}
  }
  currentConfig.providerConfigs[providerName][key] = value
}

type TestingState = {
  loading: boolean;
  success?: boolean;
  message?: string;
};

// 添加测试状态管理
const testingStates = ref<Record<ProviderName, TestingState>>({} as Record<ProviderName, TestingState>);
// 测试连通性方法
const testConnection = async (providerName: ProviderName) => {
  // 设置加载状态
  testingStates.value[providerName] = { loading: true };

  try {
    // 调用主进程的测试接口
    const result = await window.electronAPI.testProviderConnection(providerName);

    testingStates.value[providerName] = {
      loading: false,
      success: result.success,
      message: result.message
    };
  } catch (error: any) {
    testingStates.value[providerName] = {
      loading: false,
      success: false,
      message: `${t('settings.testFailed')}${error.message || '未知错误'}`
    };
  }
};

const getStatusIcon = (state: TestingState) => {
  if (!state?.success && !state?.message) return 'lucide:wifi'
  return state?.success ? 'lucide:check-circle' : 'lucide:x-circle'
}

// 监听配置变化, 保存到electron
watch(
  currentConfig,
  async (newConfig) => {
    await window.electronAPI.updateConfig(toRaw(newConfig))
  },
  { deep: true }
)

// 监听语言变化, 应用语言设置
watch(
  () => currentConfig.language,
  (newLang, oldLang) => {
    if (newLang !== oldLang) {
      setI18nLanguage(newLang)
    }
  }
)
</script>
