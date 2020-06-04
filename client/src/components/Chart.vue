<template>
  <div id="chart">
    <apexchart width="175px" type="donut" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      options: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "10px",
            colors: ["#000103"],
            fontWeight: "1000"
          },
          dropShadow: {
            enabled: true
          }
        },
        labels: ["Correct Answers", "Wrong Answers"],
        legend: {
          show: false
        },
        fill: {
          type: "solid",
          colors: ["#ffce00", "#F44336"]
        },
        colors: ["#ffce00", "#F44336"]
      },
      series: [0, 0]
    };
  },
  computed: {
    ...mapState(["user"])
  },
  beforeMount() {
    this.series[0] = this.user.performanceData.correctAnswers;
    this.series[1] =
      this.user.performanceData.wordsSeen -
      this.user.performanceData.correctAnswers;
  }
};
</script>

<style lang="scss">
#chart {
  margin-top: 15px;
}
</style>
