<template>
  <div class="en-merchants">
    <div :class="mainSide" class="en-merchants-content">

      <deals  :items="deals" @updated="forceRerender" />
    </div>
  </div>
</template>
<script>
  import deals from "~/components/en/Dashboard/deals.vue"

  export default {
    components: {
      deals,
    },
    head() {
      return {
        titleTemplate: '%s - Deals',
      }
    },
    props: {
      mainSide: {
        type: String,
        default: null,
      },
    },
    data () {
      return {
        merchantsKey: 0,
        deals: [],
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
      this.$axios.get("/deals" , config).then((res) => {
        this.deals  = res.data.deals
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
