<template>
  <div class="en-dashCategories">
    <v-btn color="primary" @click="$router.push('/en/dashboard/deals/create')">Create</v-btn>

    <div class="en-dashCategories-content">

      <table class="en-dashCategories-content-table">
        <tr class="en-dashCategories-content-table-tr">
          <th class="en-dashCategories-content-table-th">
            Name
          </th>
          <th class="en-dashCategories-content-table-th">
            Deal Start Date
          </th>
          <th class="en-dashCategories-content-table-th">
            Deal End Date
          </th>
          <th class="en-dashCategories-content-table-th">
            Deal Type
          </th>
          <th class="en-dashCategories-content-table-th">
            Rate
          </th>
          <th class="en-dashCategories-content-table-th">
            Total Users Rated
          </th>
          <th class="en-dashCategories-content-table-th">
            Image
          </th>
          <th class="en-dashCategories-content-table-th">
            Merchant
          </th>
          <th class="en-dashCategories-content-table-th">
            Voucher
          </th>
          <th class="en-dashCategories-content-table-th">
            Prices
          </th>
          <th class="en-dashCategories-content-table-th">
            Options
          </th>
        </tr>

        <tr v-for="(deal, index) in items" :key="deal._id" class="en-dashCategories-content-table-tr">
          <td>{{ deal.name }}</td>
          <td>{{ deal.dealStartDate }}</td>
          <td>{{ deal.dealEndDate }}</td>
          <td>{{ deal.dealType }}</td>
          <td>{{ deal.rate }}</td>
          <td>{{ deal.totalUsersRated }}</td>
          <td><img :src="deal.images[0] ? deal.images[0] : ''" width="50"></td>
          <td>
            <v-btn color="info" @click="showMerchant(deal)">open</v-btn>
          </td>
          <td>
            <v-btn color="info" @click="showVoucher(deal)">open</v-btn>
          </td>
          <td>
            <v-btn color="info" @click="showPrices(deal)">open</v-btn>
          </td>
          <td>
            <div class="en-dashCategories-content-table-tr-options">
              <i class="fas fa-times" @click="deleteDeal(deal, index)"/>
              <i class="fas fa-edit en-dashCategories-content-table-tr-options-edit" @click="$router.push('/en/dashboard/deals/'+deal._id)"/>
            </div>
          </td>
        </tr>
      </table>
      <v-dialog v-model="editDialog">
        <editForm :cat="activeMerchant"/>
      </v-dialog>
      <v-dialog v-model="merchantDialog" width="600px">
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
                    Email
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Image
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Address
                  </th>
                </tr>
                <tr v-if="merchant">
                  <td>{{ merchant.name }}</td>
                  <td>{{ merchant.phone }}</td>
                  <td>{{ merchant.email }}</td>
                  <td><img :src="merchant.image ? merchant.image : ''" width="50"></td>
                  <td>{{ merchant.address }}</td>
                </tr>
              </table>
            </div>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog v-model="pricesDialog" width="600px">
        <v-card>
          <div class="en-dashCategories">
            <div class="en-dashCategories-content">
              <table class="en-dashCategories-content-table">
                <tr class="en-dashCategories-content-table-tr">
                  <th class="en-dashCategories-content-table-th">
                    Original Price
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Final Price
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    description
                  </th>
                </tr>
                <tr v-for="(price, index) in prices" :key="branch.branchId"
                    class="en-dashCategories-content-table-tr">
                  <td>{{ price.originalPrice }}</td>
                  <td>{{ price.finalPrice }}</td>
                  <td>{{ price.description }}</td>
                </tr>
              </table>
            </div>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog v-model="voucherDialog" width="800px">
        <v-card>
          <div class="en-dashCategories">
            <div class="en-dashCategories-content">
              <table class="en-dashCategories-content-table">
                <tr class="en-dashCategories-content-table-tr">
                  <th class="en-dashCategories-content-table-th">
                    Valid For
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Valid On
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Valid Until
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Allowed Quantity
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Maximum Quantity Allowed
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Minimum Quantity Allowed
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Minimum Age
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    Minimum Quantity Allowed
                  </th>
                  <th class="en-dashCategories-content-table-th">
                    User Allowed Up to
                  </th>
                </tr>
                <tr class="en-dashCategories-content-table-tr" v-if="voucher">
                  <td>{{ voucher.validFor }}</td>
                  <td>{{ voucher.validOn }}</td>
                  <td>{{ voucher.validUntil }}</td>
                  <td>{{ voucher.allowedQuantity }}</td>
                  <td>{{ voucher.maximumQuantityAllowed }}</td>
                  <td>{{ voucher.minimumQuantityAllowed }}</td>
                  <td>{{ voucher.minimumAge }}</td>
                  <td>{{ voucher.minimumQuantityAllowed }}</td>
                  <td>{{ voucher.userAllowedUpto }}</td>
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
    name: "deals",
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
        merchantDialog: false,
        voucherDialog: false,
        pricesDialog: false,
        merchant: {},
        branch: {},
        voucher: {},
        prices: {},
        activeMerchant: {},
      }
    },
    mounted() {
      console.log(this.items)
    },
    methods: {
      deleteDeal(deal, index) {
        if (confirm('DO you realy want to delete this?')) {
          const config = {
            headers: {
              authorization: localStorage.getItem("token"),
            }
          }
          console.log("clicked", deal)
          this.$axios.delete("/deals/" + deal._id, config).then((data) => {
            this.$emit("deleted")
            this.items.splice(index, 1)
          })
        }
      },
      showPrices(deal) {
        this.prices = deal.prices;
        this.pricesDialog = true;
      },
      showVoucher(deal) {
        this.voucher = deal.voucher;
        this.voucherDialog = true;
      },
      showMerchant(deal) {
        this.merchant = deal.merchant;
        this.merchantDialog = true;
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
