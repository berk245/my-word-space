<template>
  <div class="loginBox">
    <p class="message">It's gonna be hell of a ride!</p>
    <input
      @keyup.enter="signMeUp"
      class="inputBox"
      type="text"
      placeholder="Your User Name"
      required
      v-model="newSignup.name"
    />
    <input
      @keyup.enter="signMeUp"
      class="inputBox"
      type="text"
      placeholder="Your E-mail"
      v-model="newSignup.email"
    />
    <input
      @keyup.enter="signMeUp"
      class="inputBox"
      type="password"
      placeholder="Your Password"
      v-model="newSignup.password"
    />

    <button class="loginButton" @click="signMeUp">Sign Up</button>
    <div v-if="signUpError" class="errorMessage">
      <p>{{ status }}</p>
    </div>
    <hr />
    <div class="firstTime">
      <p class="message m2">Oh I just remembered...</p>
    </div>
    <button class="loginButton signup" @click="signupComp">Back to Login</button>
    <div class="test">
      <p>Here for testing the app? Use the guest account</p>
      <p>
        E-mail :
        <span class="bold">guest@guest.com</span> | Password :
        <span class="bold">guest1</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import router from "../router";
export default {
  data() {
    return {
      newSignup: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["login", "signup", "signupComp"]),
    signMeUp() {
      this.signup(this.newSignup);
    }
  },
  computed: {
    ...mapState(["status", "signUpError"])
  }
};
</script>

<style lang="scss">
.loginBox {
  margin-left: 0%;
  display: flex;
  flex-direction: column;
  align-content: center;

  .message {
    width: 80%;
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 1.3rem;
    line-height: 38px;
    text-align: center;
    margin-bottom: 0.5rem;
    color: #d9edf6;
  }
  .m2 {
    position: relative;
    top: 100%;
    font-size: 1.2rem;
    font-weight: 400;
  }
  .inputBox {
    z-index: 6;
    width: 80%;
    height: 2.2rem;
    margin: 1.3rem 0 0rem 0;
    background: #ffffff;
    border: 5px solid #ffce00;
    box-sizing: border-box;
    border-radius: 10px;
    font-family: Raleway;
    color: black;
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
    padding: 0.3rem;
    text-align: center;
    &:focus {
      outline: none;
      &::placeholder {
        color: white;
      }
    }
  }
  .loginButton {
    z-index: 6;
    position: relative;
    width: 80%;
    height: 2.5rem;
    top: 5%;
    background-color: #000c36;
    border: 2px solid #d9edf6;
    box-sizing: border-box;
    border-radius: 10px;
    font-family: Raleway;
    color: #d9edf6;
    font-style: normal;
    font-weight: bold;
    font-size: 1.4rem;
    padding: 0.2rem;
    text-align: center;
    &:hover {
      border: #ffce00 solid 2px;
    }
  }
  hr {
    width: 80%;
    position: relative;
    top: 12.5%;

    border: 2px solid #ffce00;
    border-radius: 10px;
  }
  .signup {
    position: relative;
    top: 15%;
    height: 2rem;
    background: #00918e;
    border: 2px solid #d9edf6;
    font-size: 1.2rem;

    text-justify: center;
  }

  .test {
    z-index: 6;
    width: 90%;
    text-align: center;
    font-family: Raleway;
    font-size: 0.75rem;
    color: #d9edf6;
    position: relative;
    top: 25%;
    left: -5%;
    font-weight: 400;
    line-height: 150%;
    .bold {
      font-weight: bold;
    }
  }
  .errorMessage {
    z-index: 6;
    width: 80%;
    text-align: center;
    font-family: Raleway;
    font-size: 0.9rem;
    color: #d9edf6;
    position: relative;
    top: 9%;
  }
}
</style>
