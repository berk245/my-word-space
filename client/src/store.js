import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { request } from "http";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: sessionStorage.getItem("user-status") || "not logged in",
    signUpError: false,
    loginError: false,
    componentSignup: false,
    token: sessionStorage.getItem("auth-token") || "",
    user: JSON.parse(sessionStorage.getItem("user")) || {
      name: "",
      email: "",
      firstTime: false,
      lastLogin: "",
      logins: [],
      notebooks: {},
      totalWordCount: 0,
      recentWords: [],
      performanceData: {}
    } // _id & email & name & password
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {
    auth_request(state) {
      state.status = "Logging you in...";
    },
    auth_success(state, { header, user }) {
      (state.status = "Logged In"),
        (state.token = header.token),
        (state.user.name = user.name),
        (state.user.email = user.email),
        (state.user.notebooks = user.notebooks),
        (state.user.totalWordCount = user.totalWordCount),
        (state.user.recentWords = user.recentWords),
        (state.user.logins = user.logins),
        (state.user.performanceData = user.performanceData);
      sessionStorage.setItem("auth-token", header.token);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("user-status", state.status);
    },
    auth_error(state) {
      state.status = "Error";
    },
    signup_request(state) {
      (state.signUpError = false), (state.status = "Trying to sign up");
    },
    signup_success(state) {
      state.status = "Sign-up Successful, logging you in now...";
      state.user.firstTime = true;
    },
    signup_error(state, error) {
      state.signUpError = true;
      state.status = error;
    },
    incorrect_values(state, errorMessage) {
      (state.status = errorMessage), (state.signUpError = true);
    },
    incorrect_info(state, errorMessage) {
      (state.status = errorMessage), (state.loginError = true);
    },
    logout_success(state) {
      state.status = "not logged in";
      state.firstTime = false;
      (state.user.username = ""),
        (state.user.loggedIn = false),
        (state.user.firstTime = false),
        (state.user.words = []);
      state.user.email = "";
    },
    add_word_success(state, updatedUser) {
      state.user.notebooks = updatedUser.data.notebooks;
      state.user.recentWords = updatedUser.data.recentWords;
      state.user.totalWordCount = updatedUser.data.totalWordCount;
      sessionStorage.setItem("user", JSON.stringify(updatedUser.data));
    },
    delete_success(state, updatedUser) {
      state.user.notebooks = updatedUser.data.notebooks;
      state.user.totalWordCount = updatedUser.data.totalWordCount;
      state.user.recentWords = updatedUser.data.recentWords;
      sessionStorage.setItem("user", JSON.stringify(updatedUser.data));
    },
    update_success(state, updatedUser) {
      state.user.notebooks = updatedUser.data.notebooks;
      state.user.recentWords = updatedUser.data.recentWords;
      sessionStorage.setItem("user", JSON.stringify(updatedUser.data));
    },
    component_signup(state) {
      state.componentSignup = !state.componentSignup;
      state.loginError = false;
      state.signUpError = false;
    },
    add_notebook_success(state, updatedUser) {
      state.user.notebooks = updatedUser.data.notebooks;
      sessionStorage.setItem("user", JSON.stringify(updatedUser.data));
    },
    exercise_started(state, updatedUser) {
      state.user.performanceData = updatedUser.data.performanceData;
      sessionStorage.setItem("user", JSON.stringify(updatedUser.data));
    },
    exercise_done(state, updatedUser) {
      state.user.performanceData = updatedUser.data.performanceData;
      sessionStorage.setItem("user", JSON.stringify(updatedUser.data));
    }
  },
  actions: {
    signupComp({ commit }) {
      commit("component_signup");
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios
          .post("/login", user)
          .then(resp => {
            if (resp.status == 200) {
              const user = resp.data;
              const header = resp.headers;
              console.log(resp.data);
              commit("auth_success", { header, user });
              router.push("/dashboard");
              resolve(resp);
            } else {
              commit("incorrect_info", resp.data);
              console.log(resp);
              resolve();
            }
          })
          .catch(err => {
            commit("auth_error");
            sessionStorage.removeItem("auth-token");
            console.log(err);
            reject();
          });
      });
    },
    signup({ commit, dispatch }, user2) {
      return new Promise((resolve, reject) => {
        commit("signup_request");
        axios
          .post("/signup", user2)
          .then(resp => {
            commit("signup_request");
            if (resp.status == 200) {
              commit("signup_success");
              console.log(resp);
              console.log(resp.data.name + " registered sucesfully");
              dispatch("login", {
                email: user2.email,
                password: user2.password
              }).then(res => {
                console.log(res);
                resolve();
              });
            } else {
              commit("incorrect_values", resp.data);
              console.log(resp);
              resolve();
            }
          })
          .catch(err => {
            commit("signup_error");
            console.log();
            reject(err);
          });
      });
    },
    logOut({ commit }) {
      sessionStorage.removeItem("auth-token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("user-status");
      router.push("/");
      commit("logout_success");
    },
    addNotebook({ commit, state }, newNotebook) {
      return new Promise((resolve, reject) => {
        const user = state.user.email;
        console.log(newNotebook);
        axios
          .post("/add-notebook", { newNotebook, user })
          .then(resp => {
            console.log(resp);
            commit("add_notebook_success", resp); //response is updated user object
            resolve();
          })
          .catch(err => reject(err));
      });
    },
    addWords({ commit, state }, newWord) {
      return new Promise((resolve, reject) => {
        const user = state.user.email;
        axios
          .post("/api", { newWord, user })
          .then(resp => {
            console.log(resp); //response is the updated user
            commit("add_word_success", resp);
            resolve();
          })
          .catch(err => reject());
      });
    },
    deleteWord({ commit, state }, data) {
      //data = notebook, type, index
      return new Promise((res, rej) => {
        const user = state.user.email;
        axios
          .post(`/delete`, { user, data })
          .then(resp => {
            console.log(resp);
            commit("delete_success", resp); //updated user
            res();
          })
          .catch(err => rej(err));
      });
    },
    updateWord({ commit, state }, updateData) {
      return new Promise((res, rej) => {
        const user = state.user.email;
        axios
          .post("/edit", { user, updateData })
          .then(resp => {
            console.log(resp);
            commit("update_success", resp); //updated user
            res();
          })
          .catch(err => rej(err));
      });
    },
    exerciseStart({ commit, state }, wordAmount) {
      return new Promise((res, rej) => {
        const user = state.user.email;
        axios
          .post("/exercise/start", { user, wordAmount: parseInt(wordAmount) })
          .then(resp => {
            //console.log(resp);
            commit("exercise_started", resp);
            res();
          })
          .catch(err => rej(err));
      });
    },
    exerciseDone({ commit, state }, corrects) {
      return new Promise((res, rej) => {
        const user = state.user.email;
        axios
          .post("/exercise/complete", { user, corrects: parseInt(corrects) })
          .then(resp => {
            commit("exercise_done", resp);
            res();
          })
          .catch(err => rej(err));
      });
    }
  }
});
