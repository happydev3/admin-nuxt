<template>
  <div class="en-dashCategories">
    <v-btn color="primary" @click="$router.push('/en/dashboard/branches/create')">Create</v-btn>

    <div class="en-dashCategories-content">

      <table class="en-dashCategories-content-table">
        <tr class="en-dashCategories-content-table-tr">
          <th class="en-dashCategories-content-table-th">
             Name
          </th>
          <th class="en-dashCategories-content-table-th">
             Phone
          </th>
          <th class="en-dashCategories-content-table-th">
             Email
          </th>
          <th class="en-dashCategories-content-table-th">
             Image
          </th>
          <th class="en-dashCategories-content-table-th">
            Options
          </th>
        </tr>

        <tr v-for="(branch, index) in items" :key="branch._id" class="en-dashCategories-content-table-tr">
          <td>{{ branch.name }}</td>
          <td>{{ branch.phone }}</td>
          <td>{{ branch.email }}</td>
          <td><img :src="branch.image" width="50"></td>
          <td>
            <div class="en-dashCategories-content-table-tr-options">
              <i class="fas fa-times" @click="deleteBranch(branch, index)"/>
              <i class="fas fa-edit en-dashCategories-content-table-tr-options-edit" @click="editBranch(branch)"/>
            </div>
          </td>
        </tr>
      </table>
      <v-dialog v-model="editDialog" width="600">
        <editForm :branch="activeBranch"/>
      </v-dialog>
    </div>
  </div>
</template>

<script>
  import editForm from "../Forms/editBranchForm.vue"

  export default {
    name: "Merchants",
    components: {
      editForm,
    },
    props: {
      items: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        editDialog: false,
        activeBranch: {},
      }
    },
    mounted() {
      console.log(this.items)
    },
    methods: {
      deleteBranch(branch, index) {
        if (confirm('DO you realy want to delete this?')) {
          const config = {
            headers: {
              authorization: localStorage.getItem("token"),
            }
          }
          console.log("clicked", branch)
          this.$axios.delete("/merchants/branch/" + branch._id, config).then((data) => {
            this.$emit("deleted")
            this.items.splice(index, 1)
          })
        }
      },
      editBranch(branch) {
          this.activeBranch = branch
          this.editDialog = true
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
