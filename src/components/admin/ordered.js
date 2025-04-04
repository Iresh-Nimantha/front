// store.js
export default new Vuex.Store({
  state: {
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  },
  mutations: {
    setCartItems(state, items) {
      state.cartItems = items;
      localStorage.setItem("cart", JSON.stringify(items)); // Keep cart in sync with localStorage
    },
  },
  actions: {
    loadCartItems({ commit }) {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      commit("setCartItems", cartItems);
    },
  },
  getters: {
    cartItems: (state) => state.cartItems,
  },
});
