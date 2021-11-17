<template>
  <v-container>
    <div class="text-h4 text-center mx-auto">{{ title }}</div>
    <v-container class="d-flex">
      <div class="col-9">
        <v-alert
          v-if="!isProductInCart"
          color="blue"
          elevation="4"
          outlined
          type="info"
          >Корзина пуста
        </v-alert>

        <v-list v-else>
          <cart-item
            v-for="product in productsInCart"
            :key="product.id"
            :product="product"
          ></cart-item>
        </v-list>
      </div>
      <div class="col-3">
        <v-card class="pa-8">
          <v-btn color="primary" small @click="toggleOverlay"
            >Оформить заказ</v-btn
          >
          <div>Общая сумма заказа : {{ totalSum }}.00$</div>
        </v-card>
      </div>
    </v-container>
    <my-overlay
      :overlay="showOverlay"
      :products="productsInCart"
      @hideOverlay="toggleOverlay"
    ></my-overlay>
  </v-container>
</template>

<script>
import CartItem from "./CartItem/CartItem.vue";
import Overlay from "../Overlay/Overlay.vue";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Cart",
  components: {
    "cart-item": CartItem,
    "my-overlay": Overlay,
  },
  props: {
    title: {
      type: String,
      default: "Заголовок",
    },
  },
  data() {
    return {
      showOverlay: false,
    };
  },
  methods: {
    toggleOverlay() {
      this.showOverlay = !this.showOverlay;
    },
  },
  computed: {
    ...mapState({
      cart: "cart",
      products: "products",
    }),
    ...mapGetters({
      productsInCart: "productsInCart",
      totalSum: "totalSum",
    }),
    isProductInCart() {
      return !!this.productsInCart.length;
    },
  },
};
</script>
