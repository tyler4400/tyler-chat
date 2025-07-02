# Tyler Chat

一个基于 Vue 3 + Electron 构建的跨平台 AI 聊天桌面应用，支持多个主流大语言模型 Provider，提供流畅的对话体验。

## 📷 应用截图

<!-- 截图将在后续添加 -->
_截图即将更新..._

## ✨ 功能特性

### 🤖 多模型支持
- **百度千帆大模型** - 支持 ERNIE 系列模型
- **阿里云通义千问** - 支持通义千问系列模型  
- **DeepSeek** - 支持 DeepSeek 系列模型
- **OpenAI 兼容接口** - 支持 ChatGPT 及其他 OpenAI 兼容的模型

### 💬 智能对话
- **多对话管理** - 支持创建和管理多个独立对话
- **流式响应** - 实时显示 AI 回复内容，提升交互体验
- **图片支持** - 支持上传图片进行多模态对话
- **消息历史** - 本地存储所有对话记录

### 🎨 用户体验
- **国际化支持** - 内置中英文双语界面
- **现代化 UI** - 基于 TailwindCSS 的响应式设计
- **跨平台** - 支持 Windows、macOS、Linux
- **本地存储** - 数据完全本地化，保护隐私安全

### ⚙️ 系统功能
- **提供商管理** - 灵活配置和切换不同的 AI 提供商
- **连接测试** - 一键测试 API 配置是否正确
- **应用设置** - 支持语言、字体等个性化配置
- **菜单集成** - 完整的桌面应用菜单系统

## 🛠️ 技术栈

### 前端框架
- **Vue 3** - 采用 Composition API 和 `<script setup>` 语法
- **TypeScript** - 完整的类型支持，提高代码质量
- **Vue Router** - 应用路由管理
- **Pinia** - 现代化状态管理

### 桌面应用
- **Electron** - 跨平台桌面应用框架
- **Electron Forge** - 应用打包和分发工具

### UI 设计
- **TailwindCSS** - 实用优先的 CSS 框架
- **Radix Vue** - 无样式组件库，提供可访问性支持
- **Iconify** - 丰富的图标库

### 数据存储
- **Dexie.js** - IndexedDB 的现代化封装
- **本地存储** - 所有数据存储在本地，保护用户隐私

### 开发工具
- **Vite** - 快速的构建工具
- **ESLint** - 代码质量检查
- **PostCSS** - CSS 后处理器

### AI 集成
- **OpenAI SDK** - OpenAI 和兼容接口的集成
- **百度千帆 SDK** - 百度千帆大模型集成
- **统一 Provider 模式** - 抽象化的 AI 提供商接口

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/your-username/tyler-chat.git
cd tyler-chat

# 安装依赖
npm install
```

### 运行项目

```bash
# 开发模式运行
npm start

# 这将启动 Electron 应用，同时开启热重载
```

### 首次使用

1. 启动应用后，点击右下角的"应用设置"按钮
2. 在设置页面中配置你要使用的 AI 提供商的 API 密钥
3. 点击"测试"按钮验证配置是否正确
4. 返回主页面，选择模型后即可开始对话

## 🔧 开发指南

### 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Button.vue
│   ├── ConversationList.vue
│   ├── MessageInput.vue
│   ├── MessageList.vue
│   └── ProviderSelect.vue
├── views/              # 页面组件
│   ├── Conversation.vue
│   ├── Home.vue
│   └── Settings/
├── stores/             # Pinia 状态管理
│   ├── useConversationStore.ts
│   ├── useLoadingMsgStore.ts
│   └── useProviderStore.ts
├── providers/          # AI 提供商实现
│   ├── BaseProvider.ts
│   ├── OpenAIProvider.ts
│   ├── QianfanProvider.ts
│   └── createProvider.ts
├── types.ts           # TypeScript 类型定义
├── db.ts             # 数据库配置
├── i18n/             # 国际化配置
├── utils/            # 工具函数
├── main.ts           # Electron 主进程
├── preload.ts        # Electron 预加载脚本
└── renderer.ts       # 渲染进程入口
```

