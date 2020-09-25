<template>
  <div class="en-deals">
    <div class="en-deals-content">
      <editDealForm :deal="deal"/>
    </div>
  </div>
</template>

<script>
  import editDealForm from "~/components/en/Forms/dealForm.vue"

  export default {
    layout: "adminlayout",
    head() {
      return {
        titleTemplate: '%s - Deals',
      }
    },
    components: {
      editDealForm,
    },
    data() {
      return {
        deal: {},
      }
    },
    mounted() {
      this.getDeal()
    },
    methods: {
      getDeal() {
        let config = {
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": `application/json`,
          },
        }
        this.$axios.get("/deals/"+this.$route.params.idEdit , config).then((res) => {
          this.deal  = res.data.deal
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .en-deals {
    display: flex;
    justify-content: center;

    &-content {
      margin-top: 10%;
      width: 90%;
    }
  }
</style>
