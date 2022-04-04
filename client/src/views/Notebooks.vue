<template>
  <div class="container">
    <Background />
    <side-icons></side-icons>
    <navbar></navbar>
    <div class="box box-left">
      <h2 class="box-title">Notebooks</h2>
      <div class="exercise exercise-pre">
        <p class="exercise-text">
          Choose a notebook to practice from (or choose all), choose the amount
          and type of the words you want to practice.
        </p>
        <div class="input-boxes">
          <input
            class="inputBox"
            type="text"
            placeholder="Name of Your New Notebook"
            v-model="newNotebook"
          />
        </div>
      </div>
      <button class="main-button" @click="addNewNotebook">Add Notebook</button>
    </div>
    <div class="box box-right" v-bind:class="{ shrink: !notebookSelected }">
      <div class="questionBox">
        <p v-if="!user.notebooks">Add a notebook to see its content here</p>
        <div v-else>
          <select
            class="inputBox"
            name="Notebook Selector"
            id="Notebook Selector"
            v-model="chosenNotebook"
          >
            <option value disabled>Choose your Notebook</option>
            <option
              v-for="(book, bookName) in user.notebooks"
              :key="bookName"
              :value="bookName"
              >{{ bookName }}</option
            >
          </select>
          <button @click="notebookSelected = true">Get Words</button>
        </div>
        <div v-if="notebookSelected">
          <div
            v-for="(wordData, type) in user.notebooks[chosenNotebook].words"
            :key="wordData._id"
          >
            <div
              class="wordAndInput"
              v-for="(word, index) in wordData"
              :key="word.translation"
            >
              <p>{{ word.original }}</p>
              <p>{{ word.translation }}</p>
              <p>{{ type }}</p>

              <div class="editAndDelete">
                <button v-if="!toEdit" @click="editReq(word)">Edit</button>
                <button v-if="toEdit" @click="toEdit = !toEdit">Cancel</button>

                <button
                  v-if="!toEdit"
                  @click="deleteMe({ chosenNotebook, type, index, word })"
                >
                  Delete
                </button>
              </div>
              <div
                class="updateForm"
                v-if="toEdit && wordToUpdate.original == word.original"
              >
                <input
                  class="updateBox"
                  type="text"
                  v-model="updatedWord.original"
                  :placeholder="wordToUpdate.original"
                />
                <input
                  class="updateBox"
                  type="text"
                  v-model="updatedWord.translation"
                  :placeholder="wordToUpdate.translation"
                />
                <select
                  class="updateSelect"
                  name="updateTypeSelector"
                  v-model="updatedWord.type"
                >
                  <option value disabled selected hidden>{{
                    wordToUpdate.type
                  }}</option>
                  <option value="noun">Noun</option>
                  <option value="verb">Verb</option>
                  <option value="sentence">Sentence or Phrase</option>
                  <option value="adjective">Adjective</option>
                  <option value="preposition">Preposition</option>
                  <option value="other">Other</option>
                </select>
                <button @click="updateMe">Edit Complete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import navbar from "../components/Navbar";
