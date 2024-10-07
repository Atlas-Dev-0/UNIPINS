<template>
  <div v-if="organization" name="banner" class="w-full rounded-xl h-[250px] mb-[20px] overflow-hidden relative">
    <img :src="organization.bannerImage" alt="Banner Image" class="w-full h-full object-cover" />
  </div>
  <div v-if="organization" name="name-of-org" class="flex p-4 items-center mt-4 mb-10">
    <h1 class="text-5xl font-bold w-4/5 h-fit">{{ organization.name }}</h1>
    <div class="flex items-center p-5 rounded-lg">
      <button
        class="bg-blue-500 text-white text-xl rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300">Follow</button>
      <button @mouseover="isHovered = true" @mouseleave="isHovered = false"
        class="border border-green-500 text-xl text-green-500 rounded-lg py-2 px-4 ml-5 mr-2 hover:bg-green-500 hover:text-white transition duration-1000"
        style="width: 120px; position: relative;">
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
    <!-- Dynamically render the cards from the JSON data -->
    <div v-for="(card, index) in cards" :key="index"
      class="bg-blue-900 h-fit rounded-lg shadow p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out hover:scale-105">
      <!-- Title Section -->
      <h3 class="text-xl font-bold mb-2">{{ card.title }}</h3>
      <!-- Content Section -->
      <p class="text-white-700 mb-4">
        {{ card.content }}
      </p>
      <!-- Interaction Section -->
      <div class="flex items-center justify-between">
        <!-- Heart Icon -->
        <button class="flex items-center space-x-2" @click="toggleLike(index)">
          <svg class="w-6 h-6" :class="card.liked ? 'text-red-500' : 'text-white'" fill="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1 4.5 2.54C12.09 5 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        <!-- Comment Icon -->
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
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const route = useRoute()
    const organization = ref()
    const cards = ref([])
    const isHovered = ref(false)

    // Fetch organization data based on route params
    const fetchOrganizationData = async () => {
      const orgId = route.params.id // Get the organization id from the route
      try {
        const response = await axios.get(`http://localhost:3000/organizations/${orgId}`)
        organization.value = response.data.organization // Fetch organization details
        cards.value = response.data.cards.map(card => ({ ...card, liked: false })) // Initialize liked state for each card

        console.log("Presenting Organization")
        console.log("Name: ", organization.value.name)
      } catch (error) {
        console.error('Error fetching organization data:', error)
      }
    }

    onMounted(() => {
      fetchOrganizationData() // Fetch data when component is mounted
    })

    // Watch for route changes and refetch data when route changes
    watch(route, () => {
      fetchOrganizationData(); // Refetch the organization data when route changes
    });

    const toggleLike = (index) => {
      cards.value[index].liked = !cards.value[index].liked
    }

    return {
      organization,
      cards,
      isHovered,
      toggleLike,
    }
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
