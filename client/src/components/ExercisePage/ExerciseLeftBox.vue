<template>
  <div class="container">
    <div
      class="box box-left exerciseChoices"
      v-bind:class="{ hide: onExercise }"
    >
      <h2 class="box-title">Exercise</h2>
      <div class="exercise exercise-pre" v-if="!onExercise">
        <p class="exercise-text">
          Choose a notebook to practice from (or choose all), choose the amount
          and type of the words you want to practice.
        </p>
        <br />
        <p class="guest-text" v-if="user.name == 'Guest'">
          Hello Guest User, the correct answer is the number next to the word.
          (noun6 = 6). Thank you for testing :)
        </p>
        <div class="input-boxes">
          <select
            class="inputBox"
            name="Notebook Selector"
            id="Notebook Selector"
            v-model="reqExercise.notebook"
          >
            <option value disabled>Choose your Notebook</option>
            <option value="all">All Noteboks</option>
            <option
              v-for="(book, bookName) in user.notebooks"
              :key="bookName"
              :value="bookName"
              >{{ bookName }}</option
            >
          </select>
          <input
            class="inputBox"
            type="number"
            placeholder="How many words?"
            v-model="reqExercise.amount"
          />
          <select
            class="inputBox"
            name="typeSelector"
            v-model="reqExercise.type"
          >
            <option value disabled selected hidden>Choose your Type</option>
            <option value="random">Random</option>
            <option value="noun">Noun</option>
            <option value="verb">Verb</option>
            <option value="sentence">Sentence or Phrase</option>
            <option value="adjective">Adjective</option>
            <option value="preposition">Preposition</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <button v-if="!onExercise" class="main-button" @click="beginExercise()">
        Start
      </button>
    </div>
    <div class="box box-right questions" v-if="onExercise && !resultBox">
      <div class="questionBox">
        <div
          class="wordAndInput"
          v-for="(word, index) in currentExercise.exerciseWords"
          :key="index"
        >
          <p>{{ word.translation }}</p>
          <input
            type="text"
            placeholder="Translation here"
            v-model="currentExercise.userAnswers[index]"
          />
        </div>
      </div>
      <button class="endButton" @click="checkResults">Check Results</button>
    </div>
    <div class="box box-results resultBox" v-if="resultBox">
      <div v-if="!currentExercise.allCorrect" class="questionBox">
        <div class="resultTriplets">
          <p>Question</p>
          <p>Your Answer</p>
          <p>Correct Answer</p>
        </div>
        <div
          class="resultTriplets"
          v-for="(wrong, index) in currentExercise.wrongAnswers"
          :key="index"
        >
          <p>{{ wrong.translation }}</p>
          <p>{{ wrong.wrongAnswer }}</p>
          <p>{{ wrong.original }}</p>
        </div>
      </div>
      <div class="noWrongs" v-else>
        <img src alt="All Correct Image" />
        <p>You got all the answers right {{ user.name }}!</p>
      </div>
      <button class="endButton" @click="resetAll">Completed</button>
    </div>
  </div>
</template>

