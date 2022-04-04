<template>
  <div class="icons-container">
    <router-link class="practice-link" to="/exercise">
      <img
        class="icon"
        src="../assets/images/dumbbell1.png"
        alt="Link to Exercise Page"
      />
      <p class="practice-link-text">Practice</p>
    </router-link>
    <router-link class="link-icon" to="/notebooks">
      <img src="../assets/images/open-book1.png" alt="Link to Notebooks Page" />
      <p>Notebooks</p>
    </router-link>
    <router-link class="link-icon" to="/add-words">
      <img src="../assets/images/add.png" alt="Link to Add Words Page" />
      <p>Add Words</p>
    </router-link>
    <router-link class="link-icon" to="/dashboard">
      <img src="../assets/images/pie-chart.png" alt="Link to Dashboard Page" />
      <p>Dashboard</p>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.icons-container {
  position: absolute;
  width: 10vw;
  height: 85vh;
  top: 10vh;
  display: grid;
  grid-auto-rows: 20%;
  grid-gap: 2.2rem;
  left: 1rem;
  justify-items: center;
  align-items: center;
  background: rgba(#003296, 0.9);
  border-radius: 5px;
  .practice-link {
    text-decoration: none;
    width: 7.5rem;
    height: 7.5rem;
    //border-radius: 100px;
    //background: rgba(#031c4f, 0.8);
    text-align: center;
    color: rgba(255, 255, 255, 0.95);
    &icon {
      width: 50%;
      height: 55%;
      top: 0.5rem;
      left: 0rem;
    }
    &-text {
      top: 0.8rem;
      position: relative;
      font-family: Raleway;
      font-size: 0.8rem;
      font-weight: 600;
    }
    &:hover {
      border-bottom: 2px solid #00e7ff;
    }
  }

  .link-icon {
    text-decoration: none;
    width: 7.5rem;
    height: 7.5rem;
    //border-radius: 100px;
    //background: rgba(#031c4f, 0.8);
    text-align: center;
    color: rgba(255, 255, 255, 0.95);
    img {
      width: 45%;
      height: 35%;
      position: relative;
      top: 1.4rem;
      left: 0rem;
      color: white;
    }

    p {
      position: relative;
      top: 2.4rem;
      font-family: Raleway;
      font-size: 0.8rem;
      font-weight: 600;
    }
    &:hover {
      border-bottom: 2px solid #00e7ff;
    }
  }
}
@import "../SCSS/mobile";
</style>
