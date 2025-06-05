import 'dotenv/config'
import { OpenAI } from "openai";
import fs from "node:fs/promises";


// console.log('procrss.env====', process.env)

export const aliDemo = async () => {
	const client = new OpenAI({
		apiKey: process.env['ALI_API_KEY'],
		baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
	})
	const resp = await client.chat.completions.create({
		messages: [
			{ role: 'system', content: '你现在是一只卡通片里面的可爱小狗，请模仿汪汪队长的口吻进行回答' },
			{ role: 'user', content: '请问队长，老鼠为什么有害呢？' }
		],
		model: 'qwen-turbo',
		stream: true,
	})
	for await (const chunk of resp) {
		console.log(chunk.choices[0].delta.content)
	}
}

// 读图能力
export const aliDemo2 = async () => {
	const imageBuffer = await fs.readFile('/Users/tylerzzheng/Pictures/wallhaven-w8j3lq.jpg')
	const base64Image = imageBuffer.toString('base64');

	const client = new OpenAI({
		apiKey: process.env['ALI_API_KEY'],
		baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
	})
	const resp = await client.chat.completions.create({
		messages: [ {
			role: 'user',
			content: [
				{ type: 'text', text: '图中是什么动物？'},
				{ type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}`}}
			]
		}],
		model: 'qwen-vl-plus',
		stream: true,
	})
	for await (const chunk of resp) {
		console.log(chunk.choices[0].delta.content)
	}
}
