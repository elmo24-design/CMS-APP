<template>
  <v-container>
      <h2 class="subheading grey--text mt-5 mb-3 ml-3">My Dashboard</h2>
       <v-row no-gutters wrap class="cards">
         <!-- total clients -->
        <v-col xs="12" sm="12" md="4" lg="4">
          <v-card text class="text-center ma-3" color="amber darken-4">
            <v-responsive class="pt-4">
               <div height="100px">
                  <v-icon style="font-size: 5.5rem; color:white;">groups</v-icon>
               </div>
            </v-responsive>
            <v-card-text>
               <h1>
                  <div class="subheading white--text">{{ clients.length }}</div>
               </h1>
            </v-card-text>
            <v-card-text>
               <div class="font-weight-bold white--text">Total Clients</div>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- total sales -->
        <v-col xs="12" sm="6" md="4" lg="4">
          <v-card text class="text-center ma-3" color="light-blue darken-2">
            <v-responsive class="pt-4">
              <div height="100px">
                  <v-icon style="font-size: 5.5rem; color:white;">point_of_sale</v-icon>
               </div>
            </v-responsive>
            <v-card-text>
               <h1>
                  <div class="subheading white--text">{{ totalSales }}</div>
               </h1>
            </v-card-text>
            <v-card-text>
               <div class="font-weight-bold white--text">Total Sales</div>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- total expenses -->
        <v-col xs="12" sm="6" md="4" lg="4">
          <v-card text class="text-center ma-3" color="teal darken-1">
            <v-responsive class="pt-4">
              <div height="100px">
                  <v-icon style="font-size: 5.5rem; color:white;">monetization_on</v-icon>
               </div>
            </v-responsive>
            <v-card-text>
               <h1>
                  <div class="subheading white--text">{{ totalExpenses }}</div>
               </h1>
            </v-card-text>
            <v-card-text>
               <div class="font-weight-bold white--text">Total Expenses</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import {projectFirestore} from '../firebase/config'

export default {
   data(){
      return{
         clients: [],
         expenses: [],
         totalSales: 0,
         totalClients: '',
         totalExpenses: 0
      }
   },
   methods:{
       
   },
   created(){
      projectFirestore.collection('clients').onSnapshot(res => {
         const changes = res.docChanges()

         changes.forEach(change => {
            const res = ({ ...change.doc.data() })
            if(res.archive_status !== 1){
               this.clients.push({ ...change.doc.data(), id: change.doc.id })
               this.totalSales += parseInt(res.amount_paid)
            }
         })
      })
      projectFirestore.collection('expenses').onSnapshot(res => {
         const changes = res.docChanges()

         changes.forEach(change => {
            this.expenses.push({ ...change.doc.data(), id: change.doc.id })
            const res = ({ ...change.doc.data() })  
            this.totalExpenses += parseInt(res.amount)
            this.totalSales -= parseInt(res.amount)
         })
      })
   },
   mounted(){   
      
   },
   computed: {
     
   }
}
</script>

<style scoped>
   @media(max-width:600px){
      .cards{
         display: flex;
         flex-direction: column;
      }
   }

</style>