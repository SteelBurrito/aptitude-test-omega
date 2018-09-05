<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/RSG_Resized.png">
    <div class="hello">
      <h1>Aptitude Test For:</h1>
      <h1>Regional Manager</h1>
      <div class="button-container" v-show="!hideStartButton">
        <button class='button -regular center' @click="showTest=true; hideStartButton=true">
          Lets Go!
        </button>
      </div>
      <div class="testComponent" v-if="showTest">
        <Tests></Tests>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Tests from '@/components/AptitudeTest/Tests.vue';

export default {
  data(){
    return {
      showTest: false,
      hideStartButton: false,
    };
  },
  components: {
    Tests,
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.button-container {
  display: flex;
  margin: 60px auto;
  flex-wrap: wrap;
  justify-content: center;
}
.button {
  display: flex;
  overflow: hidden;
  margin: 10px;
  padding: 12px 12px;
  cursor: pointer;
  user-select: none;
  transition: all 150ms linear;
  text-align: center;
  white-space: nowrap;
  text-decoration: none !important;
  text-transform: none;
  text-transform: capitalize;
  color: #fff;
  border: 0 none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  justify-content: center;
  align-items: center;
  flex: 0 0 160px;
  box-shadow: 2px 5px 10px var(--color-smoke);
  &:hover {
    transition: all 150ms linear;
    opacity: 0.85;
  }
  &:active {
    transition: all 150ms linear;
    opacity: 0.75;
  }
  &:focus {
    outline: 1px dotted #959595;
    outline-offset: -4px;
  }
}
.button.-regular {
  color: #202129;
  background-color: #f2f2f2;
  &:hover {
    color: #202129;
    background-color: #e1e2e2;
    opacity: 1;
  }
  &:active {
    background-color: #d5d6d6;
    opacity: 1;
  }
}
.testComponent {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
}
</style>
