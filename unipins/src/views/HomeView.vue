<template>
  <div>
    <div name="banner" class="w-full rounded-xl h-[250px] mb-[20px] overflow-hidden relative">
      <img src="@/stores/database/public/banner.jpg" alt="Banner Image" class="w-full h-full object-cover" />
    </div>
    <div name="name-of-org" class="flex items-center mt-4 mb-10">
      <h1 class="text-5xl font-bold">{{ name }}</h1>
      <!-- Adjusted to access the organization name -->

      <div class="flex items-center p-5 rounded-lg">
        <button class="bg-blue-500 text-white text-xl rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300">
          Follow
        </button>

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

    <div class="grid grid-cols-5 auto-rows-min w-full rounded-xl p-0 gap-4">
      <div v-for="(card, index) in cards" :key="card.id"
        class="bg-slate-800 h-fit rounded-lg shadow p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out hover:scale-105">

        <h3 class="text-xl font-bold mb-2">{{ card.title }}</h3>
        <p class="text-white-700 mb-4">{{ card.content }}</p>

        <div class="flex items-center justify-between">
          <button class="flex items-center space-x-2" @click="toggleLike(card.id)">
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
            <span>Comment</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import axios for making HTTP requests

export default {
  data() {
    return {
      organization: {}, // Holds organization data
      cards: [], // Holds card data
      bannerImage: '', // Store the banner image URL
      name: '', // Store the banner image URL
      isHovered: false, // Add a reactive property for hover state
    };
  },
  mounted() {
    this.loadOrganizationData(1); // Load organization data with ID 1 (you can change this as needed)
  },
  methods: {
    async loadOrganizationData(id) {
      try {
        const orgResponse = await axios.get(`http://localhost:3000/organizations/${id}`); // Adjust URL based on your setup
        const orgData = orgResponse.data;

        if (orgData) {
          this.organization = orgData; // Set organization data
          this.cards = orgData.cards.map(card => ({ ...card, liked: false })); // Initialize liked state for each card
          this.bannerImage = orgData.organization.bannerImage; // Set banner image
          this.name = orgData.organization.name; // Set banner image
          console.log("data is: ");
          console.log(this.organization);
        }
      } catch (error) {
        console.error('Error loading organization data:', error);
      }
    },
    toggleLike(cardId) {
      const card = this.cards.find(c => c.id === cardId);
      if (card) {
        card.liked = !card.liked; // Toggle the "liked" state for the clicked card
      }
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
