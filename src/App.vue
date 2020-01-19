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
        <message/>
    </v-content>

  </v-app>
</template>

<script>
  import Message from '@/components/utils/Message'


export default {
  name: 'App',

  components: {Message
    
  },

  data: () => ({
    //
  }),
};
</script>
