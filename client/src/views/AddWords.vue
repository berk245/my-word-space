<template>
  <div class="container">
    <Background />
    <side-icons></side-icons>
    <navbar class="navbar"></navbar>
    <div class="box box-left add-words">
      <h2 class="box-title">Add Words</h2>
      <div class="exercise exercise-pre">
        <p class="exercise-text">
          Add a new word to one of your notebooks to practice them later!
        </p>
        <div class="input-boxxes">
          <select
            class="inputBox"
            name="Notebook Selector"
            id="Notebook Selector"
            v-model="newWord.notebook"
          >
            <option value disabled>Choose your Notebook</option>
            <option
              v-for="(book, bookName) in user.notebooks"
              :key="bookName"
              :value="bookName"
              >{{ bookName }}</option
            >
          </select>
          <input
            class="inputBox"
            type="text"
            placeholder="Original Word"
            v-model="newWord.original"
          />
          <input
            class="inputBox"
            type="text"
            placeholder="Translation"
            v-model="newWord.translation"
          />
          <select class="inputBox" name="typeSelector" v-model="newWord.type">
            <option value disabled selected hidden>Choose your Type</option>

            <option value="noun">Noun</option>
            <option value="verb">Verb</option>
            <option value="sentence">Sentence or Phrase</option>
            <option value="adjective">Adjective</option>
            <option value="preposition">Preposition</option>
            <option value="other">Other</option>
          </select>
        </div>
        <p class="feedbackMessage">{{ feedbackMessage }}</p>
      </div>

      <button class="main-button" @click="addNewWord">Add Word</button>
    </div>
  </div>
</template>

<script>
import navbar from "../components/Navbar";
import sideIcons from "../components/SideIcons";
import router from "vue-router";
import { mapState, mapActions } from "vuex";
import Background from "../components/Background.vue";
export default {
  data() {
    return {
      newWord: {
        notebook: "",
        original: "",
        translation: "",
        type: ""
      },

      feedbackMessage: ""
    };
  },
  components: {
    navbar,
    sideIcons,
    Background
  },
  methods: {
    ...mapActions(["addWords"]),
    addNewWord() {
      if (
        this.newWord.notebook &&
        this.newWord.original &&
        this.newWord.translation &&
        this.newWord.type
      ) {
        this.addWords(this.newWord);
        var self = this;
        setTimeout(() => {
          self.feedbackMessage =
            self.newWord.original + " is added to " + this.newWord.notebook;
          this.resetFields();
        }, 1000);
        setTimeout(() => {
          self.feedbackMessage = "";
        }, 3000);
      } else {
        alert("Please fill all the areas to add the word.");
      }
    },
    resetFields() {
      this.newWord = {
        notebook: this.newWord.notebook,
        original: "",
        translation: "",
        type: ""
      };
    },
    takeMeOut() {
      this.$router.push("/dashboard");
    }
  },
  computed: {
    ...mapState(["user", "requestStatus"])
  }
};
</script>

<style scoped lang="scss">
.box {
  z-index: 7;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #00e7ff;
  box-sizing: border-box;
  border-radius: 10px;
  &-left {
    position: absolute;
    left: 15rem;
    top: 10vh;
    height: 85vh;
    width: 25vw;
    display: grid;
    grid-template-areas:
      "title title title"
      "ex ex ex"
      "but but but";
    grid-template-columns: 10% 60% 30%;
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

      &-text {
        text-align: justify;
      }
      &-pre {
        text-align: center;
        .input-boxxes {
          margin-top: 2rem;
          display: grid;
          left: 2.5%;
          grid-template-columns: 100%;
          grid-auto-rows: 30%;
          grid-gap: 0.7rem;
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
        .feedbackMessage {
          position: relative;
          top: 5rem;
          font-family: Raleway;
          font-size: 0.9rem;
          font-weight: 600;
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
}
</style>
