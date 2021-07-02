<template>
  <v-container>
    <v-btn dark color="primary" @click="goBack" class="ml-3 mt-2">
         Back
    </v-btn>
    <div class="d-flex justify-center align-center">
       <div class="cardHeading">
          <h2 class="subheading grey--text mt-5 mb-3">{{ heading }}</h2>
       </div>
       <v-btn @click="print">Print</v-btn>
    </div>
    <div class="d-flex justify-center">
       <v-card class="card">
         <v-card-text>
            <v-row>
               <v-col xs="12" lg="8">
                  <h3>Client Name: </h3>
               </v-col>
               <v-col xs="12" lg="4">
                  <span style="margin-left: 2rem;"> {{ client.client_name }} </span>
               </v-col>
            </v-row>
            <v-row>
               <v-col xs="12" lg="8">
                  <h3>Contact number: </h3>
               </v-col>
               <v-col xs="12" lg="4">
                  <span style="margin-left: 2rem;"> {{ client.contact_num }} </span>
               </v-col>
            </v-row>
            <v-row>
               <v-col xs="12" lg="8">
                  <h3>Model Unit: </h3>
               </v-col>
               <v-col xs="12" lg="4">
                  <span style="margin-left: 2rem;"> {{ client.model_unit }} </span>
               </v-col>
            </v-row>
            <v-row>
               <v-col xs="12" lg="8">
                  <h3>Date Received: </h3>
               </v-col>
               <v-col xs="12" lg="4">
                  <span style="margin-left: 2rem;"> {{ client.date_received }} </span>
               </v-col>
            </v-row>
            <v-row>
               <v-col xs="12" lg="8">
                  <h3>Date Claimed: </h3>
               </v-col>
               <v-col xs="12" lg="4">
                  <span style="margin-left: 2rem;"> {{ client.date_claimed }} </span>
               </v-col>
            </v-row>
            <v-row>
               <v-col xs="12" lg="8">
                  <h3>Warranty: </h3>
               </v-col>
               <v-col xs="12" lg="4">
                  <span style="margin-left: 2rem;"> {{ client.warranty }} </span>
               </v-col>
            </v-row>
            <v-row>
               <v-col xs="12" lg="8">
                  <h3>Serial Number: </h3>
               </v-col>
               <v-col xs="12" lg="4">
                  <span style="margin-left: 2rem;"> {{ client.serial_num }} </span>
               </v-col>
            </v-row>
            <v-row>
               <v-col xs="12" lg="8">
                  <h3>Problem: </h3>
               </v-col>
               <v-col xs="12" lg="4">
                  <span style="margin-left: 2rem;"> {{ client.problem }} </span>
               </v-col>
            </v-row>
            <v-row>
               <v-col xs="12" lg="8">
                  <h3>Diagnose/Repair: </h3>
               </v-col>
               <v-col xs="12" lg="4">
                  <span style="margin-left: 2rem;"> {{ client.repair }} </span>
               </v-col>
            </v-row>
             <v-row>
               <v-col xs="12" lg="8">
                  <h3>Amount Paid: </h3>
               </v-col>
               <v-col xs="12" lg="4">
                  <span style="margin-left: 2rem;"> {{ client.amount_paid }} </span>
               </v-col>
            </v-row>
         </v-card-text>
       </v-card>
       <!-- for printing -->
       <div hidden>
         <v-card class="card" id="printMe">
            <div>
               <!-- first row -->
               <v-card-text style="
                  border: 1px solid black;
                  padding: 0.5rem;
                  margin-left:1rem;
                  margin-top:1rem;
                  margin-right: 48rem;
                  font-size: 0.8rem;
                  ">
                  <v-row>
                     <span class="ml-3 mb-3">
                         MosfeTech | Jhayem Design Services
                     </span>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1"> Client Name:</span>{{ client.client_name}}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1"> Contact number:</span>{{ client.contact_num}}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1">Model Unit: </span> {{ client.model_unit }}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1"> Date Received:</span> {{ client.date_received }} 
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1"> Date Claimed: </span> {{ client.date_claimed }}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1"> Warranty:</span>{{ client.warranty}}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1"> Serial Number: </span> {{ client.serial_num }}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1">Problem: </span> {{ client.problem }} 
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1">Diagnose/Repair: </span> {{ client.repair }} 
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1">Amount Paid: </span> {{ client.amount_paid }}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1">Status: </span> {{ client.status }}
                     </v-col>
                  </v-row>
               </v-card-text>

               <!-- Second row -->
               <v-card-text 
                  style="margin-top: 0.5rem;
                         margin-left:1rem; 
                         border: 1px solid black;
                         padding: 0.5rem;
                         margin-right: 48rem;
                         font-size: 0.8rem;
                        ">
                  <v-row>
                     <span class="ml-3 mb-3">
                         MosfeTech | Jhayem Design Services
                     </span>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1"> Client Name:</span>{{ client.client_name}}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1"> Contact number:</span>{{ client.contact_num}}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1">Model Unit: </span> {{ client.model_unit }}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1"> Date Received:</span> {{ client.date_received }} 
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1"> Date Claimed: </span> {{ client.date_claimed }}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1"> Warranty:</span>{{ client.warranty}}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1"> Serial Number: </span> {{ client.serial_num }}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1">Problem: </span> {{ client.problem }} 
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1">Diagnose/Repair: </span> {{ client.repair }} 
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1">Amount Paid: </span> {{ client.amount_paid }}
                     </v-col>
                  </v-row>
                  <v-row>
                     <v-col xs="12" lg="8">
                        <span class="font-weight-bold mr-1">Status: </span> {{ client.status }}
                     </v-col>
                  </v-row>
               </v-card-text>
            </div>
         </v-card>
       </div>
    </div>
  </v-container>
</template>

<script>
import {projectFirestore} from '../firebase/config'


export default {
   props: ['id'],
   data(){
      return{
         heading: 'Client Details',
         client: [],
         error: '',
         showDiv: false
      }
   },
   methods: {
      goBack(){
         this.$router.go(-1)
      },
      print(){
         this.$htmlToPaper('printMe', null, () => {
            console.log('Printing completed or was cancelled!');
         });
      }
   },
   created(){
      const load = async () => {
         try{ 
            const res = await projectFirestore.collection('clients').doc(this.id).get()
            if(!res.exists){
               this.error="Client data not found"
            }
            this.client = { ...res.data(), id: res.id }
         }
         catch(err){
            console.log(err.message)
         }
      }

      load()
   }
}
</script>

<style scoped>
   .card{
      width:700px;
   }
   .cardHeading{
      width: 620px;
   }
   .cardText{
      border: 2px solid black;
   }
</style>