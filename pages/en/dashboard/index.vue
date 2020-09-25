<template>
  <div class="en-dashboard" />
</template>

<script>
// import dropWhenClick from "~/components/en/General/dropWhenClick.vue"
// import dashnav from "~/components/en/Navigation/dashnav.vue"
// import mainboxes from "~/components/en/Dashboard/mainboxes.vue"
// import homepage from "~/components/en/Dashboard/homepage.vue"

export default {
  layout: "adminlayout",
  middleware: ["check-auth", "auth"],
  head() {
    return {
      titleTemplate: '%s - Home',
    }
  },
  components: {
    // dropWhenClick,
    // dashnav,
    // mainboxes,
    // homepage,
  },
}
</script>

<style lang="scss" scoped>
.en-dashboard {
  height: 100vh;
  &-margined {
    margin-right: 100px;
    margin-left: 100px;
    // background-color: rgba(255, 0, 0, 0.226);
    height: 100vh;
  }
}

@media (max-width: 992px) {
  .en-dashboard {
    height: 100vh;
    &-margined {
      margin-right: 0px;
      margin-left: 0px;
    }
  }
}
</style>
