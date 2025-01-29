<template>
    <div class="p-12">
        <div class="text-2xl font-bold mb-4">{{ header }}</div>

        <RouterView />
    </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const header = computed(() => {
    return route.name === 'TraineeList' ? 'User list' : 'Add or Edit user';
});
</script>
