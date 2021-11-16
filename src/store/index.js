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
import { CART, PRODUCTS, PRODUCTS_IN_CART } from "../constants/store_state";
import { LOAD_DATA } from "../constants/store_actions";
import { TOTAL_SUM } from "../constants/store_getters";
import { randomCost, imagesProduct } from "../helpers";

const PATH_DATA = "https://random-data-api.com/api/food/random_food?size=30";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    [PRODUCTS]: [],
    [CART]: {},
  },
  mutations: {
    [UPDATE_PRODUCTS](state, products) {
      state[PRODUCTS] = products;
    },
    [UPDATE_PRODUCT_COUNTER](state, payLoad) {
      const { id, increment } = payLoad;
      state[CART] = {
        ...state[CART],
        [id]: state[CART][id] ? state[CART][id] + increment : 1,
      };
    },
    [ADD_COST_ON_PRODUCT](state, num) {
      state[PRODUCTS] = state[PRODUCTS].map((prod) => ({ ...prod, cost: num() }));
    },
    [ADD_IMAGE_ON_PRODUCT](state, img) {
      state[PRODUCTS] = state[PRODUCTS].map((prod, idx) => ({
        ...prod,
        image: img(idx),
      }));
    },
    [DELETE_PRODUCT_FROM_CART](state, id) {
      delete state[CART][id];
      state[CART] = { ...state[CART] };
    },
    [IS_FAVORITE_PRODUCT](state, id) {
      state[PRODUCTS] = state[PRODUCTS].map((prod) =>
        prod.id !== id ? prod : { ...prod, favorite: !prod.favorite }
      );
    },
  },
  actions: {
    [LOAD_DATA]({ commit }) {
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
    [PRODUCTS_IN_CART](state) {
      return Object.keys(state[CART]).map((id) => {
        const product = state[PRODUCTS].find((prod) => prod.id === +id);
        return {
          ...product,
          counter: state[CART][id],
          totalCost: state[CART][id] * product.cost,
        };
      });
    },
    [TOTAL_SUM](state) {
      return Object.keys(state[CART]).reduce((acc, id) => {
        const product = state[PRODUCTS].find((prod) => prod.id === +id);
        return (acc += product.cost * state[CART][id]);
      }, 0);
    },
  },
  modules: {},
});
