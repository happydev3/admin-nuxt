<template>
  <div class="en-categories">
    <div class="en-categories-content">
      <div class="en-categories-content-form">
        <div class="en-categories-content-form-label">
          <h3 class="en-categories-content-form-label-title">
            Create Category
          </h3>
        </div>
        <caregoryForm :select-items="categories" @updated="forceRerender" />
      </div>
      <div class="en-categories-content-table">
        <categories-list
          v-if="flatCategories.length"
          :key="categoriesKey"
          :items="categories"
          :treeview-items="categories"
        />
      </div>
    </div>
  </div>
</template>

<script>
import caregoryForm from "~/components/en/Forms/categoryForm.vue"
import categories from "~/components/en/Dashboard/categories.vue"

export default {
  layout: "adminlayout",

  components: {
    caregoryForm,
    categoriesList: categories,
  },

  data () {
    return {
      categoriesKey: 0,
      categories: [],
      flatCategories: [],
    }
  },

  mounted () {
    this.$axios.get("/categories/front").then((res) => {
      const { data, } = res.data
      this.categories = data
      this.flattenCategoriesRecursively(data)
    })
  },

  methods: {
    forceRerender () {
      this.categoriesKey += 1
    },

    flattenCategoriesRecursively (items) {
      items.forEach((cat) => {
        this.flatCategories.push(cat)
        if (cat.root.length) { this.flattenCategoriesRecursively(cat.root) } else {}
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.en-categories {
  margin-top: 7%;
  display: flex;
  flex-flow: row;
  margin-bottom: 30px;
  &-content {
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    width: 100%;
    padding: 30px;
    &-form {
      width: 25%;
      &-label {
        &-title {
          color: #dc1f29;
        }
      }
      &-form {
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
      }
    }
    &-table {
      width: 70%;
    }
  }
}
@media (max-width: 768px) {
  .en-mainboxes {
    margin-top: 5%;
  }
  .en-categories {
    justify-content: center;
    &-content {
      flex-flow: column;
      &-table {
        display: none;
      }
      &-form {
        width: 100%;
        &-form {
          justify-content: center;
        }
      }
    }
  }
}
@media (max-width: 1600px) {
  .en-categories {
    margin-top: 7%;
    display: flex;
    flex-flow: row;
    margin-bottom: 30px;
    &-content {
      display: flex;
      flex-flow: column-reverse;
      justify-content: space-around;
      width: 100%;
      padding: 30px;
      &-form {
        width: 100%;
        margin-top: 30px;
        text-align: center;
        &-label {
          &-title {
            color: #dc1f29;
          }
        }
        &-form {
          display: flex;
          flex-flow: row;
          justify-content: center;
        }
      }
      &-table {
        width: 100%;
      }
    }
  }
}
</style>
