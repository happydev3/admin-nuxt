<template>
  <div class="en-dealForm">
    <v-card elevation="10" class="pa-5 mb-8">
      <v-form ref="form" v-model="valid">
        <div class="en-dealForm-part">
          <div class="en-dealForm-title">
            Deal Form:
            <hr>
          </div>
          <div v-if="success != ''" class="en-dealForm-msg">
            <notification notfi-color="greenNotfi">
              {{ success }}
            </notification>
          </div>
          <div v-if="error != ''" class="en-contactPerson-msg">
            <notification notfi-color="redNotfi">
              {{ error }}
            </notification>
          </div>

          <div class="en-dealForm-main">
            <div class="en-dealForm-main-left">
              <div class="en-dealForm-main-left-form">
                <v-checkbox
                  v-model="dealData.dealLive"
                  label="Live Deal"></v-checkbox>
                <v-select
                  v-model="dealData.merchant"
                  label="Merchant"
                  :rules="[(v) => !!v || 'Merchant is required']"
                  required
                  :items="merchants"
                  item-value="_id"
                  item-text="name"
                  @change="setMerchant"
                />

                <v-select
                  v-model="dealData.category"
                  label="Category"
                  :rules="[(v) => !!v || 'Category is required']"
                  required
                  :items="flatCategories"
                  item-value="_id"
                  item-text="name"
                  @change="setCategory"
                />

                <v-select
                  v-model="dealData.branches"
                  :multiple="true"
                  label="Branch"
                  required
                  :items="branchesToShow"
                  item-value="_id"
                  item-text="name"
                  @changed="setBranches"
                />

                <v-text-field
                  v-model="dealData.name"
                  :rules="[
                  (v) => !!v || 'Deal Name is required',
                ]"
                  label="Deal Name"
                  required
                  @input="setName"
                />

                <v-text-field
                  v-model="dealData.arName"
                  :rules="[
                  (v) => !!v || 'اسم العرض مطلوب',
                ]"
                  label="اسم العرض"
                  required
                  @input="setArname"
                />

                <div
                  v-if="!dealData.images.length"
                  class="en-merchantForm-main-left-form-row"
                >
                  <label for="image-upload" class="custom-file-upload">
                    <v-icon style="color: white;">mdi-upload</v-icon>
                    Image Upload
                  </label>
                  <input
                    id="image-upload"
                    ref="imageUpload"
                    multiple="multiple"
                    type="file"
                    @change="onFileChange"
                  >
                  <div v-if="!dealData.images.length">
                    <div class="optional-title">
                      Image is a must
                    </div>
                  </div>
                </div>

                <div v-if="dealData.images.length" class="en-merchantForm-main-left-form-row">
                  <div class="row" >
                    <div class="col" v-for="(image, index) in dealData.images" :key="index">
                      <div class="close" @click="removeSingleImage(index)">×</div>
                      <img :key="index" :src="image.base64" class="cover-img" alt="">
                    </div>
                  </div>

                  <buttonWithColors
                    class="btn-font upload-img my-3"
                    prevent-no-event
                    btn-color="RedBtn"
                    btn-label="Remove Cover"
                    @click="removeImage"
                  />
                </div>
                <v-textarea
                  v-model="dealData.finePrint"
                  solo
                  label="Fine Print"
                  :rules="[(v) => !!v || 'Fine Print is required']"
                  required
                />
                <v-textarea
                  v-model="dealData.arFinePrint"
                  solo
                  label="الشروط"
                  :rules="[(v) => !!v || 'Fine Print ar is required']"
                  required
                />
                <v-textarea
                  v-model="dealData.description"
                  solo
                  label="Description"
                  :rules="[(v) => !!v || 'description is required']"
                  required
                  @input="setDescription"
                />
                <v-textarea
                  v-model="dealData.arDescription"
                  solo
                  label="الوصف"
                  :rules="[(v) => !!v || 'Description ar is required']"
                  required
                  @input="setArDescription"
                />
                <v-textarea
                  v-model="dealData.highlightes"
                  solo
                  label="Highlights"
                  :rules="[(v) => !!v || 'Highlights is required']"
                  required
                  @input="setHighlight"
                />

                <v-textarea
                  v-model="dealData.arHighlightes"
                  solo
                  label="ابرز المعلومات"
                  :rules="[(v) => !!v || ' ابرز المعلومات مطلوبه']"
                  required
                  @input="setArhighlight"
                />

                <v-text-field
                  v-model="dealData.video"
                  label="Video Link"
                  @input="setVideo"
                />
                <v-row justify="space-around">
                <v-col cols="12">
                  <header>Type</header>
                </v-col>
                <v-checkbox
                  v-model="dealData.type"
                  v-for="(DT,index) in types"
                  :label="DT.name"
                  :key="'dt'+index"
                  :value="DT.val"
                />
                </v-row>

                <v-select
                  v-model="dealData.dealType"
                  label="Deal Type"
                  :items="dealTypes"
                  item-value="val"
                  item-text="name"
                  @change="setDealType"
                />


                <v-text-field
                  v-model="dealData.dealStartDate"
                  :rules="[(v) => !!v || 'Date is required']"
                  label="Start Date"
                  required
                  type="datetime-local"
                  @input="setDate"
                />

                <v-text-field
                  v-model="dealData.dealEndDate"
                  :rules="[(v) => !!v || 'Date is required']"
                  label="End Date"
                  required
                  type="datetime-local"
                  @input="setEndDate"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="en-dealForm-title">
          Price Info:
          <hr>
        </div>
        <div class="en-dealForm-part">
          <div class="en-dealForm-main">
            <div class="en-dealForm-main-left">
              <div class="en-dealForm-main-left-form">
                <div class="row">
                  <div class="col-lg-3">
                    <button type="button" class="btn btn-info" @click="add_price_form()">Add Price</button>
                  </div>
                </div>
                <div v-for="(tier, index) in dealData.prices" :key="index">
                  <div class="row">
                    <div class="col-lg-1">
                      <h4>({{ index+1 }})</h4>
                    </div>
                    <div class="col-lg-3">
                      <button type="button" class="btn btn-danger btn-sm" @click="delete_price_form(index)">Delete price</button>
                    </div>
                  </div>
                  <v-text-field v-model="tier.originalPrice" placeholder="Original Price" type="number" required :rules="[(v) => !!v || 'Original Price is required']"/>
                  <v-text-field v-model="tier.finalPrice" label="Final Price" type="number" :rules="[(v) => !!v || 'Final Price is required']" required/>
                  <v-text-field v-model="tier.pricesDate.dateDayFrom" label="From Date"  type="datetime-local" />
                  <v-text-field v-model="tier.pricesDate.dateDayTo" label="To Date"  type="datetime-local" />
                  <v-card class="mx-auto" outlined no-gutters v-for="(s,s_index) in tier.size" :key="'s'+s_index">
                    <v-card-text>
                      {{ tier.color[s_index]}}
                      <v-color-picker v-model="tier.color[s_index]" label="Color" elevation="15"></v-color-picker>
                      <br/>
                      <v-text-field v-model="tier.size[s_index]" label="Size"/>
                    </v-card-text>
                    <v-card-actions>
                      <v-col v-if="s_index == 0">
                        <button type="button" class="btn btn-info btn-sm" @click="tier.size.push(''); tier.color.push('');">Add size and color</button>
                      </v-col>
                      <v-col v-else>
                        <button type="button" class="btn btn-info btn-sm" @click="tier.size.splice(s_index,s_index);tier.color.splice(s_index,s_index);">remove</button>
                      </v-col>
                    </v-card-actions>

                  </v-card>
                  <br/>
                  <v-textarea v-model="tier.description" solo label="Description" :rules="[(v) => !!v || 'Description is required']" required />
                  <v-textarea v-model="tier.arDescription" solo label="الوصف" :rules="[(v) => !!v || 'الوصف مطلوب']" required/>
                  <v-text-field v-model="tier.percentage" label="Percentage" type="number" :rules="[(v) => !!v || 'Percentage is required']" required @input="setPercentage(index)"/>
                  <v-text-field v-model="tier.payoutNet" label="Payout Net" type="number" :rules="[(v) => !!v || 'Payout Net is required']" required @input="setPayoutNet"/>
                  <v-text-field v-model="tier.yallaDealzCommission" label="Yalla Dealz Commission" type="number"
                                :rules="[(v) => !!v || 'Yalla Dealz Commission is required']" required @input="setYDcommission"/>
                  <hr>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="en-dealForm-title">
          Voucher Info:
          <hr>
        </div>
        <div class="en-dealForm-part">
          <div class="en-dealForm-main">
            <div class="en-dealForm-main-left">
              <div class="en-dealForm-main-left-form">

                <v-text-field
                  v-model="dealData.voucher.validUntil"
                  label="Valid Untill"
                  type="datetime-local"
                  @input="setVvaliduntill"
                />

                <v-text-field
                  v-model="dealData.voucher.minimumQuantityAllowed"
                  label="Minimum Quantity Allowed"
                  type="number"
                  @input="setVmqa"
                />

                <v-text-field
                  v-model="dealData.voucher.maximumQuantityAllowed"
                  label="Maximum Quantity Allowed"
                  type="number"
                  @input="setVmxqa"
                />

                <v-text-field
                  v-model="dealData.voucher.userAllowedFrom"
                  label="User Allowed From"
                  type="number"
                  @input="setVuserallowedfrom"
                />

                <v-text-field
                  v-model="dealData.voucher.userAllowedUpto"
                  label="User Allowed Upto"
                  type="number"
                  @input="setVuserallowedfupto"
                />

