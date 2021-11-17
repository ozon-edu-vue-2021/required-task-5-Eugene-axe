import Vue from "vue";
import Vuex from "vuex";
import {
  UPDATE_PRODUCTS,
  UPDATE_PRODUCT_COUNTER,
  ADD_COST_ON_PRODUCT,
  DELETE_PRODUCT_FROM_CART,
  ADD_IMAGE_ON_PRODUCT,
  IS_FAVORITE_PRODUCT,
} from "../constants/store_mutations";
import { randomCost, imagesProduct } from "../helpers";

const PATH_DATA = "https://random-data-api.com/api/food/random_food?size=30";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: {},
  },
  mutations: {
    [UPDATE_PRODUCTS](state, products) {
      state.products = products;
    },
    [UPDATE_PRODUCT_COUNTER](state, payLoad) {
      const { id, increment } = payLoad;
      state.cart = {
        ...state.cart,
        [id]: state.cart[id] ? state.cart[id] + increment : 1,
      };
    },
    [ADD_COST_ON_PRODUCT](state, num) {
      state.products = state.products.map((prod) => ({ ...prod, cost: num() }));
    },
    [ADD_IMAGE_ON_PRODUCT](state, img) {
      state.products = state.products.map((prod, idx) => ({
        ...prod,
        image: img(idx),
      }));
    },
    [DELETE_PRODUCT_FROM_CART](state, id) {
      delete state.cart[id];
      state.cart = { ...state.cart };
    },
    [IS_FAVORITE_PRODUCT](state, id) {
      state.products = state.products.map((prod) =>
        prod.id !== id ? prod : { ...prod, favorite: !prod.favorite }
      );
    },
  },
  actions: {
    loadData({ commit }) {
      const data = fetch(PATH_DATA);
      data
        .then((response) => response.json())
        .then((loadData) => {
          commit(UPDATE_PRODUCTS, loadData);
        })
        .then(() => {
          commit(ADD_COST_ON_PRODUCT, randomCost);
        })
        .then(() => {
          commit(ADD_IMAGE_ON_PRODUCT, imagesProduct);
        });
    },
  },
  getters: {
    productsInCart(state) {
      return Object.keys(state.cart).map((id) => {
        const product = state.products.find((prod) => prod.id === +id);
        return {
          ...product,
          counter: state.cart[id],
          totalCost: state.cart[id] * product.cost,
        };
      });
    },
    totalSum(state) {
      return Object.keys(state.cart).reduce((acc, id) => {
        const product = state.products.find((prod) => prod.id === +id);
        return (acc += product.cost * state.cart[id]);
      }, 0);
    },
    favoriteProducts(state) {
      return state.products.filter((prod) => prod.favorite);
    },
  },
  modules: {},
});
