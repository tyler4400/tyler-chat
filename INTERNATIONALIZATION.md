# 国际化 (i18n) 实现总结

## 概述

本项目已成功实现 Vue.js 应用的国际化功能，支持中文和英文两种语言。

## 文件结构

### 核心文件

- `src/i18n/index.ts` - i18n 配置和初始化
- `src/i18n/zh.ts` - 中文语言包
- `src/i18n/en.ts` - 英文语言包

### 已国际化的组件

- `src/App.vue` - 主应用界面
- `src/views/Settings.vue` - 设置页面
- `src/components/MessageInput.vue` - 消息输入组件
- `src/components/ConversationList.vue` - 对话列表组件
- `src/components/ProviderSelect.vue` - 提供商选择组件

## 功能特性

### 1. 语言切换

- 在设置页面可以切换中英文
- 语言设置会自动保存到应用配置
- 应用重启后会保持用户的语言选择

### 2. 翻译键结构

```typescript
{
  settings: {
    title: '应用设置',
    language: '语言设置',
    fontSize: '字体大小',
    selectLanguage: '选择语言...'
  },
  common: {
    send: '发送',
    chinese: '中文',
    english: 'English',
    newChat: '新建聊天',
    settings: '应用设置',
    receiving: '接收中',
    inputPlaceholder: '请输入内容',
    totalConversations: '共{count}条对话',
    aiResponding: 'AI正在回复中，现在切换将导致数据丢失'
  },
  provider: {
    selectModel: '选择模型...'
  }
}
```

### 3. 使用方法

#### 在模板中使用

```vue
<template>
  <h1>{{ $t('settings.title') }}</h1>
  <p>{{ $t('common.totalConversations', { count: 5 }) }}</p>
</template>
```

#### 在脚本中使用

```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const message = t('common.send')
</script>
```

#### 语言切换

在 Settings.vue 中，语言切换通过 watch 监听配置变化自动处理：

```vue
<script setup>
import { setI18nLanguage } from '../i18n'

watch(
  currentConfig,
  async (newConfig) => {
    await window.electronAPI.updateConfig({ ...newConfig })
    setI18nLanguage(newConfig.language)
  },
  { deep: true }
)
</script>
```

## 技术实现

### 1. Vue I18n 配置

- 使用 Composition API 模式 (`legacy: false`)
- 支持嵌套键访问
- 支持参数插值
- 设置回退语言为英文

### 2. 配置管理

- 语言设置通过应用配置系统管理
- 自动保存用户的语言偏好
- 应用启动时自动恢复语言设置

### 3. 类型安全

- 使用 TypeScript 定义语言类型
- 提供完整的类型支持

## 最佳实践

1. **模块化语言包** - 按功能模块组织翻译键
2. **类型安全** - 使用 TypeScript 确保翻译键的正确性
3. **持久化设置** - 自动保存用户的语言偏好
4. **回退机制** - 设置默认语言，避免显示空白
5. **参数支持** - 支持动态内容的翻译

## 扩展指南

### 添加新语言

1. 创建新的语言包文件 `src/i18n/[locale].ts`
2. 在 `src/i18n/index.ts` 中导入并添加到 messages
3. 更新类型定义

### 添加新翻译键

1. 在所有语言包中添加对应的翻译
2. 在组件中使用 `$t()` 或 `t()` 函数
3. 确保翻译键的命名规范一致

## 注意事项

- 主进程中的文本保持硬编码中文，因为这些是系统级提示
- 所有用户界面文本都已国际化
- 语言切换是即时的，无需重启应用
- 语言设置通过 Settings.vue 中的 watch 机制自动同步
