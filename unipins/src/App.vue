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
        <!-- Organizations as Buttons -->
        <li v-for="org in organizations" :key="org.id">
          <RouterLink :to="`/organizations/${org.id}`" class="text-white hover:text-gray-200">
            {{ org.organization.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Main Content -->
    <main class="col-span-5 p-6 pt-0 pl-0 text-white rounded-lg overflow-y-auto">
      <RouterView />
    </main>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router'; // Make sure to import RouterLink if not already

export default {
  setup() {
    const organizations = ref([]);

    // Fetch organizations from the server
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('http://localhost:3000/organizations'); // Adjust the URL as needed
        organizations.value = await response.json();
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    // Fetch organizations when the component is mounted
    onMounted(fetchOrganizations);

    return {
      organizations,
    };
  },
};
</script>

<style scoped>
nav {
  height: calc(100vh - 64px);
}
</style>
