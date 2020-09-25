<template>
  <div class="en-PromoForm">
    <div v-if="success != ''" class="en-PromoForm-errors-error">
      <notification notfi-color="greenNotfi">
        {{ success }}
      </notification>
    </div>

    <div class="en-PromoForm-errors">
      <div
        v-for="error in errors"
        :key="error.msg"
        class="en-PromoForm-errors-error"
      >
        <notification notfi-color="redNotfi">
          {{ error.msg }}
        </notification>
      </div>
    </div>

    <div v-if="loading" class="sk-folding-cube">
      <div class="sk-cube1 sk-cube" />
      <div class="sk-cube2 sk-cube" />
      <div class="sk-cube4 sk-cube" />
      <div class="sk-cube3 sk-cube" />
    </div>
    <v-card elevation="10" class="pa-5 mb-6">
      <form
        v-if="!loading"
        class="en-PromoForm-content"
        @submit.prevent="addPromo"
      >
        <div class="en-PromoForm-content-row">
          <v-text-field
            v-model="Code"
            :rules="[(v) => !!v || 'Code is required']"
            label="Code"
            required
            @input="setCode"
          />
        </div>

        <div class="en-PromoForm-content-row">
          <v-text-field
            v-model="Value"
            :rules="[(v) => !!v || 'Value is required']"
            label="Value"
            type="number"
            required
            @input="setValue"
          />
        </div>

        <div class="en-PromoForm-content-row">
          <v-text-field
            v-model="CreationDate"
            :rules="[(v) => !!v || 'Creation Date is required']"
            label="Creation Date"
            type="date"
            required
            @input="setCreationDate"
          />
        </div>

        <div class="en-PromoForm-content-row">
          <v-text-field
            v-model="UpdateDate"
            :rules="[(v) => !!v || 'Update Date is required']"
            label="Update Date"
            type="date"
            required
            @input="setUpdateDate"
          />
        </div>

        <div class="en-PromoForm-content-row">
          <v-text-field
            v-model="ExpirationDate"
            :rules="[(v) => !!v || 'Expiration Date is required']"
            label="Expiration Date"
            type="date"
            required
            @input="setExpirationDate"
          />
        </div>

        <div class="en-PromoForm-content-row">
          <v-text-field
            v-model="Description"
            label="Description"
            @input="setDescription"
          />
        </div>

        <buttonWithColors style="" btn-color="RedBtn" btn-label="Add Admin" />
      </form>
    </v-card>
  </div>
</template>

<script>
// import Cookie from "js-cookie"
import { required } from "vuelidate/lib/validators"
// import inputWithIcon2 from "~/components/en/General/inputWithIcon2.vue"
// import arinputWithIcon2 from "~/components/ar/General/arinputWithIcon2.vue"
// import selectInput from "~/components/en/General/selectInput.vue"
import buttonWithColors from "~/components/en/General/buttonWithColors.vue"
import notification from "~/components/en/General/notification.vue"

export default {
  name: "PromoForm",
  components: {
    // inputWithIcon2,
    // arinputWithIcon2,
    buttonWithColors,
    notification,
    // selectInput,
  },
  data () {
    return {
      Code: "",
      Value: "",
      CreationDate: "",
      UpdateDate: "",
      ExpirationDate: "",
      Description: "",

      errors: [],
      file: "",
      success: "",
      loading: false,
    }
  },

  validations: {
    Code: {
      required,
    },
    Value: {
      required,
    },
    CreationDate: {
      required,
    },
    UpdateDate: {
      required,
    },
    ExpirationDate: {
      required,
    },
    Description: {
      required,
    },
  },
  methods: {
    setCode (value) {
      this.Code = value
      this.$v.Code.$touch()
    },
    setValue (value) {
      this.Value = value
      this.$v.Value.$touch()
    },
    setCreationDate (value) {
      this.CreationDate = value
      this.$v.CreationDate.$touch()
    },
    setUpdateDate (value) {
      this.UpdateDate = value
      this.$v.UpdateDate.$touch()
    },
    setExpirationDate (value) {
      this.ExpirationDate = value
      this.$v.ExpirationDate.$touch()
    },
    setDescription (value) {
      this.Description = value
      this.$v.Description.$touch()
    },
    addPromo () {
      this.loading = true
      const promoData = {
        code: this.Code,
        value: this.Value,
        createdAt: this.CreationDate,
        updatedAt: this.UpdateDate,
        expirationDate: this.ExpirationDate,
        description: this.Description,
      }

      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR"
        this.loading = false
      } else {
        // eslint-disable-next-line no-unused-vars
        const config = {
          headers: {
            authorization: this.$store.state.token,
          },
        }
        this.errors = []
        const submitPromo = async () => {
          // await uploadImage()
          console.log("start submit")
          const config = {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
          await this.$axios
            .post("/promotion", promoData, config)
            .then((result) => {
              this.success = "Added to Promotion Codes"
              this.$emit("updated")
              this.loading = false
            })
            .catch((error) => {
              this.errors.push(error.response.data)
              this.loading = false
            })
        }
        submitPromo()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.en-PromoForm {
  &-errors {
    width: 80%;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    &-error {
      width: auto;
      text-align: center;
    }
  }
}
.en-PromoForm-content {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  height: auto;
  &-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    &-element {
      width: 100%;
      &-img {
        width: 30%;
        margin: auto;
        display: block;
        margin-bottom: 10px;
      }
    }
  }
  &-button {
    width: 100%;
    &-TheButton {
      width: 350px;
    }
  }
}

@media (max-width: 992px) {
  .en-PromoForm-content {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    height: 190px;
    &-row {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &-element {
        width: auto;
      }
    }
  }
}

// loading :

.sk-folding-cube {
  margin: 200px 100px;
  width: 40px;
  height: 40px;
  position: relative;
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}

.sk-folding-cube .sk-cube {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}
.sk-folding-cube .sk-cube:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
  animation: sk-foldCubeAngle 2.4s infinite linear both;
  -webkit-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}
.sk-folding-cube .sk-cube2 {
  -webkit-transform: scale(1.1) rotateZ(90deg);
  transform: scale(1.1) rotateZ(90deg);
}
.sk-folding-cube .sk-cube3 {
  -webkit-transform: scale(1.1) rotateZ(180deg);
  transform: scale(1.1) rotateZ(180deg);
}
.sk-folding-cube .sk-cube4 {
  -webkit-transform: scale(1.1) rotateZ(270deg);
  transform: scale(1.1) rotateZ(270deg);
}
.sk-folding-cube .sk-cube2:before {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-folding-cube .sk-cube3:before {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
.sk-folding-cube .sk-cube4:before {
  -webkit-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
@-webkit-keyframes sk-foldCubeAngle {
  0%,
  10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}

@keyframes sk-foldCubeAngle {
  0%,
  10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>
