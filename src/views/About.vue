<template>
  <div class='about'>
    <div class='input-container'>
        <h2>Aptitude Test Demo</h2>
        <div class='group'>
          <input type='text' id='name' required v-model='sampleApplicant.name' @keyup.enter='CreateSampleApplicant()'/>
          <label for='name'>Enter your name here</label>
          <div class='bar'></div>
        </div>
      <p>{{ emptyNameString }}</p>
      <button v-if='applicantCreateButton' class='button -regular center' @click='CreateSampleApplicant()'> Create Sample Applicant</button>
    </div>
    <p v-if='assignTestSuccess'>Sample applicant successfully registered! Click <a class='test-link' @click='LoadToken()'>here</a> to start the test</p>
    <h1 v-show='tokenInvalid'>Token Invalid!</h1>
    <div class = 'test-and-countdown' v-show='tokenValid'>
      <div class='countdown' v-if='showTest'>
        <CountdownComponent></CountdownComponent>
      </div>
      <div class='test-component' v-if='showTest'>
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
      showTest: false,
      tokenValid: false,
      tokenInvalid: false,
      assignTestSuccess: false,
      applicantCreateButton: true,
      emptyNameString: '',
      sampleApplicant: {
        name: '',
        jobtitleApplied: 'Sample Applicant',
        email: 'mailo@gmail.com',
      },
    };
  },
  components: {
    TestComponent,
    CountdownComponent,
  },
  methods: {
    LoadToken() {
      // Must refactor later lol
      this.$store.dispatch('GENERATE_TOKEN').then((res) => {
        this.$store.dispatch('VERIFY_TOKEN_AND_RETRIEVE_TEST').then(
          (res) => {
            this.showTest = true;
            this.tokenValid = true;
            this.assignTestSuccess = false;
            this.applicantCreateButton = false;
            // this.tokenInput = this.$store.state.testToken;
          },
          (err) => {
            this.tokenInvalid = true;
          },
        );
      });
    },
    CreateSampleApplicant() {
      if (this.sampleApplicant.name) {
        return new Promise((resolve, reject) => {
          this.$store.dispatch('CREATE_SAMPLE_APPLICANT', this.sampleApplicant)
            .then((res) => {
              this.$store.dispatch('ASSIGN_SAMPLE_APPLICANT_TEST');
              this.assignTestSuccess = true;
              this.emptyNameString = '';
              resolve(res);
            })
            .catch(reject);
        });
      }
      if (this.sampleApplicant.name === '') {
        this.emptyNameString = 'Name cannot be empty';
      }
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

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.test-link {
  color: rgb(68, 185, 82);
}

.applicant-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.welcome-text{
  width: 100%;
  text-align: center;
}

.token-input {
  height: 100%;
  textarea {
    width: 80%;
  }
}

.countdown {
  text-align: center;
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
  // flex: 0 0 160px;
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

.test-component {
  padding: 1em;
}

$main-color: #F44336;
$secondary-color: #A6C9AA;
$main-color: white;
$secondary-color: #76A97C;
$width: 320px; // Change Me

* {
  box-sizing: border-box;
}

body {background: $main-color;}

.group {
  height: $width/5;
  overflow: hidden;
  position: relative;
}

label {
  position: absolute;
  top: $width/15;
  color: #A6C9AA;
  font: 400 $width/15 Roboto;
  cursor: text;
  transition: .25s ease;
}

input {
  display: block;
  width: 100%;
  padding-top: $width/15;
  border: none;
  border-radius: 0; // For iOS
  // border-bottom: solid $width/150 #A6C9AA;
  color: rgb(109, 109, 109);
  background: $main-color;
  font-size: $width/15;
  transition: .3s ease;
  &:valid {
    // border-bottom-color: #A6C9AA;
    ~label {
      top: 0;
      font: 700 $width/25 Roboto;
      color: #A6C9AA;
    }
  }
  &:focus {
    outline: none;
    // border-bottom-color: $secondary-color;
    ~label {
      top: 0;
      font: 700 $width/25 Roboto;
      color: $secondary-color;
    }


    ~ .bar:before {
    transform: translateX(0);
    }
  }

  // Stop Chrome's hideous pale yellow background on auto-fill

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px $main-color inset;
    -webkit-text-fill-color: white !important;
    // border-bottom-color: #A6C9AA;
  }
}

.bar {
  // background: $secondary-color;
  background: #A6C9AA;
  content: '';
  width: $width;
  // height: $width/100;
  height: $width/150;
  // transform: translateX(-100%);
  transition: .3s ease;
  // margin-top: -2px;
  //
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 150%;
    background: $secondary-color;
    transform: translateX(-100%);

  }
}
::selection {background: rgba($secondary-color, .3);}
</style>

