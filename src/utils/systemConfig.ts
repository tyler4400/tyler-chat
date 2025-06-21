import { AppConfig } from "../types";
import path from "node:path";
import { app } from "electron";
import fs from "node:fs/promises";

export const DEFAULT_CONFIG: AppConfig = {
	language: 'zh',
	fontSize: 14
}

const configPath = path.join(app.getPath('userData'), 'config.json')

let config: AppConfig = { ...DEFAULT_CONFIG };

export const systemConfig = {
	async load() {
		try {
			const data = await fs.readFile(configPath, 'utf-8')
			config = { ...DEFAULT_CONFIG, ...JSON.parse(data)}
		} catch {
			await this.save()
		}
		return config
	},

	async save() {
		await fs.writeFile(configPath, JSON.stringify(config, null, 2))
		return config
	},

	async update(newConfig: Partial<AppConfig>) {
		config = { ...config, ...newConfig }
		return await this.save()
	},

	get() {
		return config
	},
}
