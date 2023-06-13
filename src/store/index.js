import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  plugins: [
    (store) => {
      store.subscribe((mutation, state) => {
        localStorage.setItem("store", JSON.stringify(state));
      });
    },
  ],
});

const storedData = JSON.parse(localStorage.getItem("store"));
if (storedData) {
  store.replaceState(storedData);
}

export default store;
