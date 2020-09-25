<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col class="text-center" cols="12">
          <nuxt-link to="/en/">
            <img height="180px" src="~/assets/images/logo.png">
          </nuxt-link>
        </v-col>
        <v-col class="text-center" cols="12">
          <h2>Admin Dashboard</h2>
        </v-col>

        <v-col class="m-auto text-center" cols="4">
          <v-card elevation="10">
            <v-sheet color="rgba(0, 0, 0, .02)">
              <v-toolbar color="#DC1F29" dark>
                <v-toolbar-title>Login to panel</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text class="py-6">
                <loginForm />
              </v-card-text>
            </v-sheet>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<!-- <div class="en-login">
    <div class="en-login-content">
      <div class="en-login-content-left">
        <div class="en-login-content-left-content">
          <div class="en-login-content-left-content-statement">
              Log in to Panel
          </div>
          <div class="en-login-content-left-content-form">
              <loginForm/>
          </div>
        </div>
      </div>
      <div class="en-login-content-right">
        <div class="en-login-content-right-overlay"></div>
      </div>
    </div>
  </div> -->

<script>
  import loginForm from "~/components/en/Forms/loginForm"
  export default {
    middleware: ["check-auth", "prevent-login"],
    components: {
      loginForm,
    },
    head () {
      return {
        title: 'Yalla Dealz Inc, Dashboard Portal',
        titleTemplate: '%s - Login',
      }
  }
  }
</script>

<style lang="scss" scoped>
  .en-login {
    overflow-y: hidden;
    height: 100vh;
    background-color: #fafafa;
    &-content {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-flow: row;
      &-right {
        background: green;
        min-height: 100vh;
        width: 40%;
        background-image: url("~assets/images/login-bg.jpg");
        background-position: contain;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &-overlay {
          background-color: rgba(24, 44, 109, 0.705);
          height: 100vh;
        }
      }
      &-left {
        width: 60%;
        margin-top: 50px;
        &-content {
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          &-statement {
            width: 500px;
            height: 100px;
            font-size: 40px;
            font-family: playfair;
            color: #5271ff;
          }
          &-form {
            width: 500px;
            height: 400px;
          }
        }
      }
    }
  }
  @media (max-width: 992px) {
    .en-login {
      overflow-y: hidden;
      &-content {
        justify-content: center;
        align-items: center;
        &-right {
          display: none;
        }
        &-left {
          width: 100%;
          &-content {
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            width: 100%;
            &-statement {
              width: 500px;
              height: 100px;
              font-size: 40px;
              font-family: playfair;
              color: #5271ff;
              text-align: center;
            }
            &-form {
              width: 350px;
              height: 400px;
            }
          }
        }
      }
    }
  }
</style>
