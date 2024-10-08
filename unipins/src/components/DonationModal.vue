<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <h2 class="modal-title">Donate to {{ organizationName }}</h2>
      <input v-model="amount" type="number" placeholder="Enter amount in SOL" class="amount-input" />
      <button @click="donate" class="donate-button">Donate</button>
      <button @click="closeModal" class="close-button">Close</button>
      <div v-if="transactionSignature" class="transaction-info">
        <p>Transaction Signature: {{ transactionSignature }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Connection, PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';

export default {
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    organizationName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const amount = ref('');
    const transactionSignature = ref('');

    const DONATION_ADDRESS = 'AJ8v2a8QhNrN7KtTQxre6ySzXCov4hYUrXBkja66Um54';
    const connection = new Connection('https://api.testnet.solana.com');
    let walletAddress = null;

    // Function to donate
    const donate = async () => {
      const lamportsToDonate = parseFloat(amount.value) * LAMPORTS_PER_SOL;
      if (isNaN(lamportsToDonate) || lamportsToDonate <= 0) {
        alert('Please enter a valid donation amount in SOL.');
        return;
      }

      const recipientPublicKey = new PublicKey(DONATION_ADDRESS);
      const transaction = new Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey: walletAddress,
          toPubkey: recipientPublicKey,
          lamports: lamportsToDonate,
        })
      );

      try {
        const { signature } = await window.solana.signAndSendTransaction(transaction);
        transactionSignature.value = signature;
        alert('Donation successful! Thank you for your generosity.');
        amount.value = ''; // Clear the amount input after donation
      } catch (err) {
        console.error('Transaction failed:', err);
        alert('Donation transaction failed.');
      }
    };

    // Function to close the modal
    const closeModal = () => {
      transactionSignature.value = ''; // Reset transaction signature when closing
      amount.value = ''; // Clear input
      props.showModal = false; // Emit close event
    };

    return {
      amount,
      transactionSignature,
      donate,
      closeModal
    };
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.amount-input {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
}

.donate-button,
.close-button {
  margin: 5px;
}
</style>
