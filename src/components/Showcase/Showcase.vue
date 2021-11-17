<template>
  <v-container>
    <div class="text-h4 text-center mx-auto">{{ title }}</div>
    <v-container class="d-flex flex-wrap">
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="4">
          <Card :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Card from "../Card/Card.vue";
import { mapState } from "vuex";
export default {
  name: "Showcase",
  components: {
    Card,
  },
  props: {
    title: {
      type: String,
      default: "Заголовок",
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...mapState({ products: "products" }),
  },
};
</script>