### 开发规范

#### 代码风格
- 使用 **TypeScript** 进行类型安全的开发
- 遵循 **Vue 3 Composition API** 最佳实践
- 使用 **TailwindCSS** 进行样式编写，避免原生 CSS
- 事件处理函数使用 `handle` 前缀命名

#### 组件开发
- 组件保持单一职责原则
- 使用 `defineProps` 和 `defineEmits` 明确接口
- 添加清晰的中文注释和类型定义

#### Provider 开发
如需添加新的 AI 提供商，请：

1. 继承 `BaseProvider` 抽象类
2. 实现 `chat()` 和 `testConnection()` 方法
3. 在 `createProvider.ts` 中注册新的提供商
4. 更新类型定义和初始化数据

### 本地开发

```bash
# 启动开发服务器
npm start

# 代码检查
npm run lint

# 类型检查
npm run type-check
```

## 📦 打包发布

### 开发构建

```bash
# 构建应用（不打包）
npm run package
```

### 生产打包

```bash
# 打包所有平台
npm run make

# 打包 macOS DMG（仅在 macOS 上）
npm run make:dmg
```

### 支持的打包格式

- **Windows**: `.exe` 安装程序
- **macOS**: `.dmg` 磁盘映像
- **Linux**: `.deb` 和 `.rpm` 包

### 发布配置

打包配置位于 `forge.config.ts` 文件中，可以根据需要调整：

- 应用图标和元数据
- 安装程序选项
- 代码签名配置
- 自动更新设置

## ⚙️ 配置说明

### AI 提供商配置

应用启动后，在设置页面配置相应的 API 密钥：

#### 百度千帆
- **Access Key**: 百度云控制台获取的访问密钥
- **Secret Key**: 百度云控制台获取的私钥
- [获取密钥链接](https://console.bce.baidu.com/iam/#/iam/accesslist)

#### 阿里云通义千问  
- **API Key**: 阿里云百炼控制台获取的 API 密钥
- **Base URL**: `https://dashscope.aliyuncs.com/compatible-mode/v1`
- [获取密钥链接](https://bailian.console.aliyun.com/#/api-key)

#### DeepSeek
- **API Key**: DeepSeek 平台获取的 API 密钥  
- **Base URL**: `https://api.deepseek.com`
- [获取密钥链接](https://platform.deepseek.com/api_keys)

#### OpenAI 兼容接口
- **API Key**: 相应平台的 API 密钥
- **Base URL**: 服务提供商的基础 URL

### 应用设置

- **语言设置**: 支持中文和英文界面
- **字体大小**: 调整界面字体显示大小
- **连接测试**: 验证 API 配置是否正确

### 数据存储

应用使用 IndexedDB 在本地存储所有数据：
- 对话记录和消息历史
- 提供商配置信息
- 应用偏好设置

数据存储位置：
- **Windows**: `%APPDATA%/tyler-chat`
- **macOS**: `~/Library/Application Support/tyler-chat`
- **Linux**: `~/.config/tyler-chat`

## 🤝 贡献指南

### 开发流程

1. **Fork** 项目并克隆到本地
2. 创建功能分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add some amazing feature'`
4. 推送到分支: `git push origin feature/amazing-feature`
5. 提交 **Pull Request**

### 代码提交规范

- 提交信息使用中文描述
- 遵循项目现有的代码风格
- 确保新功能包含适当的测试
- 更新相关文档

### 开发规则

请遵循项目根目录的 `.cursorrules` 文件中定义的开发规范：

- 必须先提供设计方案，等待确认后再编写代码
- 保持现有代码格式和风格
- 优先选择简单直接的解决方案
- 使用中文注释，保持注释清晰详细

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 📮 联系方式

- **作者**: tyler4400
- **邮箱**: tyler4400@foxmail.com

---

**如果这个项目对你有帮助，请考虑给它一个 ⭐️！** 