import sideIcons from "../components/SideIcons";
import Background from "../components/Background.vue";
export default {
  name: "Exercise",
  data() {
    return {
      chosenNotebook: "",
      newNotebook: "",
      notebookSelected: false,
      toEdit: false,
      wordToUpdate: {},
      updatedWord: {
        original: "",
        translation: "",
        type: ""
      }
    };
  },
  components: {
    navbar,
    sideIcons,
    Background
  },
  methods: {
    ...mapActions(["addNotebook", "deleteWord", "updateWord"]),
    takeMeOut() {
      this.$router.push("/dashboard");
    },
    addNewNotebook() {
      if (this.newNotebook) {
        this.addNotebook(this.newNotebook);
        this.newNotebook = "";
      } else {
        alert("Please give a name to your notebook.");
        return;
      }
    },
    deleteMe(deleteData) {
      let isSure = confirm("Are you sure you want to delete the word?");
      if (isSure) {
        this.deleteWord(deleteData);
      }
    },
    editReq(wordToUpd) {
      this.toEdit = true;
      this.wordToUpdate = wordToUpd;
    },
    updateMe() {
      for (let key in this.updatedWord) {
        if (this.updatedWord[key] == "") {
          this.updatedWord[key] = this.wordToUpdate[key];
        }
      }
      this.updateWord({
        updateWord: this.updatedWord,
        oldWord: this.wordToUpdate,
        notebook: this.chosenNotebook
      });
      this.toEdit = false;
      this.updatedWord = {
        original: "",
        translation: "",
        type: ""
      };
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style scoped lang="scss">
.box {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #00e7ff;
  box-sizing: border-box;
  border-radius: 10px;
  &-left {
    position: absolute;
    left: 15rem;
    top: 10%;
    height: 85vh;
    width: 25vw;
    display: grid;
    grid-template-areas:
      "title title title"
      "ex ex ex"
      "ex ex ex"
      "ex ex ex"
      "ex ex ex"
      "but but but";

    .box-title {
      grid-area: title;
      position: relative;
      font-family: Dosis;
      font-size: 2rem;
      top: 2.5vh;
      left: 7.5%;
    }
    .exercise {
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
      font-size: 1.5rem;
      padding: 0.2rem;
      text-align: center;
      &:hover {
        border: #ffce00 solid 2px;
      }
    }
  }

  &-right {
    overflow: auto;
    position: relative;
    z-index: 7;
    padding: 0.5rem 1rem;
    top: 10vh;
    left: 40%;
    height: 85vh;
    width: 58vw;
    display: grid;
    grid-template-areas:
      "questionBox"
      "endButton";
    grid-template-rows: 95% 5%;
    .questionBox {
      .inputBox {
        z-index: 6;
        width: 65%;
        margin-right: 2%;
        height: 3rem;
        background: #ffffff;
        border: 2px solid #ffce00;
        box-sizing: border-box;
        border-radius: 10px;
        font-family: Raleway;
        color: black;
        font-weight: bold;
        font-size: 0.9rem;
        padding: 0.3rem;
        &:focus {
          outline: none;
          &::placeholder {
            color: white;
          }
        }
      }
      button {
        height: 3rem;
        width: 30%;
        background: #ffffff;
        border: 2px solid #ffce00;
        box-sizing: border-box;
        border-radius: 10px;
        font-family: Raleway;
        font-size: 0.9rem;
        font-weight: 600;
        &:hover {
          border: 3px solid #ffce00;
          cursor: pointer;
        }
      }
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
      // align-items: center;

      .wordAndInput {
        border-bottom: 0.3px solid rgba(0, 0, 0, 0.15);
        display: grid;
        padding: 0.5rem 1rem;
        grid-template-columns: 25% 25% 25% 25%;

        .editAndDelete {
          display: flex;
          flex-direction: row;
          button {
            width: 100%;
            font-size: 0.7rem;
            margin-right: 0.5rem;
            border: solid 1px #ffce00;
            &:hover {
              border: solid 2px #ffce00;
            }
          }
        }
        p {
          position: relative;
          width: auto;
          align-self: center;
          font-size: 0.9rem;
        }
        input {
          position: relative;
          margin-bottom: 1rem;
          left: 10%;
          width: 80%;
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
    .updateForm {
      position: relative;
      top: 0%;
      width: 100%;
      grid-column: 1/-1;
      display: grid;
      grid-template-areas: "edit1 edit2 option button";
      grid-template-columns: 35% 35% 15% 15%;
      grid-gap: 0rem;
      text-align: left;
      .updateBox {
        height: 2rem !important;
        left: 0 !important;
        text-align: center;
      }
      .updateSelect {
        height: 2rem;
        border: 2px solid #ffde09;
        border-radius: 10px;
        justify-self: center;
        font-family: Raleway;
        font-size: 0.9rem;
        font-weight: 600;
        width: 100%;
      }
      button {
        width: 100%;
        height: 2rem;
        margin-top: 0.1rem;
        font-size: 0.75rem;
      }
    }
  }
  &-results {
    position: absolute;
    z-index: 7;
    top: 10vh;
    left: 24%;
    height: 85vh;
    width: 73vw;
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
      // align-items: center;

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
          left: 10%;
          width: 80%;
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
}
@import "../SCSS/mobile";
</style>
