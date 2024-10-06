<template>
  <div name="banner" class="w-full rounded-xl h-[250px] mb-[20px] overflow-hidden relative">
    <img :src="bannerImage" alt="Banner Image" class="w-full h-full object-cover" />
  </div>
  <div class="grid grid-cols-5 auto-rows-min w-full rounded-xl p-0 gap-4">
    <!-- Dynamically render the cards from the JSON data -->
    <div v-for="(card, index) in cards" :key="index"
      class="bg-slate-800 h-fit rounded-lg shadow p-4 flex flex-col justify-between">

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
          <span>Comment</span>
        </button>

      </div>
    </div>
  </div>
</template>

<script>
import cardsData from '@/stores/database/cards.json';
import bannerImage from '../../../icpep-organization-datas/banner/banner.jpg'; // Adjust this path as needed

export default {
  data() {
    return {
      cards: cardsData.map(card => ({ ...card, liked: false })), // Initialize liked state for each card
      bannerImage // Store the imported image in the data
    };
  },
  methods: {
    toggleLike(index) {
      // Toggle the "liked" state for the clicked card
      this.cards[index].liked = !this.cards[index].liked;
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
