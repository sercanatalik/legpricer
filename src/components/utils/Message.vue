// blue-grey 
// #607D8B
// blue-grey lighten-5
// #ECEFF1
// blue-grey lighten-4
// #CFD8DC
// blue-grey lighten-3
// #B0BEC5
// blue-grey lighten-2
// #90A4AE
// blue-grey lighten-1
// #78909C
// blue-grey darken-1
// #546E7A
// blue-grey darken-2
// #455A64
// blue-grey darken-3
// #37474F
// blue-grey darken-4
// #263238

<template>
  <v-snackbar
      v-model="show"
      bottom 
      right
      color="blue-grey darken-1"
      :timeout="1500"
    >
      {{ message }}
      <v-btn
        dark
        text
        @click="show = false"
      >
      <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: ''
    }
  },
  created: function () {
    this.$store.watch(state => state.bottle, () => {
      const msg = this.$store.state.bottle
      if (msg !== '') {
        this.show = true
        this.message = this.$store.state.bottle
        this.$store.commit('setMessage', '')
      }
    })
  }
}
</script>