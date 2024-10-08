<template>
  <div v-if="organization" name="banner" class="w-full rounded-xl h-[250px] mb-[20px] overflow-hidden relative">
    <img :src="fullBannerImagePath" alt="Banner Image" class="w-full h-full object-cover" />
  </div>
  <div v-if="organization" name="name-of-org" class="flex flex-col items-center mt-4 mb-10">
    <div class="flex items-center p-5 rounded-lg mt-4">
      <h1 class="text-5xl font-bold w-full text-left">{{ organization.organization.name }}</h1>
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
      class="bg-slate-800 h-fit rounded-lg shadow p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out hover:bg-blue-900 hover:scale-105 cursor-pointer">
      <h3 class="text-xl font-bold mb-2">{{ card.title }}</h3>
      <p class="text-white-700 mb-4">{{ card.content }}</p>
      <div class="flex items-center justify-between">
        <button class="flex items-center space-x-2" @click="toggleLike(index)">
          <svg class="w-6 h-6" :class="card.liked ? 'text-red-500' : 'text-white'" fill="currentColor"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1 4.5 2.54C12.09 5 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span class="text-white">{{ card.likes }} </span> <!-- Display likes count -->
        </button>
        <button class="flex items-center space-x-2" @click="openCommentsModal(card.comments)">
          <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 8h10M7 12h8m-7 8l4-4H5V5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 4z"></path>
          </svg>
          <span class="text-blue-500">{{ card.comments.length }} Comments</span> <!-- Display comments count -->
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>No cards available for this organization.</p>
  </div>

  <!-- Comments Modal -->
  <div v-if="isCommentsModalOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 class="text-xl font-bold mb-4 text-center">Comments</h2>
      <div v-if="comments.length > 0">
        <ul>
          <li v-for="(comment, index) in comments" :key="index" class="mb-2">
            <strong>{{ comment.username }}:</strong> {{ comment.content }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No comments available.</p>
      </div>
      <button @click="closeCommentsModal" class="mt-4 text-red-500 hover:underline">Close</button>
    </div>
  </div>

  <!-- Donation Modal -->
  <div v-if="isWalletConnected">
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <img :src="fullBannerImagePath" alt="Banner" class="w-full h-20 object-cover rounded-lg mb-4" />
        <h2 class="text-xl font-bold mb-4 text-center">Donate to {{ organization.organization.name }}</h2>
        <textarea readonly rows="1" class="w-full border h-[25px] my-3 walletAddress" v-if="walletAddress">Connected: {{
          walletAddress }}</textarea>

        <input v-model="donationAmount" type="number" placeholder="Enter amount (in SOL)"
          class="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full mb-4" step="0.001" min="0" required />
        <button @click="donate"
          class="bg-green-500 text-white py-2 rounded w-full hover:bg-green-600 transition duration-300">
          Donate
        </button>
        <button @click="closeModal" class="mt-4 text-red-500 hover:underline">Cancel</button>
        <p v-if="transactionSignature" class="mt-4">Transaction Signature: <span>{{ transactionSignature }}</span></p>
      </div>
    </div>
  </div>
  <div v-else>

    <div v-if="!isWalletConnected && isModalOpen && openModal"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 class="text-xl font-bold mb-4 text-center">Wallet Connection Required</h2>
        <p class="mb-4">Please connect your wallet to access donation features.</p>
        <button @click="closeModal"
          class="bg-green-500 text-white py-2 rounded w-full hover:bg-green-600 transition duration-300">Ok, I
          understand</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Connection, PublicKey, Transaction, LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js'

import { useWalletStore } from '@/stores/useWalletStore'; // adjust the path as needed

export default {
  setup() {
    const route = useRoute()
    const organization = ref(null)
    const cards = ref([])
    const isHovered = ref(false)
    const isModalOpen = ref(false)
    const donationAmount = ref(0)
    const walletAddress = ref(null)
    const transactionSignature = ref(null)
    const walletStore = useWalletStore();
    const isWalletConnected = computed(() => {
      return walletStore.walletAddress !== null;
    });
    const isCommentsModalOpen = ref(false)
    const comments = ref([])

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

    // Solana connection
    const connection = new Connection('https://api.devnet.solana.com')
    const DONATION_ADDRESS = '5ZXqcw99pAfKd6dZDuVFH64ntmER8rwfv9ybqxHumzry'

    // Fetch organization data from the local JSON file
    const fetchOrganizationData = async () => {
      const orgId = route.params.id // Get the organization id from the route
      try {
        const response = await fetch('/unipins-database.json')
        if (!response.ok) throw new Error('Failed to fetch the JSON file')

        const data = await response.json()
        const orgData = data.organizations.find(org => org.id.toString() === orgId)
        if (orgData) {
          organization.value = orgData
          cards.value = orgData.cards.map(card => ({ ...card, liked: false }))
        } else {
          console.error('Organization not found for id:', orgId)
        }

      } catch (error) {
        console.error('Error fetching organization data:', error)

        organization.value = null
        cards.value = []
      }
    }

    onMounted(() => {
      fetchOrganizationData()
      autoConnectWallet(); // Automatically try to connect to the wallet on mount
    })

    watch(() => route.params.id, () => {
      fetchOrganizationData();
    });

    const toggleLike = (index) => {
      cards.value[index].liked = !cards.value[index].liked
    }

    const openCommentsModal = (cardComments) => {
      comments.value = cardComments; // Set comments for the selected card
      isCommentsModalOpen.value = true; // Open comments modal
    }

    const closeCommentsModal = () => {
      isCommentsModalOpen.value = false; // Close comments modal
    }

    // Wallet connection methods
    const connectWallet = async () => {
      if (window.solana && window.solana.isPhantom) {
        try {
          const response = await window.solana.connect();
          walletAddress.value = response.publicKey.toString();
          console.log('Wallet connected:', walletAddress.value);
        } catch (err) {
          console.error('Error connecting to Phantom Wallet:', err);
        }
      } else {
        alert('Phantom wallet is not installed. Please install it to proceed.');
      }
    }

    const disconnectWallet = async () => {
      if (window.solana && window.solana.isPhantom) {
        try {
          await window.solana.disconnect();
          walletAddress.value = null;
          console.log('Wallet disconnected');
        } catch (err) {
          console.error('Error disconnecting Phantom Wallet:', err);
        }
      }
    }

    const autoConnectWallet = async () => {
      if (window.solana && window.solana.isPhantom) {
        try {
          await window.solana.connect({ onlyIfTrusted: true });
          walletAddress.value = window.solana.publicKey.toString();
          console.log('Wallet auto-connected:', walletAddress.value);
        } catch (err) {
          console.log('User not previously connected');
        }
      }
    }

    // Donation method
    const donate = async () => {
      const amount = parseFloat(donationAmount.value);
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid donation amount in SOL.');
        return;
      }

      const lamportsToDonate = amount * LAMPORTS_PER_SOL;
      try {
        const recipientPublicKey = new PublicKey(DONATION_ADDRESS);
        const fromPubkey = new PublicKey(walletAddress.value);
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey,
            toPubkey: recipientPublicKey,
            lamports: lamportsToDonate,
          })
        );

        const { signature } = await window.solana.signAndSendTransaction(transaction);
        transactionSignature.value = signature; // Store the transaction signature
        alert('Donation successful! Transaction signature: ' + signature);
      } catch (err) {
        console.error('Transaction failed:', err);
        alert('Donation failed. Check the console for details.');
      }
    }

    const openModal = () => {
      isModalOpen.value = true;
    }

    const closeModal = () => {
      isModalOpen.value = false;
      donationAmount.value = 0;
      transactionSignature.value = null; // Reset transaction signature
    }

    return {
      organization,
      cards,
      isHovered,
      isModalOpen,
      isCommentsModalOpen,
      comments,
      donationAmount,
      walletAddress,
      transactionSignature,
      fullBannerImagePath,
      isWalletConnected,
      openModal,
      closeModal,
      toggleLike,
      openCommentsModal,
      closeCommentsModal,
      donate,
    }
  }
}
</script>

<style scoped>
.fixed {
  position: fixed;
}

.bg-gray-800 {
  background-color: #2d2d2d;
}


.walletAddress {
  background: none;
  border: none;
  overflow: clip;
  resize: none;
  white-space: nowrap;
  display: inline;
}
</style>
