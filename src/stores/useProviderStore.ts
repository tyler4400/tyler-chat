import { defineStore } from "pinia";
import { ProviderProps } from "../types";
import { ref } from "vue";
import { db, initProviders } from "../db";

export const useProviderStore = defineStore('provider', () => {
	const providers = ref<ProviderProps[]>([])

	const fetchProviders = async () => {
		providers.value = await db.providers.toArray()
	}

	const init = async () => {
		await initProviders()
		await fetchProviders()
	}

	const getProviderById = (id: number) => {
		return providers.value.find(provider => provider.id === id)
	}

	return {
		providers,
		fetchProviders,
		init,
		getProviderById,
	}

})
