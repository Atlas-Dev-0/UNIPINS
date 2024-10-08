<template>
  <div v-if="organization" name="banner" class="w-full rounded-xl h-[250px] mb-[20px] overflow-hidden relative">
    <img :src="fullBannerImagePath" alt="Banner Image" class="w-full h-full object-cover" />
  </div>
  <div v-if="organization" name="name-of-org" class="flex flex-col items-center mt-4 mb-10">
    <h1 class="text-5xl font-bold w-full text-center">{{ organization.organization.name }}</h1>
    <div class="flex items-center p-5 rounded-lg mt-4">
      <button class="bg-blue-500 text-white text-xl rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300">
        Follow
      </button>
      <button @mouseover="isHovered = true" @mouseleave="isHovered = false"
        class="border border-green-500 text-xl text-green-500 rounded-lg py-2 px-4 ml-5 mr-2 hover:bg-green-500 hover:text-white transition duration-1000"
        style="width: 120px; position: relative;" @click="openModal">
        <span class="transition-opacity duration-300" :class="isHovered ? 'opacity-0' : 'opacity-100'">
          Support
        </span>
        <span class="absolute inset-0 flex justify-center items-center transition-transform duration-300"
          :class="isHovered ? 'scale-100' : 'scale-0'">
          $
        </span>
      </button>
    </div>
  </div>

  <div v-if="cards.length > 0" class="grid grid-cols-5 auto-rows-min w-full rounded-xl pl-4 pr-5 pb-12 gap-4">
    <div v-for="(card, index) in cards" :key="index"
      class="bg-blue-900 h-fit rounded-lg shadow p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out hover:scale-105">
      <h3 class="text-xl font-bold mb-2">{{ card.title }}</h3>
      <p class="text-white-700 mb-4">
        {{ card.content }}
      </p>
      <div class="flex items-center justify-between">
        <button class="flex items-center space-x-2" @click="toggleLike(index)">
          <svg class="w-6 h-6" :class="card.liked ? 'text-red-500' : 'text-white'" fill="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1 4.5 2.54C12.09 5 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        <button class="flex items-center space-x-2">
          <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 8h10M7 12h8m-7 8l4-4H5V5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 4z"></path>
          </svg>
          <span>Comments</span>
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>No cards available for this organization.</p>
  </div>

  <!-- Donation Modal -->
  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-sm w-full">
      <img :src="fullBannerImagePath" alt="Banner" class="w-full h-20 object-cover rounded-lg mb-4" />
      <h2 class="text-xl font-bold mb-4 text-center">Donate to {{ organization.organization.name }}</h2>
      <input v-model="donationAmount" type="number" placeholder="Enter amount"
        class="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full mb-4" />
      <button @click="makeDonation"
        class="bg-green-500 text-white py-2 rounded w-full hover:bg-green-600 transition duration-300">Donate</button>
      <button @click="closeModal" class="mt-4 text-red-500 hover:underline">Cancel</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const organization = ref(null)
    const cards = ref([])
    const isHovered = ref(false)
    const isModalOpen = ref(false)
    const donationAmount = ref(0)

    // Computed property for the full image path
    const fullBannerImagePath = computed(() => {
      if (organization.value && organization.value.organization.bannerImage) {
        if (organization.value.organization.bannerImage.startsWith('/')) {
          return organization.value.organization.bannerImage
        } else {
          return `/${organization.value.organization.bannerImage}`
        }
      }
      return ''
    })

    // Fetch organization data from the local JSON file
    const fetchOrganizationData = async () => {
      const orgId = route.params.id // Get the organization id from the route
      try {
        console.log('Fetching organization data...');
        const response = await fetch('/unipins-database.json')
        if (!response.ok) throw new Error('Failed to fetch the JSON file')

        const data = await response.json()
        console.log('Fetched data:', data);

        const orgData = data.organizations.find(org => org.id.toString() === orgId)
        if (orgData) {
          organization.value = orgData
          cards.value = orgData.cards.map(card => ({ ...card, liked: false }))
          console.log('Organization found:', orgData);
        } else {
          console.error('Organization not found for id:', orgId);
        }

      } catch (error) {
        console.error('Error fetching organization data:', error)

        organization.value = null
        cards.value = []
      }
    }

    onMounted(() => {
      fetchOrganizationData()
    })

    watch(() => route.params.id, () => {
      fetchOrganizationData();
    });

    const toggleLike = (index) => {
      cards.value[index].liked = !cards.value[index].liked
    }

    // Modal control methods
    const openModal = () => {
      isModalOpen.value = true;
    }

    const closeModal = () => {
      isModalOpen.value = false;
      donationAmount.value = 0; // Reset donation amount
    }

    const makeDonation = () => {
      // Handle the donation logic here (e.g., call a web3 function)
      console.log(`Donated ${donationAmount.value} to ${organization.value.organization.name}`);
      closeModal();
      // Optionally, reset the amount or update UI after donation
    }

    return {
      organization,
      cards,
      isHovered,
      toggleLike,
      fullBannerImagePath,
      isModalOpen,
      openModal,
      closeModal,
      donationAmount,
      makeDonation
    }
  }
}
</script>

<style scoped>
/* Add any additional styles here */
.fixed {
  position: fixed;
}

.bg-gray-800 {
  background-color: #2d2d2d;
}
</style>
