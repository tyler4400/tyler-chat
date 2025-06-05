import { ChatCompletion } from "@baiducloud/qianfan";
import { Resp } from "@baiducloud/qianfan/dist/src/interface";

export const qianfanDemo = async () => {
	console.log('你好,你是谁')
	const client = new ChatCompletion()
	const stream = await client.chat({
		messages: [
			{"role":"user","content":"你好"},
			{"role":"assistant","content":"如果您有任何问题，请随时向我提问。"},
			{"role":"user","content": "我在西安，周末可以去哪里玩？"},
			{"role":"assistant","content": "西安是一个充满活力和文化氛围的城市，有很多适合周末游玩的地方。"},
			{"role":"user","content": "周末这里的天气怎么样？"}
		],
		stream: true,
	}, 'ERNIE-Speed-128K') as AsyncIterable<Resp>
	for await (const chunk of stream) {
		console.log(chunk)
	}
}


