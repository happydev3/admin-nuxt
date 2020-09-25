<template>
  <div class="merchant-form w-full">
    <snackbar ref="snackbar"></snackbar>
    <v-stepper v-model="step" vertical>
      <v-stepper-step :complete="step > 1" step="1" editable>Merchant Form</v-stepper-step>

      <v-stepper-content step="1">
        <v-card flat>
          <v-card-text>
            <div class="en-merchantForms-content-firstSection">
              <div class="en-merchantForm">
                <div class="en-merchantForm-title">
                  <v-card elevation="0" class="pa-5 mb-5 border">
                    <v-form ref="mform" v-model="valid">
                      <div class="en-merchantForm-main">
                        <div class="en-merchantForm-main-left">
                          <div class="en-merchantForm-main-left-form">
                            <v-text-field
                              v-model="merchantData.name"
                              :success="!!merchantData.name"
                              :rules="[(v) => !!v || 'Merchant Name is required',]"
                              label="Merchant Name"
                              required
                            />
                            <v-text-field
                              v-model="merchantData.phone"
                              :success="!!merchantData.phone"
                              :rules="[(v) => !!v || 'Phone Number is required',(v) =>(v && /^[0-9]+$/.test(v)) || 'Phone Number must be digits only']"
                              label="Phone Number"
                              required
                            />

                            <v-text-field
                              v-model="merchantData.email"
                              :success="!!merchantData.email"
                              label="Email"
                              :rules="[
                    (v) => !!v || 'E-mail is required',
                    (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                  ]"
                              required
                            />

                            <v-text-field
                              v-model="merchantData.address"
                              :success="!!merchantData.address"
                              label="Address"
                              :rules="[(v) => !!v || 'Address is required']"
                              required
                            />

                            <v-select
                              v-model="merchantData.category"
                              :success="!!merchantData.category"
                              label="Category"
                              :rules="[(v) => !!v || 'Category is required']"
                              required
                              :items="flatCategories"
                              item-value="_id"
                              item-text="name"
                            />
                            <header class="h5">Account Type</header>
                            <v-radio-group v-model="merchantData.accountType">
                              <v-radio
                                v-for="accType in merchantData.accTypes"
                                :key="accType.val"
                                :label="accType.name"
                                :value="accType.val"
                              ></v-radio>
                            </v-radio-group>
                            <v-text-field
                              v-model="merchantData.website"
                              :success="!!merchantData.website"
                              label="Website"
                            />
                            <v-text-field
                              v-model="merchantData.socialMediaLinks.facebook"
                              :success="!!merchantData.socialMediaLinks.facebook"
                              label="Facebook"
                            />
                            <v-text-field
                              v-model="merchantData.socialMediaLinks.youtube"
                              :success="!!merchantData.socialMediaLinks.youtube"
                              label="Youtube"
                            />
                            <v-text-field
                              v-model="merchantData.socialMediaLinks.instagram"
                              :success="!!merchantData.socialMediaLinks.instagram"
                              label="Instagram"
                            />

                            <v-text-field
                              v-model="merchantData.username"
                              :rules="[(v) => !!v || 'Username is required']"
                              label="Username"
                              required
                            />
                            <div class="en-singleBranch-main-right">
                              <v-text-field
                                v-model="place"
                                :success="placeIsCorrect"
                                :rules="[(v) => !!v || 'Place is required']"
                                label="Search for a place"
                                autocomplete="off"
                                @input="SearchForAplace"
                              />
                              <div class="alert h6">{{ selected_place + ' ' + location_status }}</div>
                              <div v-if="suggestions != ''" class="maps-suggestions">
                                <div v-for="suggest in suggestions" :key="suggest.id" class="map-suggest">
                                  <div :posTitle="suggest.position" :showTitle="suggest.title" @click="clickForPlace">
                                    {{ suggest.title }}
                                    <span style="font-size: 10px;">{{ (suggest.vicinity) }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div v-if="merchantData.image" class="en-merchantForm-main-left-form-row">
                              <div class="row">
                                  <img :key="merchantData.image" :src="merchantData.image" class="cover-img" width="200" alt="">
                              </div>
                              <buttonWithColors
                                class="btn-font upload-img my-3"
                                prevent-no-event
                                btn-color="RedBtn"
                                btn-label="Remove Cover"
                                @click="removeImage"
                              />
                            </div>
                            <div v-if="!merchantData.image" class="en-merchantForm-main-left-form-row">
                              <label for="image-upload" class="custom-file-upload"><v-icon style="color: white;">mdi-upload</v-icon>Image Upload</label>
                              <input id="image-upload" ref="imageUpload" multiple="multiple" type="file" @change="onFileChange">
                              <div v-if="!merchantData.image">
                                <div class="optional-title">
                                  Image is a must
                                </div>
                              </div>
                            </div>
                            <v-card class="p-3">
                              <v-card-actions>
                                <v-btn color="primary" @click="addPayment()">Add Payment</v-btn>
                              </v-card-actions>
                              <v-card-text>
                                <header class="h5">Payment</header>
                                <div v-for="(payment,index) in merchantData.payments" :key="'p'+index">
                                  <v-row justify="space-around">
                                    <v-text-field v-model="payment.amount" label="Amount"/>
                                    <v-text-field v-model="payment.dateGet" label="Date" type="datetime-local"/>
                                  </v-row>
                                  <v-row justify="space-around">
                                    <v-text-field v-model="payment.description" label="Description"/>
                                    <v-text-field v-model="payment.creatorWhom" label="By who"/>
                                  </v-row>
                                  <v-btn color="error" @click="$delete(merchantData.payments, index)">remove</v-btn>
                                  <hr>
                                </div>
                              </v-card-text>
                            </v-card>

                          </div>
                        </div>

                      </div>
                    </v-form>
                  </v-card>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-btn color="primary" @click="merchantFormValidated">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2" editable>Contact Person Info</v-stepper-step>

      <v-stepper-content step="2">
        <v-card flat>
          <v-card-text>
            <div class="en-contactPerson">
              <div class="en-contactPerson-title">
                <v-card elevation="0" class="pa-5 mb-5 border">
                  <v-form ref="pForm" v-model="valid">
                    <div class="en-contactPerson-main">
                      <div class="en-contactPerson-main-left">
                        <div class="en-contactPerson-main-left-form">
                          <v-text-field
                            v-model="merchantData.contactPerson.name"
                            :counter="20"
                            :success="!!merchantData.contactPerson.name"
                            :rules="[
                    (v) => !!v || 'Person Name is required',
                    (v) =>
                      (v && v.length <= 20) ||
                      'Name must be less than 20 characters',
                  ]"
                            label="Person Name"
                            required
                          />

                          <v-text-field
                            v-model="merchantData.contactPerson.phone"
                            :success="!!merchantData.contactPerson.phone"
                            :rules="[
                    (v) => !!v || 'Phone Number is required',
                    (v) =>
                      (v && /^[0-9]+$/.test(v)) ||
                      'Phone Number must be digits only',
                  ]"
                            label="Phone Number"
                            required
                          />

                          <v-text-field
                            v-model="merchantData.contactPerson.email"
                            :success="!!merchantData.contactPerson.email"
                            label="Email"
                            :rules="[
                    (v) => !!v || 'E-mail is required',
                    (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                  ]"
                            required
                          />

                          <v-text-field
                            v-model="merchantData.contactPerson.jobTitle"
                            :success="!!merchantData.contactPerson.jobTitle"
                            label="Job Title"
                            :rules="[(v) => !!v || 'Job Title is required']"
                            required
                          />
                          <v-select
                            v-model="merchantData.contactPerson.payOutBy"
                            :success="!!merchantData.contactPerson.payOutBy"
                            label="Payout By"
                            :rules="[(v) => !!v || 'Payout by is required']"
                            required
                            :items="payOut"
                            item-value="val"
                            item-text="name"
                          />

                        </div>
                      </div>

                    </div>
                  </v-form>
                </v-card>
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-btn
          v-if="!branches.exist"
          :loading="loading"
          color="#dc1f29"
          dark
          @click="contactPersonFormValidated">Update
        </v-btn>
        <v-btn color="primary" @click="step = 1">Back</v-btn>
      </v-stepper-content>
    </v-stepper>

  </div>
