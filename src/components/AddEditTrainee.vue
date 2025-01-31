<template>
    <div class="md:flex w-full md:gap-20">
        <div class="w-full md:w-2/3 bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">{{ baseCaption }}</h2>
            <div class="flex gap-4">
                <input v-model="trainee.firstName" placeholder="First Name" class="border p-2 rounded w-1/2" />
                <input v-model="trainee.lastName" placeholder="Last Name" class="border p-2 rounded w-1/2" />
            </div>
            <button
                class="mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                @click="operationType === 'add' ? addUser() : editUser()"
            >
                {{ baseCaption }}
            </button>
        </div>
        <div class="w-full md:w-1/3 bg-white mt-10 md:mt-0 p-6 rounded-lg shadow flex flex-col items-center">
            <img :src="photoUrl" class="w-24 h-24 rounded-full object-cover border" alt="User Photo" />
            <input type="file" @change="uploadPhoto" class="hidden" ref="fileInput" />
            <button @click="selectPhoto" class="mt-4 bg-gray-500 text-white px-4 py-2 rounded cursor-pointer">
                Change Photo
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useTraineesStore } from '@/stores/trainees';

const { editingTrainee, operationType } = storeToRefs(useTraineesStore());

const fileInput = ref(null);
const photoUrl = ref('');
const router = useRouter();

const trainee = computed(() => ({
    firstName: operationType.value === 'add' ? '' : editingTrainee.value.fullName.split(' ')[0],
    lastName: operationType.value === 'add' ? '' : editingTrainee.value.fullName.split(' ')[1]
}));

const traineeToSend = computed(() => ({
    name: `${trainee.value.firstName} ${trainee.value.lastName}`,
    job: 'trainee'
}));

const baseCaption = computed(() => (operationType.value === 'add' ? 'Add User' : 'Edit User'));

watch(
    [operationType, editingTrainee],
    () => {
        photoUrl.value = operationType.value === 'add' ? '' : editingTrainee.value.avatar;
    },
    { immediate: true }
);

const addUser = async () => {
    try {
        await axios.post(`https://reqres.in/api/users`, traineeToSend.value);
    } catch (error) {
        console.error(error);
    } finally {
        router.push({ name: 'TraineeList' });
    }
};

const editUser = async () => {
    try {
        await axios.put(`https://reqres.in/api/users/${editingTrainee.value.id}`, traineeToSend.value);
    } catch (error) {
        console.error(error);
    } finally {
        router.push({ name: 'TraineeList' });
    }
};

const selectPhoto = () => {
    fileInput.value.click();
};

const uploadPhoto = event => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = e => {
            photoUrl.value = e.target.result;

            console.log(photoUrl.value, 'photoUrl.value');
        };

        reader.readAsDataURL(file);
    }
};
</script>