<script>
import router from "vue-router";
import { mapState, mapActions } from "vuex";
import getExerciseWords from '../../helpers/getExerciseWords'
export default {
  data() {
    return {
      onExercise: false,
      resultBox: false,
      errorMessage: "",
      reqExercise: {
        notebook: "",
        amount: "",
        type: ""
      },
      currentExercise: {
        exerciseWords: [],
        userAnswers: [],
        wrongAnswers: [],
        allCorrect: true
      }
    };
  },
  methods: {
    ...mapActions(["exerciseStart", "exerciseDone"]),
    getExerciseWords: getExerciseWords,
    resetAll() {
      this.onExercise = false;
      this.resultBox = false;
      this.reqExercise.notebook = "";
      this.reqExercise.amount = "";
      this.reqExercise.type = "";
      this.currentExercise.exerciseWords = [];
      this.currentExercise.userAnswers = [];
      this.currentExercise.wrongAnswers = [];
      this.currentExercise.allCorrect = true;
    },
    randomNumberGen(range) {
      let randomNumber = Math.floor(Math.random() * Math.floor(range));
      return randomNumber;
    },
    beginExercise() {
      let exerciseWords = getExerciseWords(
        this.getCurrentUser(),
        this.reqExercise
      );
      if (exerciseWords.error) {
        this.errorMessage = exerciseWords.errorMessage;
        return;
      }
      this.currentExercise.exerciseWords = exerciseWords;
      this.createEmptyArrayForUserAnswers();
      this.onExercise = true
    },
    getCurrentUser(){
      return JSON.parse(localStorage.getItem("user"));
    },
    createEmptyArrayForUserAnswers() {
      this.currentExercise.userAnswers = Array.from(''.repeat(this.reqExercise.amount))
    },
    checkResults() {
      this.resultBox = true;
      let questions = this.currentExercise.exerciseWords;
      let answers = this.currentExercise.userAnswers;
      let wrongs = this.currentExercise.wrongAnswers;

      for (let i = 0; i < questions.length; i++) {
        if (questions[i].original != answers[i]) {
          this.currentExercise.allCorrect = false;
          let newWrong = {
            original: questions[i].original,
            translation: questions[i].translation,
            wrongAnswer: answers[i]
          };
          wrongs.push(newWrong);
        }
      }
      let corrects = exerciseParameters.amount - wrongs.length;
      this.exerciseDone(corrects);
    },
    takeMeOut() {
      let isSure = confirm(
        "Are you sure you want to quit? Your progress will not be recorded."
      );
      if (isSure) {
        this.resetAll();
        this.$router.push("/dashboard");
      }
    },
    endExercise() {
      let youSure = confirm(
        "Are you sure you want to quit? Your progress will not be recorded."
      );
      if (youSure) {
        this.resetAll();
      }
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style scoped lang="scss">
.exerciseChoices {
  width: 25%;
  position: absolute;
  left: 15rem;
  top: 10vh;
  height: 85vh;
  display: grid;
  grid-template-areas:
    "title title title"
    "ex ex ex"
    "but but but";
  grid-template-rows: 10% 60% 30%;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #00e7ff;
  box-sizing: border-box;
  border-radius: 10px;
  .box-title {
    grid-area: title;
    position: relative;
    font-family: Dosis;
    font-size: 2rem;
    top: 2.5vh;
    left: 7.5%;
  }
  .exercise {
    overflow: auto;
    position: relative;
    top: 0rem;
    padding: 1.5rem;
    grid-area: ex;
    font-family: Raleway;
    font-size: 1.1rem;
    .guest-text {
      font-size: 0.8rem;
      font-weight: bolder;
      text-align: left;
    }
    &-text {
      text-align: justify;
    }
    &-pre {
      text-align: center;
      .input-boxes {
        margin-top: 2.5rem;
        display: grid;
        left: 2.5%;
        grid-template-columns: 100%;
        grid-auto-rows: 50%;
        grid-gap: 0.5rem;
        .inputBox {
          z-index: 6;
          width: 100%;
          height: 3rem;
          background: #ffffff;
          border: 2px solid #ffce00;
          box-sizing: border-box;
          border-radius: 10px;
          font-family: Raleway;
          color: black;
          font-weight: bold;
          font-size: 0.8rem;
          padding: 0.3rem;
          &:focus {
            outline: none;
            &::placeholder {
              color: white;
            }
          }
        }
      }
      ::placeholder {
        color: black;
      }
    }
    &-post {
      h4 {
        position: relative;
        top: -2rem;
      }
      ul {
        position: relative;
        top: 2rem;
        li {
          margin-bottom: 0.7rem;
        }
      }
      .boldy {
        font-weight: bolder;
      }
    }
  }
  .main-button {
    grid-area: but;
    border-radius: 10px;
    bottom: 3vh;
    left: 7.5%;
    cursor: pointer;
    z-index: 6;
    position: absolute;
    width: 85%;
    height: 3.3rem;
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
}
.questions {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #00e7ff;
  box-sizing: border-box;
  border-radius: 10px;
  position: absolute;
  z-index: 7;
  top: 10vh;
  left: 15rem;
  height: 85vh;
  width: 85vw;
  display: grid;
  grid-template-areas:
    "questionBox"
    "endButton";
  grid-template-rows: 95% 5%;
  .questionBox {
    overflow: auto;
    width: 100%;
    height: 90%;
    position: relative;
    margin-top: 1rem;
    grid-area: questionBox;
    font-family: Raleway;
    font-size: 1rem;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(20, min-content);
    grid-gap: 1.5rem;
    .wordAndInput {
      border-bottom: 0.3px solid rgba(0, 0, 0, 0.5);
      display: grid;
      grid-template-columns: 50% 50%;
      text-align: center;

      p {
        position: relative;
        justify-self: center;
        width: auto;
        align-self: center;
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }
      input {
        position: relative;
        margin-bottom: 1rem;
        left: 0%;
        width: 90%;
        height: 3rem;
        background: #ffffff;
        border: 2px solid #ffce00;
        box-sizing: border-box;
        border-radius: 10px;
        font-family: Raleway;
        color: black;
        font-weight: bold;
        font-size: 1rem;
        padding: 0.5rem;
        &:focus {
          outline: none;
          &::placeholder {
            color: white;
          }
        }
      }
    }
  }
  .endButton {
    grid-area: endButton;
    border-radius: 10px;
    bottom: 1vh;
    left: 30%;
    cursor: pointer;
    z-index: 6;
    position: absolute;
    width: 40%;
    height: 2.5rem;
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
}

.resultBox {
  overflow: auto;
  position: absolute;
  top: 10vh;
  height: 85vh;
  width: 85vw;
  left: 15rem;
  display: grid;
  grid-template-rows: 80% 20%;
  grid-template-columns: 100%;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #00e7ff;
  box-sizing: border-box;
  border-radius: 10px;
  .questionBox {
    overflow: auto;
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: minmax(10vh);
    .resultTriplets {
      border-bottom: 0.3px solid rgba(0, 0, 0, 0.5);
      display: grid;
      grid-template-columns: 30% 40% 30%;
      grid-auto-rows: 100%;
      text-align: center;

      p {
        font-family: Raleway;
        position: relative;
        justify-self: center;
        width: auto;
        align-self: center;
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }
    }
  }
}
.endButton {
  grid-area: endButton;
  border-radius: 10px;
  bottom: 1vh;
  left: 30%;
  cursor: pointer;
  z-index: 6;
  position: absolute;
  width: 40%;
  height: 2.5rem;
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
.hide {
  display: none;
}
</style>
