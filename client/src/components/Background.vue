<template>
  <div class="bg">
    <div class="bg-stars"></div>
    <div class="bg-moon"></div>
    <div class="bg-spaceship"></div>
    <div class="bg-earth"></div>
    <div class="bg-planet"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  position: relative;
  &-stars {
    position: absolute;
    width: 964px;
    height: 784px;
    left: 60vw;
    top: -15vh;
    background-image: url("../assets/images/backgrounds/Stars3.png");
    background-repeat: no-repeat;
    background-size: 100%;
  }
  &-moon {
    position: absolute;
    width: 135px;
    height: 120px;
    top: 5vh;
    right: 85vw;
    background-image: url("../assets/images/backgrounds/Moon.png");
  }
  &-spaceship {
    position: absolute;
    width: 2rem;
    height: 3rem;
    top: 50vh;
    left: 25vw;
    background-image: url("../assets/images/backgrounds/Spaceship.png");
    background-repeat: no-repeat;
    background-size: 100%;
  }
  &-earth {
    position: absolute;
    width: 80vw;
    height: 259vh;
    left: -30vw;
    top: 60vh;
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
</style>
