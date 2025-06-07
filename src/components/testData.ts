import { ConversationProps, MessageProps, ProviderProps } from "../types";

export const messages: MessageProps[] = [
	{ id: 1, content: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'question', conversationId: 1 },
	{ id: 2, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 1 },
	{ id: 3, content: '请告诉我更多', createdAt: '2024-07-03',updatedAt: '2024-07-03',  type: 'question', conversationId: 1 },
	{ id: 4, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 1 },
	{ id: 5, content: '还有更多的信息吗', createdAt: '2024-07-03', type: 'question', updatedAt: '2024-07-03', conversationId: 1 },
	{ id: 6, content: '', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', status: 'loading', conversationId: 1 },
	{ id: 7, content: '2 什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'question', conversationId: 2 },
	{ id: 8, content: '你的说法很请正确', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 2 },
	{ id: 9, content: '请告诉我更多', createdAt: '2024-07-03',updatedAt: '2024-07-03',  type: 'question', conversationId: 2 },
	{ id: 10, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 2 },
	{ id: 11, content: '3 还有更多的信息吗', createdAt: '2024-07-03', type: 'question', updatedAt: '2024-07-03', conversationId: 3 },
	{ id: 12, content: '', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', status: 'loading', conversationId: 3 },
]
export const conversations: ConversationProps[] = [
	{ id: 1, selectedModel: 'GPT-3.5-Turbo', title: '1 什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
	{ id: 2, selectedModel: 'GPT-3.5-Turbo', title: '2 什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
	{ id: 3, selectedModel: 'GPT-3.5-Turbo', title: '3 什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
	{ id: 4, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用, 你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
	{ id: 5, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用1', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
	{ id: 6, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
	{ id: 7, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
	{ id: 8, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用, 你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1}
]

export const providers: ProviderProps[] = [
	{
		id: 1,
		name: 'qianfan',
		title: '百度千帆',
		desc: '文心一言 百度出品的大模型',
		models: ['ERNIE-4.0-8K', 'ERNIE-3.5-8K', 'ERNIE-Speed-128K'],
		avatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PGcgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IiM1YTQ1ZmUiIHJ4PSI2MCIvPjxwYXRoIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTQ2LjYxNyAxNjAuNjg5TDg5LjQ2IDYzLjMxN0M5Ni42OTQgNDYuOTAzIDExMC42MDQgMzggMTI4LjEzIDM4czMxLjQzNyA4LjkwMyAzOC42NzEgMjUuMzE3bDQyLjg0NCA5Ny4zNzJjMS45NDcgNC43MyAzLjYxNiAxMC44NSAzLjYxNiAxNi4xMzZjMCAyNC4yMDQtMTYuOTcxIDQxLjE3NS00MS4xNzUgNDEuMTc1Yy04LjI0MyAwLTE0Ljc5My0yLjEwNC0yMS40MTktNC4yMzRjLTYuNzkxLTIuMTgyLTEzLjY2Ni00LjM5MS0yMi41MzctNC4zOTFjLTguNzY4IDAtMTUuODE2IDIuMjMxLTIyLjc0MSA0LjQyMkM5OC42OTIgMjE1LjkxNiA5Mi4xMDYgMjE4IDg0LjE3NCAyMThDNTkuOTcxIDIxOCA0MyAyMDEuMDI5IDQzIDE3Ni44MjVjMC01LjI4NiAxLjY3LTExLjQwNiAzLjYxNy0xNi4xMzZtODEuNTE0LTgwLjRMODUuODQ0IDE3NS45OWMxMi41Mi01Ljg0MyAyNi45ODYtOC42MjUgNDIuMjg3LTguNjI1YzE0Ljc0NSAwIDI5Ljc2OCAyLjc4MiA0MS43MzEgOC42MjV6IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L2c+PC9zdmc+',
		createdAt: '2024-07-03',
		updatedAt: '2024-07-03'
	},
	{
		id: 2,
		name: 'dashscope',
		title: '阿里灵积',
		desc: '通义千问',
		// https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.5bf41507xgULX5#b148acc634pfc
		models: ['qwen-turbo', 'qwen-plus', 'qwen-max'],
		avatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+PGcgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9IiMwNDk3ODkiIHJ4PSI2MCIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMjcuNSA0MUM3OS43NDMgNDEgNDEgNzkuNzQzIDQxIDEyNy41Uzc5Ljc0MyAyMTQgMTI3LjUgMjE0czg2LjUtMzguNzQzIDg2LjUtODYuNVMxNzUuMjU3IDQxIDEyNy41IDQxbS00LjUwNyAxNTUuODM5di01NC4yNThIOTIuODMxbDQzLjMzNi04NC40MnY1NC4yNThoMjkuMDM2eiIvPjwvZz48L3N2Zz4=',
		createdAt: '2024-07-03',
		updatedAt: '2024-07-03'
	}
]
