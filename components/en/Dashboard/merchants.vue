<template>
  <div class="en-dashCategories">
    <v-btn color="primary" @click="$router.push('/en/dashboard/merchants/create')">Create</v-btn>

    <div class="en-dashCategories-content">

      <table class="en-dashCategories-content-table">
        <tr class="en-dashCategories-content-table-tr">
          <th class="en-dashCategories-content-table-th">
            Merch Name
          </th>
          <th class="en-dashCategories-content-table-th">
            Merch Phone
          </th>
          <th class="en-dashCategories-content-table-th">
            Merch Email
          </th>
          <th class="en-dashCategories-content-table-th">
            Merch Image
          </th>
          <th class="en-dashCategories-content-table-th">
            Account Type
          </th>
          <th class="en-dashCategories-content-table-th">
            Contact Person
          </th>
          <th class="en-dashCategories-content-table-th">
            Branches
          </th>
          <th class="en-dashCategories-content-table-th">
            Options
          </th>
        </tr>

        <tr v-for="(merchant, index) in items" :key="merchant._id" class="en-dashCategories-content-table-tr">
          <td>{{ merchant.name }}</td>
          <td>{{ merchant.phone }}</td>
          <td>{{ merchant.email }}</td>
          <td><img :src="merchant.image" width="50"></td>
          <td>{{ merchant.accountType }}</td>
          <td>
            <v-btn color="info" @click="showContactPerson(merchant)">open</v-btn>
          </td>
          <td>
            <v-btn color="red" @click="showBranches(merchant)" v-if="merchant.branches.length > 0">open</v-btn>
          </td>
          <td>
            <div class="en-dashCategories-content-table-tr-options">
              <i class="fas fa-times" @click="deleteMerch(merchant, index)"/>
              <i class="fas fa-edit en-dashCategories-content-table-tr-options-edit" @click="$router.push('/en/dashboard/merchants/'+merchant._id)"/>
            </div>
          </td>
        </tr>
      </table>
      <v-dialog v-model="editDialog">
        <editForm :cat="activeMerchant"/>
      </v-dialog>
      <v-dialog v-model="contactPersonDialog" width="600px">
        <v-card>
          <div class="en-dashCategories">
            <div class="en-dashCategories-content">
              <table class="en-dashCategories-content-table">
                <tr class="en-dashCategories-content-table-tr">
                  <th class="en-dashCategories-content-table-th">
                    Name
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Job Title
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Phone
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Email
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    PayOutBy
                  </th>
                </tr>
                <tr>
                  <td>{{ contactPerson.name }}</td>
                  <td>{{ contactPerson.jobTitle }}</td>
                  <td>{{ contactPerson.phone }}</td>
                  <td>{{ contactPerson.email }}</td>
                  <td>{{ contactPerson.payOutBy }}</td>
                </tr>
              </table>
            </div>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog v-model="branchesDialog" width="600px">
        <v-card>
          <div class="en-dashCategories">
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
                    Address
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Email
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Image
                  </th>
                </tr>
                <tr v-for="(branch, index) in branches" :key="branch.branchId"
                    class="en-dashCategories-content-table-tr">
                  <td>{{ branch.name }}</td>
                  <td>{{ branch.phone }}</td>
                  <td>{{ branch.address }}</td>
                  <td>{{ branch.email }}</td>
                  <td><img :src="branch.image" width="50"></td>
                </tr>
              </table>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
  import editForm from "../Forms/editCategoryForm"

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
        branchesDialog: false,
        contactPerson: {},
        branches: {},
        contactPersonDialog: false,
        activeMerchant: {},
      }
    },
    mounted() {
      console.log(this.items)
    },
    methods: {
      deleteMerch(merchant, index) {
        if (confirm('DO you realy want to delete this?')) {
          const config = {
            headers: {
              authorization: localStorage.getItem("token"),
            }
          }
          console.log("clicked", merchant)
          this.$axios.delete("/merchants/" + merchant._id, config).then((data) => {
            this.$emit("deleted")
            this.items.splice(index, 1)
          })
        }
      },
      showContactPerson(merchant) {
        this.contactPerson = merchant.contactPerson;
        this.contactPersonDialog = true;
      },
      showBranches(merchant) {
        this.branches = merchant.branches;
        this.branchesDialog = true;
      },
      editMerch(merchant) {
        this.editDialog = true
        this.activeMerchant = merchant
        console.log("cactive", this.activeMerchant)
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
