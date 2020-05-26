<template>
  <div class="container">
    <navbar class="nav-dash"></navbar>
    <div class="bg">
      <div class="bg-stars"></div>
      <div class="bg-moon"></div>
      <div class="bg-planet"></div>
      <div class="title"></div>
    </div>
    <side-icons></side-icons>
    <div class="box-container">
      <div class="box box-top">
        <div v-if="user.firstTime">
          <h2 class="text title-welcome">Welcome aboard {{ user.name }}!</h2>
          <p class="text welcome-text">
            This is your dashboard. You can create ‘Wordbooks’, add new words and
            practice the words you have added. You can use the button on with to
            navigate in your space anytime!
          </p>
        </div>
        <div v-else>
          <h2 class="text title-text">Welcome back {{ user.name }}!</h2>
          <p class="text box-text">
            Last time you were here was {{ user.logins[1]}}. Create notebooks,
            add words and practice. Are you ready to get to work?
          </p>
        </div>
      </div>
      <div class="box box-exercise">
        <h2 class="title2 title-text">Your Performance</h2>
        <div v-if="user.performanceData.firstTime">
          <p class="box-text text">Here you'll find your statistics when you start exercising :)</p>
        </div>
        <div v-if="!user.performanceData.firstTime" class="chart">
          <p class="text box-text">Total Questions Answered: {{user.performanceData.wordsSeen}}</p>
          <p class="text box-text">Performance Chart:</p>
          <chart></chart>
        </div>
        <div v-if="!user.performanceData.firstTime" class="stats">
          <p class="text box-text">Exercises Started: {{user.performanceData.exercisesStarted}}</p>
          <p class="text box-text">Exercises Completed: {{user.performanceData.exercisesCompleted}}</p>
        </div>
      </div>
      <div class="box box-words">
        <h2 class="title3 title-text">Recent Words</h2>
        <div v-if="user.recentWords" class="list">
          <div class="list-row" v-for="word in user.recentWords" :key="word.x">
            <p class="text box-text">{{word.original}}</p>
            <p class="text box-text">{{word.translation}}</p>
          </div>
        </div>
        <div class="list" v-else>
          <p>Add some words to see the recent words here</p>
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
import Navbar from "../components/Navbar";
import Chart from "../components/Chart";
import SideIcons from "../components/SideIcons";

export default {
  data() {
    return {};
  },
  components: {
    Login,
    Signup,
    Navbar,
    Chart,
    SideIcons
  },
  methods: {
    ...mapActions(["login", "signup"])
  },
  computed: {
    ...mapState([
      "status",
      "user",
      "signUpError",
      "loginError",
      "componentSignup"
    ])
  }
};
</script>



<style scoped lang="scss">
.nav-dash[data-v-22ba47ca] {
  .go-back {
    visibility: hidden;
  }
}
.bg {
  &-moon {
    visibility: hidden;
  }
}

.box-container {
  width: 80vw;
  height: 80vh;
  top: 10vh;
  position: relative;
  left: 15vw;
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 20% 80%;
  grid-gap: 1rem;
  .box {
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid #00e7ff;
    box-sizing: border-box;
    border-radius: 10px;
    &-top {
      grid-column: 1/-1;
    }
    &-words {
      grid-column: 2 / -1;
      display: grid;
      grid-template-columns: 50% 50%;
      grid-auto-rows: 7.5% 92.5%;
      padding: 0 0.5rem 0 0.5rem;
      .title3 {
        grid-column: 1/-1;
      }
      .list {
        grid-column: 1/-1;
        &-row {
          display: grid;
          grid-template-columns: 50% 50%;
          grid-auto-rows: auto;
          border-bottom: solid 0.3px rgba(15, 15, 15, 0.8);
        }
      }
    }
  }
}

.text {
  font-family: Raleway;
  margin-left: 1rem;
}
.title-text {
  font-family: Dosis;
  margin-top: 0.5rem;
  margin-left: 1rem;
  font-size: 1.2rem;
}
.box-text {
  font-size: 1rem;
  margin-top: 0.75rem;
  font-weight: 500;
}
.welcome {
  margin-top: 0.5rem;
}
.welcome-text {
  font-size: 1rem;
  margin-top: 0.5rem;
}
.title-welcome {
  font-family: Dosis;
  font-size: 1.5rem;
  margin-top: 0.2rem;
}
@import "../SCSS/mobile";
</style>
