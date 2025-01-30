<template>
    <div class="bg-white p-4">
        <div class="flex justify-between items-center mb-4">
            <input v-model="searchQuery" type="text" placeholder="Search users..." class="p-2 border rounded w-1/3" />
            <button class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" @click="goToEditAddTrainee('add')">
                Add User
            </button>
        </div>

        <table class="w-full border-collapse border border-gray-200">
            <thead>
                <tr class="bg-gray-100">
                    <th class="border p-2">Avatar</th>
                    <th class="border p-2">Full Name</th>
                    <th class="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="trainee in filteredTrainees" :key="trainee.id" class="border-b">
                    <td class="p-2 text-center">
                        <img
                            :src="trainee.avatar"
                            alt="Avatar"
                            class="w-10 h-10 rounded-full mx-auto cursor-pointer"
                            @click="openPhoto(trainee.avatar)"
                        />
                    </td>
                    <td class="p-2 text-center">{{ trainee.fullName }}</td>
                    <td class="p-2 flex justify-center gap-2">
                        <button
                            class="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                            @click="goToEditAddTrainee('edit', trainee)"
                        >
                            Edit
                        </button>
                        <button
                            class="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                            @click="deleteTrainee(trainee.id)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="flex justify-left mt-4">
        <button
            class="px-3 py-1 border rounded mx-1"
            :class="currentPage === 1 ? 'cursor-default' : 'cursor-pointer'"
            :disabled="currentPage === 1"
            @click="prevPage"
        >
            Prev
        </button>
        <span class="px-3">Page: {{ currentPage }} / {{ totalPages }}</span>
        <button
            class="px-3 py-1 border rounded mx-1 cursor-pointer"
            :class="currentPage === totalPages ? 'cursor-default' : 'cursor-pointer'"
            :disabled="currentPage === totalPages"
            @click="nextPage"
        >
            Next
        </button>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const trainees = ref([]);
const currentPage = ref(1);
const totalPages = ref(2); // tylko na tyle pozwala api?
const searchQuery = ref('');

onMounted(() => {
    getUsers();
});

const filteredTrainees = computed(() => {
    if (searchQuery.value.length < 2) {
        return trainees.value;
    }

    const searchQueryLowerCase = searchQuery.value.toLowerCase();

    return trainees.value.filter(trainee => trainee.fullName.toLowerCase().includes(searchQueryLowerCase));
});

async function getUsers() {
    const { data } = await axios.get(`https://reqres.in/api/users?page=${currentPage.value}`);

    trainees.value = data.data.map(user => {
        return {
            id: user.id,
            avatar: user.avatar,
            fullName: `${user.first_name} ${user.last_name}`
        };
    });

    console.log(data, 'data');
    console.log(trainees, 'trainees');
}

function openPhoto(img) {
    window.open(img, '_blank');
}

function nextPage() {
    currentPage.value++;

    getUsers();
}

function prevPage() {
    currentPage.value--;

    getUsers();
}

function goToEditAddTrainee(operation, user) {
    if (operation === 'add') {
        router.push({ name: 'AddEditTrainee' });
    } else {
        router.push({ name: 'AddEditTrainee', props: { user } });
    }
}
</script>
