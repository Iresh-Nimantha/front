<template>
  <div>
    <h1>Orders</h1>
    <div v-if="cartItems.length > 0">
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          <p>{{ item.name }}</p>
          <p>{{ item.selectedSize }}</p>
          <p>{{ item.selectedColor }}</p>
          <p>Quantity: {{ item.quantity }}</p>
          <p>Price: ${{ item.price }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No items in the cart.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ordered",
  data() {
    return {
      cartItems: [],
    };
  },
  created() {
    // Retrieve cart data from localStorage when the component is created
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    this.cartItems = storedCart;
  },
};
</script>
