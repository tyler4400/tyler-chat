/* 学习 Dexie.js 的基本用法 */
import Dexie, { EntityTable } from "dexie";
import { ProviderProps } from "../types";
import { providers } from "../components/testData";

export const db = new Dexie('vChatDatabase') as Dexie & {
	providers: EntityTable<ProviderProps, 'id'>; // primary key "id" (for the typings only)
}
db.version(1).stores({
	providers: '++id, name' // primary key "id" (for the runtime!)
})

export const runDB = async () => {
	/* 插入数据 */
	// const insertedId = await db.providers.add(providers[1])
	// console.log('insertedId', insertedId)

	/* 查询数据 */
	// const items = await db.providers.toArray()
	// console.log('items', items)

	/* 条件查询、 */
	// const items = await db.providers.where({ id: 2}).toArray()
	// console.log('items', items)

	/* 更新数据 */
	// const updatedItem = await db.providers.update(1, { name: 'new name' })
	// console.log('updatedItem', updatedItem)

	/* 删除数据 */
	const deletedItem = await db.providers.delete(1)
	console.log('deletedItem', deletedItem)
}
