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
    <div class="w-full text-center mt-8">
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
    <div class="w-full py-16">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <!-- Feature 1 -->
        <div class=" card bg-blue-900 p-6 rounded-lg shadow-lg">
          <img src="@/assets/icons/web_icon.svg" alt="">
          <h3 class="text-xl font-semibold text-gray-200">Web3 Integration</h3>
          <p class="mt-4 text-gray-400">
            Seamless Web3 login and Solana payment integration for organizations and users.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="card bg-blue-900 p-6 rounded-lg shadow-lg">
          <img class="mx-auto mt-[50px] mb-[50px] w-auto h-[100px]" src="@/assets/icons/students_icon.svg" alt="">
          <h3 class="text-xl font-semibold text-gray-200">Student Engagement</h3>
          <p class="mt-4 text-gray-400">
            Students can pin, donate, and interact with university content like events and announcements.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="card bg-blue-900 p-6 rounded-lg shadow-lg">
          <img src="@/assets/icons/solana_icon.svg" alt="">
          <h3 class="text-xl font-semibold text-gray-200">Solana Donations</h3>
          <p class="mt-4 text-gray-400">
            Organizations receive donations directly via Solana, helping them reach fundraising goals.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.card {
  transition: transform 0.3s ease;
  /* Smooth transition for the transform effect */
}

.card:hover {
  transform: scale(1.05);
  /* Slightly increase size on hover */
}
</style>
