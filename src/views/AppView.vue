<template>
    <div class="p-12">
        <div class="text-2xl font-bold mb-4">{{ header }}</div>

        <RouterView />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { RouterView, useRoute } from 'vue-router';
import { useTraineesStore } from '@/stores/trainees';

const { operationType } = storeToRefs(useTraineesStore());
const route = useRoute();

const header = computed(() => {
    return route.name === 'TraineeList' ? 'User list' : operationType === 'add' ? 'Add User' : 'Edit User';
});
</script>
