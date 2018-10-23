<template>
  <div class='about'>
    <div class='welcome-text'>
      <h1>Welcome to ReadySetGo Aptitude Test!</h1>
      <h1>To access your aptitude test, please enter the link below into your address bar <br> and replace {token} with the provided token:</h1>
      <h2>https://aptitudetestome.ga/#/aptitude-test/{token}</h2>
    </div>
    <div class='token-input'>
      <h1>Alternatively, paste your token into the text box below</h1>
      <textarea v-model="tokenInput"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tokenInput: ''
    };
  },
}
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
</style>

