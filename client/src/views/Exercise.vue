<template>
  <div class="container">
    <Background />
    <side-icons></side-icons>
    <navbar></navbar>
    <div class="left-box">
      <left-box></left-box>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import leftBox from "../components/ExercisePage/ExerciseLeftBox";
import navbar from "../components/Navbar";
import sideIcons from "../components/SideIcons";
import Background from "../components/Background.vue";
export default {
  name: "Exercise",
  data() {
    return {
      exerciseOngoing: false
    };
  },
  components: {
    navbar,
    leftBox,
    sideIcons,
    Background
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
.correct {
  border: 4px solid green;
}
</style>
