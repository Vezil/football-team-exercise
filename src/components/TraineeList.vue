<template>
    <div class="bg-white p-4">
        <div class="flex justify-between items-center mb-4">
            <input v-model="searchQuery" type="text" placeholder="Search users..." class="p-2 border rounded w-1/3" />
            <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="goToEditAddUser">Add User</button>
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
                <tr v-for="user in filteredUsers" :key="user.id" class="border-b">
                    <td class="p-2 text-center">
                        <img :src="user.avatar" alt="Avatar" class="w-10 h-10 rounded-full mx-auto" />
                    </td>
                    <td class="p-2 text-center">{{ user.fullName }}</td>
                    <td class="p-2 flex justify-center gap-2">
                        <button class="bg-green-500 text-white px-3 py-1 rounded" @click="goToEditAddUser(user)"
                            >Edit</button
                        >
                        <button class="bg-red-500 text-white px-3 py-1 rounded" @click="deleteUser(user.id)"
                            >Delete</button
                        >
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="flex justify-left mt-4">
        <button class="px-3 py-1 border rounded mx-1" @click="prevPage" :disabled="currentPage === 1">Prev</button>
        <span class="px-3">Page {{ currentPage }}</span>
        <button class="px-3 py-1 border rounded mx-1" @click="nextPage" :disabled="currentPage >= totalPages">
            Next
        </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToEditAddUser() {
    router.push({ name: 'AddEditTrainee' });
}
</script>
