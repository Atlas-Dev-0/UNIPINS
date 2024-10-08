<template>
  <div class="min-h-screen flex flex-col justify-between items-center text-gray-200">
    <!-- Welcome Section -->
    <div class="flex justify-center w-full overflow-hidden h-fit p-0 mt-10 mb-10 items-center">
      <h1 class="text-3xl font-bold">WELCOME TO</h1>
    </div>

    <!-- Logo Section -->
    <div class="flex justify-center w-full overflow-hidden h-fit p-0 items-center">
      <img src="@/assets/images/UNIPINS_logo.png" alt="UNIPINS Logo" class="w-[500px] h-auto" />
    </div>

    <!-- Summary Section -->
    <div class="w-3/4 text-center mt-8">
      <p class="text-gray-400 text-lg">
        UNIPINS is a Web3-based social platform where students and university organizations interact.
        Using Solana-based payments, organizations can post announcements and merchandise, while students engage through
        donations and pins. Join the future of university communities with seamless digital interactions and
        fundraising.
      </p>
    </div>

    <div class="w-full text-center mt-8">
      <h1 class="text-4xl font-medium">
        Key Features:
      </h1>
    </div>

    <!-- Features Section -->
    <div class="w-full py-16 cursor-pointer">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <!-- Feature 1 -->
        <div class="card bg-blue-900 p-6 rounded-lg shadow-lg">
          <img src="@/assets/icons/web_icon.svg" alt="">
          <h3 class="text-xl font-semibold text-gray-200">Web3 Integration</h3>
          <p class="mt-4 text-gray-400">
            Seamless Web3 login and Solana payment integration for organizations and users.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="card bg-blue-900 p-6 cursor-pointer rounded-lg shadow-lg">
          <img class="mx-auto mt-[50px] mb-[50px] w-auto h-[100px]" src="@/assets/icons/students_icon.svg" alt="">
          <h3 class="text-xl font-semibold text-gray-200">Student Engagement</h3>
          <p class="mt-4 text-gray-400">
            Students can pin, donate, and interact with university content like events and announcements.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="card bg-blue-900 p-6 cursor-pointer rounded-lg shadow-lg">
          <img src="@/assets/icons/solana_icon.svg" alt="">
          <h3 class="text-xl font-semibold text-gray-200">Solana Donations</h3>
          <p class="mt-4 text-gray-400">
            Organizations receive donations directly via Solana, helping them reach fundraising goals.
          </p>
        </div>
      </div>
    </div>

    <!-- Available Groups Section -->
    <div class="w-full text-center mt-3">
      <h1 class="text-4xl font-bold ">
        Available Groups
      </h1>

      <!-- Search Bar -->
      <input v-model="searchQuery" type="text" placeholder="Search for a group..."
        class="w-full max-w-lg mx-auto p-2 mt-4 bg-gray-800 text-white rounded-md" />
    </div>

    <!-- Groups List -->
    <div class="w-full py-16">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <!-- Conditional rendering: No groups found message -->
        <div v-if="filteredOrganizations.length === 0"
          class="text-2xl p-6 mt-4 font-bold h-[300px] text-gray-400 text-center ">
          No groups found.
        </div>

        <!-- Organization Cards -->
        <div v-else v-for="org in filteredOrganizations" :key="org.id"
          class="card h-[200] bg-slate-800 p-6 rounded-lg shadow-lg">
          <!-- Banner Teaser -->
          <div class="border mx-auto my-auto align-center h-[100px] overflow-hidden">
            <img :src="`/public/${org.organization.bannerImage}`" :alt="org.organization.name"
              class="w-full h-[200px] object-cover rounded-lg mb-4" />
          </div>

          <h3 class="text-xl font-semibold text-gray-200">{{ org.organization.name }}</h3>
          <!-- Follow Button -->
          <button @click="followOrganization(org.id)"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none">
            Follow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const organizations = ref([]);
    const searchQuery = ref('');

    // Fetch organizations from JSON
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('/unipins-database.json');
        const data = await response.json();
        organizations.value = data.organizations; // Assign the JSON response to organizations array
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    // Call fetchOrganizations when the component is mounted
    onMounted(fetchOrganizations);

    // Computed property to filter organizations based on the search query
    const filteredOrganizations = computed(() => {
      return organizations.value.filter((org) =>
        org.organization.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    return {
      searchQuery,
      filteredOrganizations,
    };
  },
};
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
}

input {
  border: 1px solid #ccc;
}

img {
  border-radius: 10px;
}
</style>
