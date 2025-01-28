import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/list',
            name: 'TraineeList',
            component: () => import('@/components/TraineeList.vue')
        },
        {
            path: '/add',
            name: 'AddTrainee',
            component: () => import('@/components/AddTrainee.vue')
        },
        {
            path: '/edit',
            name: 'EditTrainee',
            component: () => import('@/components/EditTrainee.vue')
        }
    ]
});

export default router;
