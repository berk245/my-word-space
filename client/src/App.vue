<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import store from "./store";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Dosis|Raleway&display=swap");
* {
  margin: 0;
  /* *:focus {
    outline: none;
  } */
}
#app {
  /* position: relative; */
  overflow: hidden;
  width: 100vw;
  min-height: 100vh;

  background: radial-gradient(
    100% 270.84% at 100% 0%,
    #000103 0%,
    rgba(4, 50, 210, 0.8) 100%
  );
}
</style>
