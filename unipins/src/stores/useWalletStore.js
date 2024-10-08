// stores/useWalletStore.js
import { defineStore } from 'pinia'

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    walletAddress: null
  }),
  actions: {
    setWalletAddress(address) {
      this.walletAddress = address
    },
    clearWalletAddress() {
      this.walletAddress = null
    }
  }
})
