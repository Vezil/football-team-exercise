import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTraineesStore = defineStore('trainees', () => {
    const editingTrainee = ref({});
    const operationType = ref('');

    return { editingTrainee, operationType };
});
