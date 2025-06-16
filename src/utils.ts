import fs from "node:fs/promises";
import { lookup } from "mime-types";
import { ChatMessageProps, MsgContent } from "./types";

export async function convertMessages( messages:  ChatMessageProps[]) {
	const convertedMessages = []
	for (const message of messages) {
		let convertedContent: string | MsgContent[]
		if (message.imagePath) {
			const imageBuffer = await fs.readFile(message.imagePath)
			const base64Image = imageBuffer.toString('base64')
			const mimeType = lookup(message.imagePath)
			convertedContent = [
				{
					type: "text",
					text: message.content || ""
				},
				{
					type: 'image_url',
					image_url: {
						url: `data:${mimeType};base64,${base64Image}`
					}
				}
			]
		} else {
			convertedContent = message.content
		}
		const { imagePath, ...messageWithoutImagePath } = message
		convertedMessages.push({
			...messageWithoutImagePath,
			content: convertedContent
		})
	}
	return convertedMessages
}
