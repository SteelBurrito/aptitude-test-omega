<template>
    <p>Test will expire in {{ display }}</p>
</template>

<script>
export default {
  data() {
    return {
      tokenExpiredTime: '',
      minutes: 0,
      seconds: 0,
      display: '',
    };
  },
  // computed: {
  //   Minutes(){
  //     const minutes = Math.floor
  //   }
  // }
  mounted() {
    this.calculateTime();
  },
  methods: {
    calculateTime() {
      this.$store.dispatch('GET_TOKEN_EXPIRATION').then((res) => {
        // Convert timestamp to miliseconds
        this.tokenExpiredTime = this.$store.state.tokenExpiry;
        const msExpired = new Date(this.tokenExpiredTime * 1000);

        const msCurrentTime = Date.now();
        const msDifference = msExpired - msCurrentTime;

        if (msDifference >= 0) {
          this.minutes = Math.floor(msDifference / 60000);
          this.seconds = ((msDifference % 60000) / 1000).toFixed(0);

          this.display = `${this.minutes} minutes and ${this.seconds} seconds`;
        }

      }, (err) => {
        console.log(err);
      });
    },
  },
};
</script>
