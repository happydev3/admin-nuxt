<template>
  <div class="en-merchants">
    <div :class="mainSide" class="en-merchants-content">

      <branches  :items="branches" @updated="forceRerender" />
    </div>
  </div>
</template>
<script>
  import branches from "~/components/en/Dashboard/branches.vue"

  export default {
    components: {
      branches,
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
        branches: [],
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
      this.$axios.get("/merchants/branches" ,  config).then((res) => {
        this.branches  = res.data.merchants
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
