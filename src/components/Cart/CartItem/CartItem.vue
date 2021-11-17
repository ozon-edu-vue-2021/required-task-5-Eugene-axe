<template>
  <v-card class="mx-auto mb-10 d-flex align-center" max-height="80px">
    <v-img :src="imagePath" max-width="80px" class="mr-5"></v-img>

    <div class="mr-auto flex-grow-1">
      <v-card-title>{{ product.dish }}</v-card-title>
      <v-card-subtitle>{{ product.ingredient }}</v-card-subtitle>
    </div>
    <div>
      <span class="px-2 mx-2 ml-auto">{{ product.totalCost }}.00$</span>
    </div>
    <div class="ml-auto align-center pr-2 justify-space-around">
      <v-btn
        class="btn-decrease"
        :disabled="product.counter === 0"
        @click="changeProductCounter(-1, product.id)"
        small
        >-</v-btn
      >
      <span class="px-2 mx-2">{{ product.counter }}</span>
      <v-btn
        class="btn-increase"
        @click="changeProductCounter(1, product.id)"
        small
        >+</v-btn
      >
    </div>
    <div class="delete-product px-2">
      <v-btn text icon @click="deleteProduct(product)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import {
  DELETE_PRODUCT_FROM_CART,
  UPDATE_PRODUCT_COUNTER,
} from "../../../constants/store_mutations";
import { mapMutations } from "vuex";
export default {
  name: "cart-item",
  props: {
    product: {
      type: Object,
      require,
    },
  },
  computed: {
    imagePath() {
      return require(`../../../assets/images/${
        this.product.image ? this.product.image : "6123150777.webp"
      }`);
    },
  },
  methods: {
    ...mapMutations({
      updateProductCounter: UPDATE_PRODUCT_COUNTER,
      deleteProductFromCart: DELETE_PRODUCT_FROM_CART,
    }),
    changeProductCounter(increment, id) {
      this.updateProductCounter({
        id,
        increment,
      });
    },
    deleteProduct(product) {
      this.deleteProductFromCart(product.id);
    },
  },
};
</script>
