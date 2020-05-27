<template>
  <div class="container">
    <div class="bg">
      <div class="bg-stars"></div>
      <div class="bg-moon"></div>
      <div class="bg-spaceship"></div>
      <div class="bg-earth"></div>
      <div class="bg-planet"></div>
    </div>
    <side-icons></side-icons>
    <navbar></navbar>
    <div class="left-box">
      <left-box></left-box>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import exerciseBlock from "../components/ExercisePage/ExerciseBlock";
import leftBox from "../components/ExercisePage/ExerciseLeftBox";
import navbar from "../components/Navbar";
import sideIcons from "../components/SideIcons";
export default {
  name: "Exercise",
  data() {
    return {
      exerciseOngoing: false
    };
  },
  components: {
    navbar,
    exerciseBlock,
    leftBox,
    sideIcons
  },
  methods: {
    // checkAnswers() {
    //   this.exerciseStarted = false;
    //   for (let i = 0; i < this.exerciseQuestions.length; i++) {
    //     if (this.exerciseQuestions[i].german != this.userAnswers[i]) {
    //       this.wrongAnswers.push(this.exerciseQuestions[i]);
    //       this.allCorrect = false;
    //     }
    //   }
    //   this.exerciseDone = true;
    //   if (this.allCorrect == true) {
    //     this.userScore = this.exerciseQuestions.length;
    //   } else {
    //     this.userScore =
    //       this.exerciseQuestions.length - this.wrongAnswers.length;
    //   }
    // }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style scoped lang="scss">
.bg {
  width: 100%;
  height: auto;
  position: relative;
  &-stars {
    position: absolute;
    width: 964px;
    height: 784px;
    left: 60vw;
    top: -15vh;
    background-image: url("../assets/images/backgrounds/Stars3.png");
    background-repeat: no-repeat;
  }
  &-moon {
    position: absolute;
    width: 78px;
    height: 73px;
    top: 20vh;
    left: 35vw;
    background-image: url("../assets/images/backgrounds/Moon.png");
    background-size: 100%;
    background-repeat: no-repeat;
  }
  &-spaceship {
    position: absolute;
    width: 30px;
    height: 34.13px;
    top: 63vh;
    left: 26vw;
    background-image: url("../assets/images/backgrounds/Spaceship.png");
    background-size: 100%;
  }
  &-earth {
    position: absolute;
    width: 550px;
    height: 550px;
    left: 22vw;
    top: 32h;
    background-image: url("../assets/images/backgrounds/EarthBigg.png");
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: 0;
  }

  &-planet {
    position: absolute;
    width: 226px;
    height: 129px;
    left: 90vw;
    top: 85vh;
    background-image: url("../assets/images/backgrounds/Planet.png");
  }
}
.correct {
  border: 4px solid green;
}
</style>
