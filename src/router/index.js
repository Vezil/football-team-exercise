import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/list',
            alias: '',
            name: 'TraineeList',
            component: () => import('@/components/TraineeList.vue')
        },
        {
            path: '/add-edit',
            name: 'AddEditTrainee',
            component: () => import('@/components/AddEditTrainee.vue')
        }
    ]
});

export default router;
