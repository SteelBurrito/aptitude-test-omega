<template>
  <div class='about'>
    <div class='welcome-text'>
      <h1>Welcome to ReadySetGo Aptitude Test!</h1>
      <h1>To access your aptitude test, please enter the link below into your address bar <br> and replace {token} with the provided token:</h1>
      <h2>https://aptitudetest.online/#/aptitude-test/{token}</h2>
    </div>
    <div class='token-input'>
      <h2>For demo purposes, we have created a sample applicant profile in our database.</h2>
      <h2>Press the button below to generate the sample token from our sample profile.</h2>
      <p>The token will only work for a limited time</p>
      <div class='button-container'>
        <button class='button -regular center' @click='LoadSampleToken()'>
          Generate Token and Access Sample Test!
        </button>
      </div>
    </div>
    <h1 v-show="tokenInvalid">Token Invalid!</h1>
    <div class = 'test-and-countdown' v-show="tokenValid">
      <div class="countdown" v-if='showTest'>
        <CountdownComponent></CountdownComponent>
      </div>
        <div class='testComponent' v-if='showTest'>
      <TestComponent></TestComponent>
      </div>
    </div>
  </div>
</template>

<script>
import TestComponent from '@/components/AptitudeTest/Tests.vue';
import CountdownComponent from '@/components/AptitudeTest/Countdown.vue';

export default {
  data() {
    return {
      // tokenInput: '',
      showTest: false,
      tokenValid: false,
      tokenInvalid: false,
    };
  },
  components: {
    TestComponent,
    CountdownComponent,
  },
  methods: {
    LoadSampleToken(){
      // Must refactor later lol
      this.$store.dispatch('GENERATE_SAMPLE_TOKEN').then(
        (res) => {
          this.$store.dispatch('VERIFY_TOKEN_AND_RETRIEVE_TEST'). then(
            (res) => {
              this.showTest = true;
              this.tokenValid = true;
              // this.tokenInput = this.$store.state.testToken;
            },
            (err) => {
              this.tokenInvalid =  true;
            }
          );
        }
      )
    },
  },
};
</script>


<style lang='scss' scoped>
.about {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.welcome-text{
  width: 100%;
}

.token-input {
  height: 100%;
  textarea {
    width: 80%;
  }
}

.button-container {
  display: flex;
  margin: 60px auto;
  flex-wrap: wrap;
  justify-content: center;
}

.button {
  display: flex;
  // overflow: hidden;
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
  background-color: #d3d0d0;
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
</style>

