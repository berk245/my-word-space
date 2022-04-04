<template>
  <div class="container">
    <Background />
    <div class="bg">
      <div class="title">
        <h1 class="main-title">my word space</h1>
        <div class="logOrSign">
          <login v-if="!componentSignup"></login>
          <signup v-else></signup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import router from "../router";
import Login from "../components/Login";
import Signup from "../components/SignUp";
import Background from "../components/Background.vue";

export default {
  data() {
    return {
      loginReq: true
    };
  },
  components: {
    Login,
    Signup,
    Background
  },
  methods: {
    ...mapActions(["login", "signup"])
  },
  computed: {
    ...mapState(["status", "signUpError", "loginError", "componentSignup"])
  }
};
</script>
<style scoped lang="scss">
.title {
  top: -10%;

  .logOrSign {
    position: absolute;
    top: 25vh;
    right: 0;
  }
}
</style>
