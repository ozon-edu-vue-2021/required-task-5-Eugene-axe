<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link :to="SHOWCASE"><v-btn text> Витрина</v-btn></router-link>
      <v-divider class="mx-4" vertical></v-divider>
      <router-link :to="CART"><v-btn text>Корзина</v-btn></router-link>
      <v-divider class="mx-4" vertical></v-divider>
      <router-link :to="FAVORITE"><v-btn text>Избранное</v-btn></router-link>
      <v-divider class="mx-4" vertical></v-divider>
      <router-link :to="CART" class="ml-auto">
        <v-btn color="white" icon>
          <v-icon> mdi-cart-variant </v-icon>
        </v-btn></router-link
      >
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { CART, SHOWCASE, FAVORITE } from "./constants/page_path";
import { LOAD_DATA } from "./constants/store_actions";

export default {
  name: "App",
  data: () => ({
    CART,
    SHOWCASE,
    FAVORITE,
  }),
  created() {
    this.$store.dispatch(LOAD_DATA);
  },
};
</script>
