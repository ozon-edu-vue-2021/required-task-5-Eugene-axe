<template>
  <v-overlay :value="overlay">
    <v-card min-width="400px" class="pa-10 d-flex flex-column">
      <h1>Ваш заказ</h1>
      <v-list>
        <v-list-item v-for="product in products" :key="product.id">
          <span class="flex-grow-1">{{ product.dish }}</span>
          <span class="">{{ product.counter }}</span>
        </v-list-item>
      </v-list>
      <v-btn
        color="orange lighten-2"
        class="mx-auto align-self-center"
        @click="hideOverlay"
      >
        понятно
      </v-btn>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  props: {
    overlay: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    hideOverlay() {
      this.$emit("hideOverlay", false);
    },
  },
};
</script>
