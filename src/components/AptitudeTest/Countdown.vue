<template>
    <p>Test will expire in {{ display }}</p>
</template>

<script>
export default {
  data() {
    return {
      tokenExpiredTime: '',
      display: '',
      msExpired: 0,
    };
  },
  // computed: {
  //   Minutes(){
  //     const minutes = Math.floor
  //   }
  // }
  mounted() {
    this.Countdown();
  },
  methods: {
    Countdown() {
      this.$store.dispatch('GET_TOKEN_EXPIRATION').then((res) => {
        // Convert timestamp to miliseconds
        this.tokenExpiredTime = this.$store.state.tokenExpiry;
        this.msExpired = new Date(this.tokenExpiredTime) * 1000;

        setInterval(this.Calculate, 1000);
      }, (err) => {
        console.log(err);
      });
    },
    Calculate() {
      let msCurrentTime = Date.now();
      const msDifference = this.msExpired - msCurrentTime;
      if (msDifference >= 0) {
        let minutes = Math.floor(msDifference / 60000);
        let seconds = ((msDifference % 60000) / 1000).toFixed(0);
        // Return string to display
        return this.display = `${minutes} minutes and ${seconds} seconds`;
      } else {
        return;
      }
    }
  },
};
</script>
