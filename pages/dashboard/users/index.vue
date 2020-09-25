<template>
  <div class="en-categories-content-table">
    <categories :key="categoriesKey" />
  </div>
</template>
<script>
// import categories from "~/components/en/Dashboard/users.vue"
export default {
  data () {
    return {
      usersKey: 0,
    }
  },
  layout: "adminlayout",
}
</script>
