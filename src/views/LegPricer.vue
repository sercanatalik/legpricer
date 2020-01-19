<template>
  <div class="home">
   
    <GridPricer/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import GridPricer from '@/components/GridPricer.vue'

export default {
  name: 'LegPricer',
  components: {
    GridPricer
  }
}
</script>