</template>

<script>
  import merchantForm from "~/components/en/Forms/merchantForm"
  import contactPerson from "~/components/en/Forms/contactPerson"
  import merchantBranches from "~/components/en/Forms/merchantBranches"
  import buttonWithColors from "~/components/en/General/buttonWithColors.vue"
  import snackbar from '~/components/snackbar.vue'
  import FormData from "form-data";

  export default {
    components: {
      merchantForm,
      contactPerson,
      merchantBranches,
      buttonWithColors,
      snackbar
    },
    props: {
      merchant: [],
    },
    head() {
      return {
        link: [
          {
            rel: "stylesheet",
            href: "https://js.hereapi.cn/v3/3.0/mapsjs-ui.css",
          },
        ],
        script: [
          {
            hid: "maps1",
            src: "https://js.api.here.com/v3/3.0/mapsjs-core.js",
            defer: true,
            callback: () => {
              this.isMapLoaded1 = true
            },
          },
          {
            hid: "maps2",
            src: "https://js.api.here.com/v3/3.0/mapsjs-service.js",
            defer: true,
            callback: () => {
              this.isMapLoaded2 = true
            },
          },
          {
            hid: "maps3",
            src: "https://js.api.here.com/v3/3.0/mapsjs-ui.js",
            defer: true,
            callback: () => {
              this.isMapLoaded3 = true
            },
          },
          {
            hid: "maps4",
            src: "https://js.api.here.com/v3/3.0/mapsjs-mapevents.js",
            defer: true,
            callback: () => {
              this.isMapLoaded4 = true
            },
          },
        ],
      }
    },
    data() {
      return {
        step: 1,
        isMapLoaded1: false,
        isMapLoaded2: false,
        isMapLoaded3: false,
        isMapLoaded4: false,
        branches: {
          exist: false,
          number: 0,
        },
        loading: false,
        validateMerchant: false,
        validatePerson: false,
        //contact
        lat: 30.04,
        long: 31.23,
        placesAPI: false,

        success: "",
        error: "",
        suggestions: "",
        place: "",
        payOut: [
          {name: "Cheque", val: "cheque",},
          {name: "Cash", val: "cash",}
        ],
        valid: false,
        placeIsCorrect: null,
        //merchant
        categories: "",
        location_status: "not selected",
        selected_place: "",
        flatCategories: [],
        file: "",
        merchantData : {
          name: "",
          phone: "",
          website: "",
          email: "",
          address: "",
          category: "some category",
          username: "",
          image: "",
          accountType: "",
          accTypes: [
            {name: "Premium", val: "Premium",},
            {name: "Free", val: "Free",}
          ],
          fileAdded: false,
          payments: [{
            dateGet: '',
            amount: '',
            description: '',
            creatorWhom: '',
          }],
          contactPerson: {
            name: "",
            phone: "",
            email: "",
            jobTitle: "",
            payOutBy: "",
            location: {},
            address: "",
          },
          location: {},
          socialMediaLinks: {
            facebook: "",
            youtube: "",
            instagram: "",
          },
        },
      }
    },
    computed: {
      showMap() {
        if (
          this.isMapLoaded1 &&
          this.isMapLoaded2 &&
          this.isMapLoaded3 &&
          this.isMapLoaded4
        ) {
          return true
        } else {
          return false
        }
      },
    },
    watch: {
      merchant() {
        console.log(this.$refs.mform.validate())
        this.merchantData.name = this.merchant[0].name;
        this.merchantData.accountType = this.merchant[0].accountType;
        this.merchantData.address = this.merchant[0].address;
        this.merchantData.category = this.merchant[0].category;
        this.merchantData.contactPerson = this.merchant[0].contactPerson;
        this.merchantData.coupons = this.merchant[0].coupons;
        this.merchantData.email = this.merchant[0].email;
        this.merchantData.location = this.merchant[0].location;
        this.merchantData.phone = this.merchant[0].phone;
        this.merchantData.image = this.merchant[0].image;
        this.merchantData.socialMediaLinks = this.merchant[0].socialMediaLinks;
        this.merchantData.username = this.merchant[0].username;
        this.merchantData.website = this.merchant[0].website;

        if (this.merchant[1].payment.length) {
          let payments = this.merchant[1].payment
          for (let x = 0; x < payments.length; x++) {
            let dateGet = ""
            if (payments[x].dateGet) {
              dateGet = payments[x].dateGet.split(":")[0]+':'+payments[x].dateGet.split(":")[1];
            }
            if (x == 0) {
              this.merchantData.payments[0].dateGet = dateGet
              this.merchantData.payments[0].amount = payments[x].amount
              this.merchantData.payments[0].description = payments[x].description
              this.merchantData.payments[0].creatorWhom = payments[x].creatorWhom
            }else {
              this.merchantData.payments.push({
                dateGet: dateGet,
                amount:  payments[x].amount,
                description: payments[x].description,
                creatorWhom: payments[x].creatorWhom,
              })
            }

          }
        }
      }
    },
    methods: {
      //contact
      submitContactWithPrevious () {
        this.error = ""
        this.success = ""
        this.$v.$touch()
        if (!this.$refs.contactform.validate()) {
          // this.$store.state.merchantForms.secondOne = false
          const cData = {
            name: this.contactPerson.name,
            phone: this.contactPerson.phone,
            email: this.contactPerson.email,
            location: this.contactPerson.location,
            jobTitle: this.contactPerson.jobTitle,
            payOutBy: this.contactPerson.payOutBy,
          }
          this.$store.commit("updateSecondOne", false)
          this.error = "Please fill all the fields!"
          alert("Please fill all the fields!")
        } else if (
          !(
            !Object.keys(this.contactPerson.location).length === 0 &&
            (!this.contactPerson.location.constructor === Object) !== ""
          )
        ) {
          const cData = {
            name: this.contactPerson.name,
            phone: this.contactPerson.phone,
            email: this.contactPerson.email,
            location: this.contactPerson.location,
            jobTitle: this.contactPerson.jobTitle,
            payOutBy: this.contactPerson.payOutBy,
          }
          this.$store.commit("contactPerson", cData)
          this.$store.commit("updateSecondOne", true)
          this.success = "Confirmed"
          alert("Confirmed")
        } else {
          // this.error = "You have to choose a location"
        }
      },

      //merch
      addPayment() {
        this.merchantData.payments.push({
          dateGet: '',
          amount: '',
          description: '',
          creatorWhom: '',
        })
      },
      validateForm() {
        if (this.$refs.form.validate() && this.fileAdded) {
          this.$emit("merchantValidated", true)
        } else {
          this.$emit("merchantValidated", false)
        }
      },
      getAddressData (addressData, placeResultData, id) {
        this.lat = addressData.latitude
        this.long = addressData.longitude
        this.location = {
          lat: this.lat.toString(),
          long: this.long.toString(),
        }
        this.placeIsCorrect = true
        // this.confirmBranch()
      },
      SearchForAplace () {
        this.suggestions = ""
        const getStatment =
          "https://places.ls.hereapi.com/places/v1/autosuggest?apiKey=d9JJdfnwO3m7HTjkm2tkS7WYy0Rkvu2hQQ2Ku643QZw&at=40.7539,-73.9837&q=" +
          this.place +
          "&pretty"
        this.$axios
          .get(getStatment)
          .then((result) => {
            this.suggestions = result.data.results
            try {
              this.suggestions.map((suggest) => {
                suggest.vicinity = suggest.vicinity.replace(/<\/?[^>]+(>|$)/g, "")
                suggest.id = Math.random() * 1000
              })
            } catch {}
          })
          .catch((error) => {
            console.log(error)
          })
      },
      clickForPlace (e) {
        try {
          this.suggestions = ""
          const myarray = e.target.getAttribute("posTitle").split(",")
          this.place = e.target.getAttribute("showTitle")
          this.selected_place = e.target.getAttribute("showtitle")
          const position = {
            lat: myarray[0],
            long: myarray[1],
          }
          this.lat = parseInt(position.lat)
          this.long = parseInt(position.long)
          this.location = {
            lat: position.lat.toString(),
            long: position.long.toString(),
          }
          if (this.location) {
            this.location_status = 'selected';
          }
        } catch {}
      },

      removeImage (e) {
        this.merchantData.image = ""
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        else {
            this.createImage(files[0])
            this.file = this.$refs.imageUpload.files[0]
        }
      },
      createImage(file) {
        var image = new Image()
        var reader = new FileReader()
        var vm = this
        reader.onload = (e) => {
          vm.merchantData.image = e.target.result
        }
        reader.readAsDataURL(file)
      },
      flattenCategoriesRecursively (items) {
        items.forEach((cat) => {
          this.flatCategories.push(cat)
          if (cat.root.length) { this.flattenCategoriesRecursively(cat.root) } else {}
        })
      },
      toggleBranches() {
        this.branches.exist = !this.branches.exist
      },
      validateMechantForm(status) {
        this.validateMerchant = !this.validateMerchant
      },
      merchantFormValidated() {
        console.log(this.$refs.mForm)
        let status = this.$refs.mform.validate()
        if (status) {
          this.step = 2
        } else {
          this.$refs.snackbar.open("Please check for required fields", 4500, 'error');
        }
      },
      contactPersonFormValidated() {
        let status = this.$refs.pForm.validate()
        if (status) {
          this.updateMerchant()
        } else {
          this.$refs.snackbar.open("Please check for required fields", 4500, 'error');
        }
      },
      updateMerchant() {
        this.loading = true
          let merchantData = this.merchantData
          let config = {
            headers: {
              authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
          const asyncSubmitting = async () => {
            const formDataa = new FormData()
            formDataa.append("image", this.merchantData.image)
            await this.$axios
              .post("/upload/image", formDataa, config)
              .then((data) => {
                this.merchantData.image = data.data.dataimages[0].imageUrl
              })
            await this.$axios
              .put("/merchants/"+this.merchant[0]._id, merchantData, config)
              .then((result) => {
                console.log(result)
                this.success = "Added Successfully!"
                this.loading = false
                this.$refs.snackbar.open("Added Successfully!", 4500, 'info');
                this.$router.push('/en/dashboard/merchants');
              })
              .catch((error) => {
                console.log(error)
                this.error = "Sorry, something happened!"
                this.loading = false
                this.$refs.snackbar.open("Sorry, something happened!", 4500, 'error');
              })
          }
          asyncSubmitting()
      },
    }
  }
</script>

<style scoped>
  .w-full {
    width: 100%;
  }
</style>
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

  .merchant-form {
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
      width: 50%;
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
