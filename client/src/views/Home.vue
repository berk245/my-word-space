<template>
  <div class="home">
    <Background />
    <div class="bg">
      <div class="title">
        <h1 class="main-title">my word space</h1>
        <div class="about-product">
          <p class="first">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam odit
            ratione beatae perspiciatis sit culpa, suscipit assumenda accusamus
            dolor delectus?
          </p>
          <p class="second">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            voluptatum quia quisquam facilis quos numquam?
          </p>
          <div class="get-started">
            <button>
              <router-link to="/dashboard" v-if="status != 'not logged in'">
                <p class="buttonz">Go to Dashboard</p>
              </router-link>

              <router-link v-else to="/get-started">
                <p class="buttonz">Get Started</p>
              </router-link>
            </button>
            <!-- <div class="buttonz" v-if="status != 'not logged in'">
              <router-link to="/dashboard">
                <button>Go to Dashboard</button>
              </router-link>
            </div>
            <div class="buttonz" v-else>
              <router-link to="/get-started">
                <button>Get Started</button>
              </router-link>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from "vuex";
import Background from "../components/Background.vue";

export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["logOut"])
  },
  components: {
    Background
  },
  computed: {
    ...mapState(["status"])
  },
  created() {
    document.addEventListener("beforeunload", this.logOut);
  }
};
</script>
<style scoped lang="scss">
.title {
  position: absolute;
  width: 70%;
  height: 90px;
  right: 5vw;
  .main-title {
    font-family: Dosis;
    font-style: normal;
    font-weight: bold;
    font-size: 4.5rem;
    line-height: 190px;
    float: right;
    color: #ffce00;
  }
  .about-product {
    position: absolute;
    top: 25vh;
    right: 0;
    width: 85%;

    .first,
    .second {
      font-family: Raleway;
      font-style: normal;
      font-weight: 400;
      font-size: 1.2rem;
      line-height: 2.7rem;
      text-align: right;

      color: #d9edf6;
    }
    .second {
      font-size: 1.1rem;
      margin-top: 0.4rem;
      line-height: 2.1rem;
    }
    .get-started {
      button {
        right: 0;
        top: 130%;
        position: absolute;
        width: 20vw;
        height: 7.5vh;
        background: #000c36;
        border: 3px solid #ffce00;
        box-sizing: border-box;
        border-radius: 10px;
        font-family: Raleway;
        font-style: normal;
        font-weight: 400;
        font-size: 2.5vh;
        color: #d9edf6;
        z-index: 6;
        &:hover {
          background-color: #ffce00;
          border: 3px solid #000c36;
          font-weight: 1000;
          a {
            text-decoration: none;
            color: #000c36;
          }
        }
        a {
          text-decoration: none;
          color: #d9edf6;
        }
      }
    }
  }
}
@import "../SCSS/mobile";
</style>
