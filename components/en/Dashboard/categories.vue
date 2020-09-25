<template>
  <div class="en-dashCategories">
    <div class="en-dashCategories-content">
      <table class="en-dashCategories-content-table">
        <tr class="en-dashCategories-content-table-tr">
          <th class="en-dashCategories-content-table-th">
            Category Icon
          </th>
          <th class="en-dashCategories-content-table-th">
            Category Name
          </th>
          <th class="en-dashCategories-content-table-th">
            Parent Category
          </th>
          <th class="en-dashCategories-content-table-th">
            Category Description
          </th>
          <th class="en-dashCategories-content-table-th">
            Category Tags
          </th>
          <th class="en-dashCategories-content-table-th">
            Options
          </th>
        </tr>

        <tr v-for="(category, index) in items" :key="category._id" class="en-dashCategories-content-table-tr">
          <td><img :src="category.icon" width="50"></td>
          <td>{{ category.name }}</td>
          <td>{{ category.parent ? category.parent.name : '' }}</td>
          <td>{{ category.description }}</td>
          <td>{{ category.tags.toString() }}</td>
          <td>
            <div class="en-dashCategories-content-table-tr-options">
              <i class="fas fa-times" @click="deleteCat(category, index)" />
              <i
                class="fas fa-edit en-dashCategories-content-table-tr-options-edit"
                @click="editCat(category)"
              />
            </div>
          </td>
        </tr>
      </table>
      <v-dialog v-model="editDialog">
        <editForm :cat="activeCat" :select-items="items"/>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import editForm from "../Forms/editCategoryForm"
export default {
  name: "Categories",
  components: {
    editForm,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    treeviewItems: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      editDialog: false,
      activeCat: {},
    }
  },
  methods: {
    deleteCat (cat, index) {
      if (confirm('Do you really want to delete this?')) {
        const config = {
          headers: {
            authorization: localStorage.getItem("token"),
          },
          data: {
            name: cat.name,
            description: cat.description,
            tags: cat.tags,
          },
        }
        console.log("clicked", cat)
        this.$axios.delete("/categories/" + cat._id, config).then((data) => {
          console.log(data)
          this.$emit("deleted")
          this.items.splice(index, 1)
        })
      }
    },
    editCat (cat) {
      this.editDialog = true
      this.activeCat = cat
      console.log("cactive", this.activeCat)
    },
  },
}
</script>

<style lang="scss" scoped>
.en-dashCategories {
  width: 100%;
  &-content {
    margin-top: 15px;
    width: 100%;
    height: 600px;
    overflow: scroll;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.281);
    padding: 20px;
    border-radius: 20px;
    &-table {
      width: 100%;
      text-align: center;
      &-th {
        color: #dc1f29;
      }
      &-tr {
        height: 50px;
        &-options {
          color: #dc1f29;
          cursor: pointer;
          &-edit {
            color: rgb(32, 182, 32);
            margin-left: 20px;
          }
        }
        &:hover {
          background-color: #e6e3e3;
        }
      }
    }
  }
}
</style>
