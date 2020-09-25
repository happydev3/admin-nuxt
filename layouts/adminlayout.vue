<template>
  <v-app>
    <dashnav/>
    <span style="margin: auto"> v{{ version }} </span>
    <div class="en-layout-margined">
      <nuxt/>
    </div>
  </v-app>
</template>

<script>
  import dashnav from "~/components/en/Navigation/dashnav.vue"

  export default {
    components: {
      dashnav,
    },
    head() {
      return {
        title: 'Yalla Dealz Inc, Dashboard Portal',
      }
    },
    computed: {
      version() {
        return require('../package.json').version
      }
    }
  }
</script>

<style lang="scss" scoped>
  .en-layout {
    &-margined {
      margin-right: 100px;
      margin-left: 100px;
      // background-color: rgba(255, 0, 0, 0.226);
      height: 100vh;
    }
  }

  @media (max-width: 992px) {
    .en-layout {
      &-margined {
        margin-right: 0px;
        margin-left: 0px;
      }
    }
  }
</style>