<!--                <v-text-field-->
<!--                  v-model="dealData.voucher.allowedQuantity"-->
<!--                  label="User Allowed Quantity"-->
<!--                  type="number"-->
<!--                  :rules="[(v) => !!v || 'User Allowed Quantity is required']"-->
<!--                  required-->
<!--                  @input="setVallowedquanitity"-->
<!--                />-->

              </div>
            </div>
          </div>
        </div>

        <div class="en-dealForm-title">
          Voucher Validation:
          <hr>
        </div>
        <div class="en-dealForm-part">
          <div class="en-dealForm-main">
            <div class="en-dealForm-main-left">
              <div class="en-dealForm-main-left-form">
                <v-row justify="space-around">
                  <v-col cols="12">
                    <header>Valid For</header>
                  </v-col>
                  <v-checkbox
                    v-model="dealData.voucher.validFor"
                    v-for="(VF,index) in validFor"
                    :label="VF.name"
                    :key="'VF'+index"
                    :value="VF.val"
                  />
                </v-row>

                <v-text-field
                  v-model="dealData.voucher.minimumAge"
                  label="Minimum Age"
                  :rules="[(v) => !!v || 'Minimum Age is required']"
                  required
                  type="number"
                  @input="setMinimumage"
                />

                <v-row justify="space-around">
                  <v-col cols="12">
                    <header>Valid On</header>
                  </v-col>
                  <v-checkbox
                    v-model="dealData.voucher.validOn"
                    v-for="(VO,index) in vValid"
                    :label="VO.name"
                    :key="'VO'+index"
                    :value="VO.value"
                  />
                </v-row>



              </div>
            </div>
          </div>
        </div>

        <div class="en-dealForm-part">
          <hr>
          <div class="en-dealForm-main">
            <div class="en-dealForm-main-left">
              <div class="en-dealForm-main-left-form">
                <v-select
                  v-model="dealData.priorBooking.status"
                  label="Prior Booking Status"
                  :items="Prior"
                  item-text="name"
                  item-value="val"
                  @change="setPrior"
                />

                <v-text-field
                  v-model="dealData.priorBooking.contactNumber"
                  label="Contact Number"
                  type="number"
                  @input="setContactnumber"
                />

                <v-text-field
                  v-model="dealData.priorBooking.email"
                  label="Email"
                  @input="setEmail"
                />

                <v-select
                  v-model="dealData.priorBooking.delivery"
                  label="Delivery"
                  :items="Delivery"
                  item-text="name"
                  item-value="val"
                />
                <v-text-field
                  v-model="dealData.priorBooking.deliveryArea"
                  label="Delivery Area"
                  @input="setDeliveryarea"
                />

                <v-col cols="12">
                  <header>Cash on delivery</header>
                </v-col>
                <v-radio-group  v-model="dealData.paymentMethod" :mandatory="true">
                  <v-radio label="Yes" value="Cash"></v-radio>
                  <v-radio label="No" value="null"></v-radio>
                </v-radio-group>


                <div v-if="success != ''" class="en-dealForm-msg">
                  <notification notfi-color="greenNotfi">
                    {{ success }}
                  </notification>
                </div>
                <div v-if="error != ''" class="en-contactPerson-msg">
                  <notification notfi-color="redNotfi">
                    {{ error }}
                  </notification>
                </div>

                <div v-if="loading" class="spinner"/>

                <div v-if="!loading" class="en-dealForm-main-left-form-row">
                  <buttonWithColors
                    :preventClick="true"
                    class="btn-font"
                    btn-color="RedBtn"
                    btn-label="Confirm Deal"
                    @click="confirmDeal"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
  import GoogleMapsNative from "~/components/en/General/GoogleMapsNative.vue"
  import {required, integer, email} from "vuelidate/lib/validators"
  import inputWithIcon2 from "~/components/en/General/inputWithIcon2.vue"
  import arinputWithIcon2 from "~/components/ar/General/arinputWithIcon2.vue"
  import selectInput from "~/components/en/General/selectInput.vue"
  import buttonWithColors from "~/components/en/General/buttonWithColors.vue"
  import notification from "~/components/en/General/notification.vue"
  import axios from 'axios'
  import { Deal } from '@/models/Deal'
  import { DealPrice } from '@/models/DealPrice'
  import { DealValidations } from '@/validations/Deal'
  import { ImageUploadService } from '@/services/image-upload.service'
  import { Component, Vue, Mixins } from 'vue-property-decorator'
  import { validationMixin } from "vuelidate/src"
  import { generateId } from '../../../utils'
  @Component
  export class DealFormValidation extends Mixins(validationMixin) {

  }

  @Component({
    components: {
      GoogleMapsNative,
      inputWithIcon2,
      selectInput,
      buttonWithColors,
      notification,
      arinputWithIcon2,
    },
    data () {
      return {
        validations: DealValidations,
        isEdit: false,
        editImages: [],
        isImageRemoved: true
      }
    },
    mixins: [ DealFormValidation ]
  })
  export default class DealForm extends Vue {
    validations = DealValidations
    isEdit= false
    editImages= []
    isImageRemoved= true
    $v
    constructor() {
      super()
      this.$options.validations = DealValidations
    }

    created() {
      this.$v = this['_vuelidate'] ? this['_vuelidate'].refs.$v.proxy : { }
    }
        valid = false
        categories = []
        merchants = []
        branchesToShow = []
        success = ""
        error = ""
        loading = false
        flatCategories = []
        dealData = new Deal()//Object.assign(new Deal(), (require(`${__dirname}/mocked-data.json`)))
        file = ""
        types = [
          {
            name: "Buy one get one free",
            val: "buy_one_get_one_free",
          },
          {
            name: "Free shipping",
            val: "free_shipping",
          },
          {
            name: "Free coupon",
            val: "free_coupon",
          },
        ]
        dealTypes = [
          {
            name: "Premium",
            val: "Premium",
          },
          {
            name: "Free",
            val: "Free",
          },
        ]
        dealKinds = [
          {
            name: "Normal",
            val: 0,
          },
          {
            name: "Live",
            val: 1,
          },
        ]
        vValid = [
          {
            name: "Public Holidays",
            value: "Public_Holidays",
          },
          {
            name: "Weekends",
            value: "Weekends",
          },
        ]
        validFor = [
          {
            name: "Men",
            val: "Men",
          },
          {
            name: "Women",
            val: "Women",
          },
          {
            name: "Teens",
            val: "Teens",
          },
          {
            name: "Kids",
            val: "Kids",
          },
        ]
        Prior = [
          {
            name: "Yes",
            val: true,
          },
          {
            name: "No",
            val: false,
          },
        ]
        PriorAr = [
          {
            name: "نعم",
            val: "نعم",
          },
          {
            name: "لا",
            val: "لا",
          },
        ]
        Dine = [
          {
            name: "Dine In",
            val: false,
          },
          {
            name: "Delivery",
            val: true,
          },
        ]
        Delivery = [
          {
            name: "Yes",
            val: true,
          },
          {
            name: "No",
            val: false,
          },
        ]
        DeliveryAr = [
          {
            name: "نعم",
            val: "نعم",
          },
          {
            name: "لا",
            val: "لا",
          },
        ]
        Pay = [
          {
            name: "Visa",
            val: "Visa",
          },
          {
            name: "Cash On Delivery",
            val: "Cash",
          },
          {
            name: "Wallet",
            val: "Wallet",
          },
          {
            name: "Fawry",
            val: "Fawry",
          },
          {
            name: "Points",
            val: "Points",
          },
        ]
        $refs!: {
          form: any
          imageUpload: any
        }

    mounted() {
      let config = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
      if (this.$route.params.idEdit != undefined) {
        this.isEdit = true;
        this.isImageRemoved = false;
        this.$axios.get("/deals/" + this.$route.params.idEdit, config)
          .then(async (data) => {
            console.log(data);
            this.dealData = data.data.deal;
            this.dealData.merchant = this.dealData.merchant["_id"];
            let end_date, start_date = ""
            if (this.dealData.dealStartDate) {
              start_date = this.dealData.dealStartDate.split(":")[0] + ':' + this.dealData.dealStartDate.split(":")[1];
            }
            if (this.dealData.dealEndDate) {
              end_date = this.dealData.dealEndDate.split(":")[0] + ':' + this.dealData.dealEndDate.split(":")[1];
            }
            this.dealData.dealStartDate = start_date;
            this.dealData.dealEndDate = end_date;
            for (let x = 0; x < this.dealData.prices.length; x++) {
              let from_date, to_date = "";
              if (this.dealData.prices[x].pricesDate.dateDayFrom) {
                from_date = this.dealData.prices[x].pricesDate.dateDayFrom.split(":")[0] + ':' + this.dealData.prices[x].pricesDate.dateDayFrom.split(":")[1];
              }
              if (this.dealData.prices[x].pricesDate.dateDayTo) {
                to_date = this.dealData.prices[x].pricesDate.dateDayTo.split(":")[0] + ':' + this.dealData.prices[x].pricesDate.dateDayTo.split(":")[1];
              }
              this.dealData.prices[x] = {
                originalPrice: this.dealData.prices[x].originalPrice,
                finalPrice: this.dealData.prices[x].finalPrice,
                color: this.dealData.prices[x].color,
                size: this.dealData.prices[x].size,
                description: this.dealData.prices[x].description,
                arDescription: this.dealData.prices[x].arDescription,
                percentage: this.dealData.prices[x].percentage,
                payoutNet: this.dealData.prices[x].payoutNet,
                yallaDealzCommission: this.dealData.prices[x].yallaDealzCommission,
                pricesDate: {
                  dateDayFrom: from_date,
                  dateDayTo: to_date,
                }
              };
            }

            if (this.dealData.voucher.validUntil) {
              this.dealData.voucher.validUntil = this.dealData.voucher.validUntil.split(":")[0] + ':' + this.dealData.voucher.validUntil.split(":")[1];
            }
            let imgConfig = {
              responseType: 'blob' as "blob",
            }
            let images = [];
            this.editImages = []
            for (let x = 0; x < this.dealData.images.length; x++) {
              this.editImages.push(this.dealData.images[x]);
              let imageData = await this.$axios(this.dealData.images[x], imgConfig);
              console.log(imageData.data);
              images.push(new File([imageData.data], generateId(), { lastModified: Date.now() }));
            }
            this.dealData.images = [];
            for (let x = 0; x < images.length; x++) {
              await this.createImage(images[x])
            }

            console.log(this.dealData);
          });
      }
      this.$axios.get("/categories", config)
        .then((data) => {
          this.categories = data.data.data
          this.flattenCategoriesRecursively(this.categories)
        })
      this.$axios
        .get("/merchants", config)
        .then((data) => {
          console.log(data)
          this.merchants = data.data.merchants
        })
        .catch((error) => {
          console.log(error)
        })
    }
      add_price_form() {
        this.dealData.prices.push(new DealPrice());
      }
      delete_price_form(index) {
        this.$delete(this.dealData.prices, index)
      }
    async uploadImages() {

    }
      async confirmDeal() {
        this.loading = true
        if (!this.$refs.form.validate()) {
          this.loading = false
          return
        } else {
          /*
          this.dealData.images = (await Promise.all(
            await this.dealData.images.map(async ({ file }) => await ImageUploadService.uploadImage(file))
          )).filter(elm => !!elm)
          */
          if (this.isImageRemoved) {
            let dataImages = [];
            await this.dealData.images.map(({ file }) => { dataImages.push(file); });
            this.dealData.images = [];
            for (let i = 0; i < dataImages.length; i++) {
              this.dealData.images.push(await ImageUploadService.uploadImage(dataImages[i]));

            }
          }
          else if (this.isEdit) {
            this.dealData.images = this.editImages;
          }
          console.log('this.dealData.images', this.dealData.images)
          let config = {
            headers: {
              authorization: localStorage.getItem("token"),
            }
          }
          if (this.isEdit) {
            console.log(this.isEdit);
            
          const deepData: Deal = JSON.parse(JSON.stringify(this.dealData))
            delete deepData.priorBooking["dineIn"];
            delete deepData["_id"];
            delete deepData["totalviews"];
            delete deepData["visible"];
            delete deepData["reviewRate"];
            delete deepData["rate"];
            delete deepData["totalRates"];
            delete deepData["totalUsersRated"];
            delete deepData["totalBuy"];
            delete deepData["isArchived"];
            delete deepData["slug"];
            delete deepData["rates"];
            delete deepData["createdAt"];
            delete deepData["updatedAt"];
            delete deepData["__v"];
            delete deepData["canReview"];
            delete deepData["userReview"];
          
          if (deepData.paymentMethod === 'Cash') {
            deepData.paymentMethod = ['Cash'];
          }
         
            await this.$axios.put("/deals/" + this.$route.params.idEdit, deepData, config)
              .then((result) => {
                this.success = "Deal Updated Successfully"
                this.loading = false
                this.$router.push('/en/dashboard/deals')
              }).catch((error) => {
                console.log(error)
                this.error = "Something wrong happened"
                this.loading = false
              })
          } 
          else {
            
          const deepData: Deal = JSON.parse(JSON.stringify(this.dealData))
          delete deepData.percentage
          delete deepData.payoutNet
          delete deepData.yallaDealzCommission
          delete deepData.voucher.finalPrice
          if (deepData.branches.length === 0) {
            delete deepData.branches;
            console.log('deleted')
          }
          if (deepData.paymentMethod === 'Cash') {
            deepData.paymentMethod = ['Cash'];
          }else {
            delete deepData.paymentMethod
          }
          const myValidString = deepData.voucher.validFor

            await this.$axios.post("/deals", deepData, config)
              .then((result) => {
                this.success = "Added to Deals"
                this.loading = false
                this.$router.push('/en/dashboard/deals')
              }).catch((error) => {
                console.log(error)
                this.error = "Something wrong happened"
                this.loading = false
              })
          }
          console.log("end function")
        }
      }
      //
      setMerchant(value) {
        this.dealData.merchant = value
        this.$v.dealData.merchant.$touch()
        let config = {
          headers: {
            authorization: localStorage.getItem("token"),
          }
        }
        this.$axios
          .get("/merchants/" + this.dealData.merchant + "/branches", config)
          .then((data) => {
            this.branchesToShow = data.data.branches
            console.log(data.data.branches)
          })
      }
      setCategory(value) {
        this.dealData.category = value
        this.$v.dealData.category.$touch()
      }
      setBranches(value) {
        this.dealData.branches = value
        this.$v.dealData.branches.$touch()
      }
      setName(value) {
        this.dealData.name = value
        this.$v.dealData.name.$touch()
      }
      setArname(value) {
        this.dealData.arName = value
        this.$v.dealData.arName.$touch()
      }
      setVideo(value) {
        this.dealData.video = value
      }
      setDeal(value) {
        this.dealData.type = value
        this.$v.dealData.type.$touch()
      }
      setDealType(value) {
        this.dealData.dealType = value
        this.$v.dealData.dealType.$touch()
      }
      setDate(value) {
        this.dealData.dealStartDate = value
        this.$v.dealData.dealStartDate.$touch()
      }
      setEndDate(value) {
        this.dealData.dealEndDate = value
        this.$v.dealData.dealEndDate.$touch()
      }
      // setPrice(value) {
      //   console.log(value)
      //   this.dealData.prices.originalPrice = value
      //   this.$v.dealData.prices.originalPrice.$touch()
      // },
      // setFinalPrice(value) {
      //   console.log(value)
      //   this.dealData.prices.finalPrice = value
      //   this.$v.dealData.prices.finalPrice.$touch()
      // },
      // setDesc(value) {
      //   console.log(value)
      //   this.dealData.prices.description = value
      //   this.$v.dealData.prices.description.$touch()
      // },
      // seFinePrint(value) {
      //   console.log(value)
      //   // this.dealData.finePrint = value
      //   // console.log(this.$v.dealData);
      //   // this.$v.dealData.finePrint.$touch()
      // },
      // setArDesc(value) {
      //   console.log(value)
      //   // this.dealData.prices.arDescription = value
      //   this.$v.dealData.prices.arDescription.$touch()
      // },
      setPercentage(index) {
        const percentage = this.dealData.prices[index].percentage
        const final_price = this.dealData.prices[index].finalPrice
        this.dealData.prices[index].yallaDealzCommission = (percentage*final_price)/100;
        this.dealData.prices[index].payoutNet = final_price - ((percentage*final_price)/100);
      }
      setPayoutNet(value) {
        this.dealData.payoutNet = value
        this.$v.dealData.payoutNet.$touch()
      }
      setYDcommission(value) {
        this.dealData.yallaDealzCommission = value
        this.$v.dealData.yallaDealzCommission.$touch()
      }
      setVfinalprice(value) {
        this.dealData.voucher.finalPrice = value
        this.$v.dealData.voucher.finalPrice.$touch()
      }
      setVvaliduntill(value) {
        this.dealData.voucher.validUntil = value
        this.$v.dealData.voucher.validUntil.$touch()
      }
      setVmqa(value) {
        this.dealData.voucher.minimumQuantityAllowed = value
        this.$v.dealData.voucher.minimumQuantityAllowed.$touch()
      }
      setVmxqa(value) {
        this.dealData.voucher.maximumQuantityAllowed = value
        this.$v.dealData.voucher.maximumQuantityAllowed.$touch()
      }
      setVuserallowedfrom(value) {
        this.dealData.voucher.userAllowedFrom = value
        this.$v.dealData.voucher.userAllowedFrom.$touch()
      }
      setVuserallowedfupto(value) {
        this.dealData.voucher.userAllowedUpto = value
        this.$v.dealData.voucher.userAllowedUpto.$touch()
      }
      setVallowedquanitity(value) {
        this.dealData.voucher.allowedQuantity = value
        this.$v.dealData.voucher.allowedQuantity.$touch()
      }
      setValidFor(value) {
        this.dealData.voucher.validFor = value
        this.$v.dealData.voucher.validFor.$touch()
      }
      setMinimumage(value) {
        this.dealData.voucher.minimumAge = value
        this.$v.dealData.voucher.minimumAge.$touch()
      }
      setVouchervalidon(value) {
        console.log(value)
        // this.dealData.voucher.validOn = value
        // this.$v.dealData.voucher.validOn.$touch()
      }
      setHighlight(value) {
        this.dealData.highlightes = value
        this.$v.dealData.highlightes.$touch()
      }
      setDescription(value) {
        this.dealData.description = value
      }
      setArDescription(value) {
        this.dealData.arDescription = value
      }
      setArhighlight(value) {
        this.dealData.arHighlightes = value
        this.$v.dealData.arHighlightes.$touch()
      }
      setContactnumber(value) {
        this.dealData.priorBooking.contactNumber = value
        this.$v.dealData.priorBooking.contactNumber.$touch()
      }
      setEmail(value) {
        this.dealData.priorBooking.email = value
        this.$v.dealData.priorBooking.email.$touch()
      }
      setPrior(value) {
        this.dealData.priorBooking.status = value
        this.$v.dealData.priorBooking.status.$touch()
      }
      setDeliveryarea(value) {
        this.dealData.priorBooking.deliveryArea = value
        this.$v.dealData.priorBooking.deliveryArea.$touch()
      }
      // setWhen(value) {
      //   this.dealData.priorBooking.dineIn = value
      //   this.$v.dealData.priorBooking.dineIn.$touch()
      // },
      setDelivery(value) {
        this.dealData.priorBooking.delivery = value
        this.$v.dealData.priorBooking.delivery.$touch()
      }
      setPaymethod(value) {
        this.dealData.paymentMethod = value
        console.log(value, this.dealData.paymentMethod )
        this.$v.dealData.paymentMethod.$touch()
      }
      onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files
        console.log('files', files)
        if (!files.length) return
        else {
          for (let i = 0; i < files.length; i++) {
            this.createImage(files[i])
            this.file = this.$refs.imageUpload.files[i]
          }
        }
      }
      async createImage(file) {
        const image: HTMLImageElement = await ImageUploadService.readImage(file)
        this.dealData.images.push({ file, base64: image.src })
      }
    removeImage() {
        this.isImageRemoved = true;
        this.dealData.images = []
      }
      removeSingleImage(index: number) {
        this.dealData.images.splice(index, 1)
      }
      flattenCategoriesRecursively(items) {
        items.forEach((cat) => {
          this.flatCategories.push(cat)
          if (cat.root.length) this.flattenCategoriesRecursively(cat.root)
          else return
        })
      }
  }
