<template>
  <v-card class="mx-auto mb-10 d-flex flex-column align-stretch">
    <template class="image">
      <v-img :src="imagePath" height="200px"></v-img>
      <v-icon
        class="icon-favorite"
        x-large
        :color="favorite ? 'yellow' : 'white'"
        @click="toggleFavorite"
        >{{
          favorite ? "mdi-star-shooting" : "mdi-star-shooting-outline"
        }}</v-icon
      >
    </template>
    <v-card-title>{{ product.dish }}</v-card-title>
    <v-card-subtitle>{{ product.ingredient }}</v-card-subtitle>
    <v-card-subtitle>{{ product.cost }}.00$</v-card-subtitle>
    <v-container class="align-center justify-space-around" v-show="counter">
      <v-btn class="btn-decrease" @click="changeProductCounter(-1)" small
        >-</v-btn
      >
      <span class="px-2 mx-2">{{ counter }}</span>
      <v-btn class="btn-increase" @click="changeProductCounter(1)" small
        >+</v-btn
      >
    </v-container>
    <v-card-actions>
      <v-btn @click="changeProductCounter(1)">add to cart</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn color="orange lighten-2" text> Description </v-btn>
      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ product.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import {
  IS_FAVORITE_PRODUCT,
  UPDATE_PRODUCT_COUNTER,
} from "../../constants/store_mutations";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Card",
  data() {
    return {
      show: false,
    };
  },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState({
      cart: "cart",
    }),
    counter() {
      return this.cart[this.product.id];
    },
    imagePath() {
      return require(`../../assets/images/${
        this.product.image ? this.product.image : "6123150777.webp"
      }`);
    },
    favorite() {
      return !!this.product.favorite;
    },
  },
  methods: {
    ...mapMutations({
      isFavoriteProduct: IS_FAVORITE_PRODUCT,
      updateProductCounter: UPDATE_PRODUCT_COUNTER,
    }),
    changeProductCounter(increment) {
      this.updateProductCounter({ id: this.product.id, increment });
    },
    toggleFavorite() {
      this.isFavoriteProduct(this.product.id);
    },
  },
};
</script>

<style scoped>
.image {
  position: relative;
}
.icon-favorite {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
