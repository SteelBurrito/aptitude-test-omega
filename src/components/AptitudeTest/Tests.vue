<template>
    <div class='container'>
      <div class='test-container'>
        <form class='control-group'>
            <p>Question {{ currentQuestion + 1 }} of {{ testQuestions.length }}</p>
            <h1>{{ testQuestions[currentQuestion] }}</h1>
            <div v-for='(q, key, index) in mcq' :key='index'>
              <label class='control controlradio'>
                 {{ q }}
                <input type='radio' name='radio'  v-bind:value ='q'  v-model='response' v-on:click="StoreAnswer(q)">
                <div class='control__indicator'></div>
              </label>
            </div>
            <div class='button-container'>
                <button type = 'button' class='button -regular center' v-if='currentQuestion > 0' v-on:click='PreviousQuestion()'>Previous Question</button>
                <button type = 'button' class='button -regular center' v-if='currentQuestion < (testQuestions.length - 1)' v-on:click='NextQuestion()'>Next Question</button>
                <button class='button -submit center' v-show='submitButton'> Submit Results </button>
            </div>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      submitButton: false,
      tokenValid: false,
      test: [],
      testQuestions: [],
      currentTestQuestion: '',
      currentQuestion: 0,
      answers: [],
      answersToSubmit: [],
      questionToDisplay: [],
      response: '',
      mcq: [],
    };
  },
  computed: {
    RetrieveTestFromStore() {
      return this.$store.state.tests;
    },
  },
  created() {
    this.test = this.RetrieveTestFromStore;
    for (let i = 0; i < this.test.questions.length; i += 1) {
      this.testQuestions.push(this.test.questions[i].question);
      this.answers.push(this.test.questions[i].answers);
      this.answersToSubmit[i] = {
        question: this.testQuestions[i],
        answer: '',
      };
    }
    this.mcq = this.answers[this.currentQuestion];
  },
  methods: {
    ShowSubmitButton() {
      if ((this.currentQuestion + 1) === this.testQuestions.length) {
        return this.submitButton = true;
      }
      return this.submitButton = false;
    },
    NextQuestion() {
      if (this.currentQuestion < (this.testQuestions.length - 1)) {
        this.currentQuestion += 1;
        this.currentTestQuestion = this.testQuestions[this.currentQuestion];
        this.mcq = this.answers[this.currentQuestion];
      }
      this.ShowSubmitButton();
    },
    PreviousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion -= 1;
        this.currentTestQuestion = this.testQuestions[this.currentQuestion];
        this.mcq = this.answers[this.currentQuestion];
      }
      this.ShowSubmitButton();
    },
    StoreAnswer(res) {
      this.currentTestQuestion = this.testQuestions[this.currentQuestion];
      for (let i = 0; i < this.answersToSubmit.length; i += 1) {
        if (this.answersToSubmit[i].question === this.currentTestQuestion) {
          this.answersToSubmit[i].answer = res;
          break;
        }
      }
    },
  },
};
</script>


<style lang='scss' scoped>
$color_1: #7b7b7b;
$color_2: #000;
$font_family_1: 'Source Sans Pro', sans-serif;
$font_family_2: 'Alegreya Sans', sans-serif;
$border_color_1: #7b7b7b;
$border_color_2: #7b7b7b transparent transparent transparent;
$border_top_color_1: #000;
$border_top_color_2: #ccc;

.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.test-container {
  height: 70%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: #f4f6f9;
}
h1 {
  font-family: $font_family_2;
  font-weight: 300;
  margin-top: 0;
}
.control-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  vertical-align: top;
  text-align: left;
  align-items: normal;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  margin: 10px;
}
.control {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 18px;
  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
    &:focus {
      & ~ .control__indicator {
        background: #ccc;
      }
    }
    &:checked {
      & ~ .control__indicator {
        background: #2aa1c0;
        &:after {
          display: block;
        }
      }
      &:focus {
        & ~ .control__indicator {
          background: #0e647d;
        }
      }
    }
    &:disabled {
      & ~ .control__indicator {
        background: #e6e6e6;
        opacity: 0.6;
        pointer-events: none;
      }
    }
  }
  &:hover {
    input {
      & ~ .control__indicator {
        background: #ccc;
      }
      &:not([disabled]) {
        &:checked {
          & ~ .control__indicator {
            background: #0e647d;
          }
        }
      }
    }
  }
}
.control__indicator {
  position: absolute;
  top: 2px;
  left: 0;
  height: 20px;
  width: 20px;
  background: #e6e6e6;
  &:after {
    content: '';
    position: absolute;
    display: none;
  }
}
.controlradio {
  .control__indicator {
    border-radius: 50%;
    &:after {
      left: 7px;
      top: 7px;
      height: 6px;
      width: 6px;
      border-radius: 50%;
      background: #fff;
    }
  }
  input {
    &:disabled {
      & ~ .control__indicator {
        &:after {
          background: #7b7b7b;
        }
      }
    }
  }
}
.controlcheckbox {
  .control__indicator {
    &:after {
      left: 8px;
      top: 4px;
      width: 3px;
      height: 8px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
  input {
    &:disabled {
      & ~ .control__indicator {
        &:after {
          border-color: $border_color_1;
        }
      }
    }
  }
}

.button-container {
  display: flex;
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
  box-shadow: 2px 5px 10px var(color-smoke);
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
.button.-submit {
  color: #202129;
  background-color: #23b8f3;
  &:hover {
    color: #202129;
    background-color: #5ca9c7;
    opacity: 1;
  }
  &:active {
    background-color: #d5d6d6;
    opacity: 1;
  }
}
</style>

