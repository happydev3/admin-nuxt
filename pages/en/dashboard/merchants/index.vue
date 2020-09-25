<template>
  <div class="en-merchants">
    <div :class="mainSide" class="en-merchants-content">
      <merchants  :items="merchants" @updated="forceRerender" />
    </div>
  </div>
</template>
<script>
import merchants from "~/components/en/Dashboard/merchants.vue"

export default {
  components: {
    merchants,
  },
  props: {
    mainSide: {
      type: String,
      default: null,
    },
  },
  head() {
    return {
      titleTemplate: '%s - Merchants',
    }
  },
  data () {
    return {
      merchantsKey: 0,
      merchants: [],
      flatMerchants: [],
    }
  },
  layout: "adminlayout",
  mounted() {
    let config = {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": `application/json`,
      },
    }
    this.$axios.get("/merchants" , config).then((res) => {
      this.merchants  = res.data.merchants
    })
  },
  methods: {
    forceRerender () {
      this.merchantsKey += 1
    },
  }
}
</script>

<style lang="scss" scoped>
.en-merchants {
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  &-content {
    margin-top: 5%;
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: center;
  }
}
</style>
