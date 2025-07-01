import { AppConfig } from "../types";
import path from "node:path";
import { app, dialog } from "electron";
import fs from "node:fs/promises";
import { tryCatch } from "./tryCatch";

export const DEFAULT_CONFIG: AppConfig = {
	language: 'zh',
	fontSize: 14,
	providerConfigs: {
		dashscope: {
			apiKey: process.env['ALI_API_KEY'],
			baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
		},
		openai: {},
		deepseek: {
			apiKey: process.env['DEEPSEEK_API_KEY'],
			baseURL: 'https://api.deepseek.com/v1',
		},
		qianfan: {
			accessKey: process.env['QIANFAN_ACCESS_KEY'],
			secretKey: process.env['QIANFAN_SECRET_KEY'],
		},
	},
}

const configPath = path.join(app.getPath('userData'), 'config.json')

export const systemConfig = {
	async load(): Promise<AppConfig> {
		console.log('配置存储地址', configPath)
		const [data, error] = await tryCatch(fs.readFile(configPath, 'utf-8'))
		if (error) {
			console.error('error', error)
			this.forceSave()
			return DEFAULT_CONFIG
		}

		if (!data) {
			return this.forceSave()
		}
		try {
			return JSON.parse(data)
		} catch (e) {
			console.error('parseError', e)
			dialog.showErrorBox('配置文件已损坏', `请检查:${configPath}`)
			return this.forceSave()
		}
	},

	async forceSave(config: AppConfig = DEFAULT_CONFIG): Promise<AppConfig> {
		await fs.writeFile(configPath, JSON.stringify(config, null, 2))
		return config
	},

	async update(newConfig: Partial<AppConfig>): Promise<AppConfig> {
		const config = await this.load()
		return this.forceSave({ ...config, ...newConfig })
	},
}