</script>

<style lang="scss" scoped>
  .close {
    position: absolute;
    color: wheat;
    font-size: 35px;
    margin-left: 10px;
  }
  .close:hover {
    cursor: pointer;
  }
  .en-dealForm {
    &-msg {
      margin-bottom: 10px;
    }

    &-title {
      font-size: 24px;
    }

    &-main {
      width: 100%;
      display: flex;
      flex-flow: row;
      justify-content: center;

      &-left {
        // background-color: red;
        width: 60%;

        &-form {
          display: flex;
          flex-flow: column;
          justify-content: space-around;

          &-row {
            margin-bottom: 10px;
          }
        }
      }
    }

    .field-error {
      font-size: 15px;
      color: red;
    }

    .btn-font {
      font-size: 18px;
    }

    input[type="file"] {
      display: none;
    }

    .custom-file-upload {
      display: inline-block;
      padding: 6px 12px;
      width: 100%;
      text-align: center;
      background-color: #dc1f29;
      color: white;
      border-radius: 2px;
      cursor: pointer;
    }

    .custom-file-upload:hover {
      background-color: #e03d45;
      transition: 0.7s;
    }

    .optional-title {
      color: #ccc;
      font-size: 15px;
    }

    .cover-img {
      width: 200px;
      width: 200px;
      margin: auto;
      display: block;
      margin-bottom: 10px;
      display: inline-block;
      margin-right: 11px;
    }

    .upload-img {
      margin-bottom: 15px;
    }
  }

  // Spinner
  .spinner {
    width: 40px;
    height: 40px;
    background-color: #333;
    margin: 100px auto;
    -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
    animation: sk-rotateplane 1.2s infinite ease-in-out;
  }

  @-webkit-keyframes sk-rotateplane {
    0% {
      -webkit-transform: perspective(120px);
    }

    50% {
      -webkit-transform: perspective(120px) rotateY(180deg);
    }

    100% {
      -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg);
    }
  }

  @keyframes sk-rotateplane {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }

    50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    }

    100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
</style>
