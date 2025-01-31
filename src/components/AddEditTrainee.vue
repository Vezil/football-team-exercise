<template>
    <div class="md:flex w-full md:gap-20">
        <div class="w-full md:w-2/3 bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">{{ baseCaption }}</h2>
            <div class="flex gap-4">
                <input v-model="trainee.firstName" placeholder="First Name" class="border p-2 rounded w-1/2" />
                <input v-model="trainee.lastName" placeholder="Last Name" class="border p-2 rounded w-1/2" />
            </div>
            <button @click="addUser" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                {{ baseCaption }}
            </button>
        </div>
        <div class="w-full md:w-1/3 bg-white mt-10 md:mt-0 p-6 rounded-lg shadow flex flex-col items-center">
            <img :src="photoUrl" class="w-24 h-24 rounded-full object-cover border" alt="User Photo" />
            <input type="file" @change="uploadPhoto" class="hidden" ref="fileInput" />
            <button @click="selectPhoto" class="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Change Photo</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useTraineesStore } from '@/stores/trainees';

const { editingTrainee, operationType } = storeToRefs(useTraineesStore());

const firstName = ref('');
const lastName = ref('');
const fileInput = ref(null);

const trainee = computed(() => ({
    firstName: operationType.value === 'add' ? firstName.value : editingTrainee.value.fullName.split(' ')[0],
    lastName: operationType.value === 'add' ? lastName.value : editingTrainee.value.fullName.split(' ')[1]
}));

const photoUrl = computed(() => (operationType.value === 'add' ? '' : editingTrainee.value.avatar));

const baseCaption = computed(() => (operationType.value === 'add' ? 'Add User' : 'Edit User'));

const addUser = async () => {
    try {
        const traineeToSend = {
            name:
                operationType.value === 'add'
                    ? `${firstName.value} ${lastName.value}`
                    : `${editingTrainee.value.firstName} ${editingTrainee.value.lastName}`,
            job: 'trainee'
        };

        await axios.post(`https://reqres.in/api/users`, traineeToSend);
    } catch (error) {
        console.error(error);
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
