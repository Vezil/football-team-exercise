import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('trainees', () => {
    const trainees = ref([]);

    return { trainees };
});
