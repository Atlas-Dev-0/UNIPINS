<template>
  <div class="grid grid-rows-[auto_1fr] grid-cols-6 gap-2 w-screen h-screen p-6 overflow-hidden">

    <!-- Header Bar -->
    <header
      class="col-span-6 bg-slate-800 align-middle pl-6 pr-6 p-2 text-white rounded-2xl flex justify-between items-center">
      <!-- Logo -->
      <RouterLink to="/">
        <img src="@/assets/images/UNIPINS_logo.png" alt="Banner Image" class="w-[120px] h-auto object-cover" />
      </RouterLink>

      <!-- Account Button with Dropdown -->
      <div class="align-middle relative z-50" @click="toggleDropdown">
        <img src="@/assets/icons/account_icon.svg" alt="account" class="align-middle w-8 h-8 cursor-pointer">
        <!-- Dropdown menu -->
        <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-lg">
          <p class="px-4 py-2 text-sm text-white">Username: Mrg2400 </p>
          <p class="px-4 py-2 text-sm text-white">Wallet ID: {{ walletId }}</p>
          <button class="w-full text-left px-4 py-2 hover:bg-slate-600 text-white">
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Navbar -->
    <nav class="col-span-1 bg-slate-800 p-4 rounded-[25px] sticky top-0 h-[calc(100vh-64px)] overflow-y-auto">
      <RouterLink to="/">
        <h1 class="p-1 text-xl font-bold text-slate-100 mb-4 rounded-xl text-left">
          Home
        </h1>
      </RouterLink>
      <div>
        <h1 class="text-xl font-medium font-zinc-200 mb-4 rounded-xl text-left">
          JOINED ORGANIZATIONS
        </h1>
      </div>
      <ul class="space-y-4 rounded-lg">
        <li v-for="org in organizations" :key="org.id">
          <RouterLink :to="`/organizations/${org.id}`"
            class="flex items-center text-white w-full rounded-lg hover:text-gray-200"
            active-class="bg-blue-900 p-2 text-white" exact-active-class="bg-slate-600 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.7 988.19"
              class="fill-white w-[30px] h-[30px] mr-2 fill-current text-slate-500">
              <g id="Layer_2" data-name="Layer 2">
                <g id="COMPONENTS">
                  <path d="M241.64,485.74,20.88,988.19l50-546.52a241.13,241.13,0,0,0,170.73,44.07Z" />
                  <path
                    d="M431.69,274.16A219.29,219.29,0,1,1,7,164.54C37.29,47.28,156.88-23.26,274.17,7S462,156.91,431.69,274.16Z" />
                </g>
              </g>
            </svg>
            <h1 class="text-ellipsis overflow-hidden whitespace-nowrap">
              {{ org.organization.name }}
            </h1>
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
import { RouterLink } from 'vue-router';

export default {
  setup() {
    const organizations = ref([]);
    const showDropdown = ref(false);
    const walletId = ref("Your Solana Wallet ID"); // Replace with actual wallet ID logic

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    // Fetch organizations from the local JSON file
    const fetchOrganizations = async () => {
      try {
        console.log('Fetching organizations...'); // Log fetch start

        const response = await fetch('/unipins-database.json'); // Corrected path to local file
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        console.log('Data fetched:', data); // Log data to debug
        organizations.value = data.organizations || []; // Ensure the structure is what you expect

        console.log('Organizations:', organizations.value); // Log organizations for verification
      } catch (error) {
        console.error('Error fetching organizations:', error); // Log any errors
      }
    };

    // Fetch organizations when the component is mounted
    onMounted(fetchOrganizations);

    return {
      organizations,
      showDropdown,
      toggleDropdown,
      walletId,
    };
  },
};
</script>

<style scoped>
nav {
  height: calc(100vh - 64px);
}

.text-white {
  color: #ffffff;
}

h1 {
  font-size: 1rem;
}
</style>
