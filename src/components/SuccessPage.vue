<template>
  <div class="container">
    <h2 class="text-xl font-bold text-center">Payment Successful!</h2>
    <p class="text-center">
      Thank you for your purchase. Your cart has been cleared.
    </p>
    <button @click="$router.push('/')" class="btn">Go Back to Home</button>
  </div>
</template>

<script>
export default {
  name: "SuccessPage",
  mounted() {
    // Clear the cart from localStorage when payment is successful
    localStorage.removeItem("cart");
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}
.btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
