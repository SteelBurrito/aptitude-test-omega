<template>
<div class="countdown">
    <div class="block">
      <p class="digit">00</p>
      <p class="text">Minutes</p>
    </div>
    <div class="block">
      <p class="digit">00</p>
      <p class="text">Seconds</p>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            tokenExpiredTime: '',
            minutes: 0,
            seconds: 0
        }
    },
    mounted() {
        
    },
    methods: {
        calculateTime() {
            this.$store.dispatch('GET_TOKEN_EXPIRATION').then(
                res => {
                    // Convert timestamp to miliseconds
                    this.tokenExpiredTime = this.$store.state.tokenExpiry;
                    var msExpired = new Date(this.tokenExpiredTime*1000);

                    var msCurrentTime = Date.now();
                    var msDifference = msExpired - msCurrentTime;

                    this.minutes = Math.floor(msDifference / 60000);
                    this.seconds = ((msDifference % 60000) / 1000).toFixed(0);
                }, err => {
                    console.log(err);
                }
            )
        }
    }
};
</script>
