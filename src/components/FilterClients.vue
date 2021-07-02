<template>
  <v-row no-gutters class="mt-5 filter" >
      <v-tooltip top>
         <template v-slot:activator="{ on }">
            <v-btn small text class="ml-3" @click="sortBy('all')" v-on="on"
            :class="{ active: current === 'all' }">
               <span class="text-uppercase">All</span>
            </v-btn>
         </template>
         <span>Flter All projects</span>
      </v-tooltip>
      <v-tooltip top>
         <template v-slot:activator="{ on }">
            <v-btn small text @click="sortBy('ongoing')" v-on="on"
            :class="{ active: current === 'ongoing' }"
            >
               <span class="text-uppercase">Ongoing</span>
            </v-btn>
         </template>
         <span>Filter Ongoing projects</span>
      </v-tooltip>
      <v-tooltip top>
         <template v-slot:activator="{ on }">
            <v-btn small text class="ml-3" @click="sortBy('delivered')" v-on="on"
            :class="{ active: current === 'delivered' }"
            >
               <span class="text-uppercase">Delivered</span>
            </v-btn>
         </template>
         <span>Flter Delivered Projects</span>
      </v-tooltip>
   </v-row>
</template>

<script>
export default {
   props: ['current'],
   data(){
      return{}
   },
   methods:{
      sortBy(by){
         this.$emit('filterChange', by)
      }
   }
}
</script>

<style scoped>
   .active{
      background-color: rgba(54, 54, 54, 0.5);
      color: rgb(255, 255, 255);
   }
</style>