import Vue from "vue";
import VueRouter from "vue-router";
import Showcase from "../components/Showcase/Showcase.vue";
import Cart from "../components/Cart/Cart.vue";
import Favorite from "../components/Favorite/Favorite.vue";
import { CART, FAVORITE, SHOWCASE } from "../constants/page_path";

Vue.use(VueRouter);

const routes = [
  {
    path: SHOWCASE,
    name: "showcase",
    component: Showcase,
    props: {
      title: "Витрина",
    },
  },
  {
    path: CART,
    name: "cart",
    component: Cart,
    props: {
      title: "Корзина",
    },
  },
  {
    path: FAVORITE,
    name: "favorite",
    component: Favorite,
    props: {
      title: "Избранное",
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
