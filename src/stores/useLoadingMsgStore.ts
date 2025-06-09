import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingMsgStore = defineStore('loadingMsg', () => {
	const isLoading = ref<boolean>(false)

	const setLoading = (value: boolean) => {
		isLoading.value = value
	}
	return {
		isLoading,
		setLoading,
	}
})
