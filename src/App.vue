<template>
  <v-app>
    <v-app-bar app dense flat light>
      <v-toolbar-title class="headline text-uppercase">
        <span>LEG</span>
        <span class="font-weight-light">Pricer</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>


    <v-content>
     <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>
