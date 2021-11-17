<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <template v-for="link in links">
        <div v-if="!link.icon" :key="link.name">
          <router-link :to="link.path">
            <v-btn text>{{ link.name }}</v-btn></router-link
          >
          <v-divider class="mx-4" vertical></v-divider>
        </div>
        <div v-else :key="link.name" class="ml-auto">
          <router-link :to="link.path">
            <v-btn color="white" icon>
              <v-icon> mdi-cart-variant </v-icon>
            </v-btn>
          </router-link>
        </div>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { CART, SHOWCASE, FAVORITE } from "./constants/page_path";
import { mapActions } from "vuex";
export default {
  name: "App",
  created() {
    this.loadData();
  },
  methods: {
    ...mapActions({ loadData: "loadData" }),
  },
  computed: {
    links() {
      return [
        { path: SHOWCASE, name: "Витрина" },
        { path: CART, name: "Корзина" },
        { path: FAVORITE, name: "Избранное" },
        { path: CART, name: "КорзинаIcon", icon: "mdi-cart-variant" },
      ];
    },
  },
};
</script>
