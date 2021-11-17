<script>
import Showcase from "@/components/Showcase/Showcase";
import { mapGetters } from "vuex";

export default {
  name: "Favorite",
  extends: Showcase,
  computed: {
    ...mapGetters({
      products: "favoriteProducts",
    }),
  },
};
</script>
