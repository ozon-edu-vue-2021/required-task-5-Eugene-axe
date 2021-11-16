<script>
import Showcase from "@/components/Showcase/Showcase";
import { mapState } from "vuex";
import { PRODUCTS } from "../../constants/store_state";

export default {
  name: "Favorite",
  extends: Showcase,
  computed: {
    ...mapState({
      [PRODUCTS]: (state) => state[PRODUCTS].filter((prod) => prod.favorite),
    }),
  },
};
</script>
