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
        <div v-if="showDropdown" class="absolute overflow-hidden right-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-lg">
          <p class="px-4 py-2 text-sm text-white ">Username: Mrg2400 </p>
          <p v-if="walletStore.walletAddress" class="px-4 py-2 text-sm text-white">Wallet ID: {{
            walletStore.walletAddress }}</p>
          <button v-if="!walletStore.walletAddress" @click="connectWallet"
            class="w-full text-left px-4 py-2 hover:bg-slate-600 text-white">
            Connect Wallet
          </button>
          <button v-if="walletStore.walletAddress" @click="disconnectWallet"
            class="w-full text-left px-4 py-2 hover:bg-slate-600 text-white">
            Disconnect Wallet
          </button>
          <button class="w-full text-left px-4 py-2 hover:bg-slate-600 text-white">
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Navbar -->
    <nav class="col-span-1 bg-slate-800 p-4 rounded-[25px] sticky top-0 h-[calc(100vh-64px)] overflow-y-auto">
      <RouterLink to="/" class="flex h-[35px] items-center items-baseline ">
        <div class="h-[15px] m-4">
          <img src="@/assets/icons/homeIcon.svg" alt="home" class="h-[15px] cursor-pointer">
        </div>
        <h2 class="text-xl h-full font-bold text-slate-100 text-left">
          Home
        </h2>
      </RouterLink>
      <div>
        <h1 class="mt-10 text-xl font-medium font-zinc-200 mb-4 rounded-xl text-left">
          JOINED ORGANIZATIONS
        </h1>
      </div>
      <ul class="space-y-4 rounded-lg">
        <li v-for="org in organizations" :key="org.id">
          <RouterLink :to="`/organizations/${org.id}`"
            class="flex items-center text-white w-full rounded-lg hover:text-gray-200"
            active-class="bg-blue-900 p-2 text-white" exact-active-class="bg-blue-600 text-white">
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
import { Connection } from '@solana/web3.js';
import { useWalletStore } from '@/stores/useWalletStore'; // adjust the path as needed

export default {
  setup() {
    const organizations = ref([]); // Store joined organizations
    const showDropdown = ref(false);
    const walletStore = useWalletStore(); // Get wallet store

    const connection = new Connection('https://api.devnet.solana.com'); // Solana Devnet

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const fetchOrganizations = async () => {
      try {
        const response = await fetch('/unipins-database.json');
        const data = await response.json();
        organizations.value = data.organizations || [];
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    const connectWallet = async () => {
      if (window.solana && window.solana.isPhantom) {
        try {
          const response = await window.solana.connect();
          const address = response.publicKey.toString();
          walletStore.setWalletAddress(address); // Set wallet address in store
          console.log('Wallet connected:', address);
        } catch (err) {
          console.error('Error connecting to Phantom Wallet:', err);
        }
      } else {
        alert('Phantom wallet is not installed. Please install it to proceed.');
      }
    };

    const disconnectWallet = async () => {
      if (window.solana && window.solana.isPhantom) {
        try {
          await window.solana.disconnect();
          walletStore.clearWalletAddress(); // Clear wallet address in store
          console.log('Wallet disconnected.');
        } catch (err) {
          console.error('Error disconnecting Phantom Wallet:', err);
        }
      }
    };

    onMounted(fetchOrganizations);

    return {
      organizations,
      showDropdown,
      toggleDropdown,
      connectWallet,
      disconnectWallet,
      walletStore, // Expose wallet store for template access
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
