<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="grid grid-rows-[auto_1fr] grid-cols-6 gap-6 w-screen h-screen p-6">
    <!-- Header Bar -->
    <header class="col-span-6 bg-sky-500 p-4 text-white rounded-[25px]">
      <h1 class="text-xl font-bold">Main Header Bar</h1>
    </header>

    <!-- Navbar -->
    <nav class="col-span-1 bg-slate-900 p-4 rounded-[25px]">
      <ul class="space-y-4">
        <li>
          <RouterLink to="/" class="text-white hover:text-gray-200">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="text-white hover:text-gray-200">About</RouterLink>
        </li>
        <li>
          <RouterLink to="/profile" class="text-white hover:text-gray-200">Profile</RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Main Content -->
    <main class="col-span-5 bg-slate-800 p-6 text-white rounded-[25px]">
      <RouterView />
    </main>
  </div>
</template>

<!-- <style scoped></style> -->
