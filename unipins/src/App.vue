<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="grid grid-rows-[auto_1fr] grid-cols-6 gap-6 w-screen h-screen p-6 overflow-hidden">

    <!-- Header Bar -->
    <header class="col-span-6 bg-slate-800 p-4 text-white rounded-[25px]">
      <h1 class="text-xl font-bold">UNIPINS</h1>
    </header>

    <!-- Navbar -->
    <nav class="col-span-1 bg-slate-800 p-4 rounded-[25px] sticky top-0 h-[calc(100vh-64px)] overflow-y-auto">
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
        <li>
          <RouterLink to="/merch-view" class="text-white hover:text-gray-200">Merch View</RouterLink>
        </li>
        <li>
          <RouterLink to="/merch-payment" class="text-white hover:text-gray-200">Merch Payment</RouterLink>
        </li>
        <li>
          <RouterLink to="/donations" class="text-white hover:text-gray-200">Donation</RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Main Content -->
    <main class="col-span-5 p-6 pt-0 text-white rounded-[25px] overflow-y-auto">
      <RouterView />
    </main>

  </div>
</template>

<style scoped>
/* Scoped styles */
nav {
  /* Ensuring sticky works by setting height */
  height: calc(100vh - 64px);
  /* Adjust according to the actual header height */
}
</style>
