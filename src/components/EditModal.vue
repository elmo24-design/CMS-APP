<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
       <v-icon small class="mr-2" v-on="on">mdi-pencil</v-icon>
    </template>

    <!-- Form goes here | The content of the pop up -->
    <v-card>
      <v-card-title>
        <h3>Edit Client</h3>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
            <v-text-field
               label="Client Name"
               v-model="client.client_name"
               :rules="nameRules"
               prepend-icon="person"
            ></v-text-field>
            <v-text-field
               label="Contact number"
               v-model="client.contact_num"
               prepend-icon="phone_in_talk"
            ></v-text-field>
            <v-text-field
               label="Model Unit"
               v-model="client.model_unit"
               prepend-icon="laptop"
            ></v-text-field>

            <!-- calendar popup for date received-->
            <v-menu>
               <template v-slot:activator="{ on }">
               <v-text-field
                  :value="client.date_received"
                  label="Date Received"
                  prepend-icon="mdi-calendar-range"
                  v-on="on"
               ></v-text-field>
               </template>
               <v-date-picker v-model="client.date_received"></v-date-picker>
            </v-menu>
            <!-- calendar popup for date claimed -->
            <v-menu>
               <template v-slot:activator="{ on }">
               <v-text-field
                  :value="client.date_claimed"
                  label="Date Claimed"
                  prepend-icon="mdi-calendar-range"
                  v-on="on"
               ></v-text-field>
               </template>
               <v-date-picker v-model="client.date_claimed"></v-date-picker>
            </v-menu>

            <v-text-field
               label="Warranty"
               v-model="client.warranty"
               prepend-icon="schedule"
            ></v-text-field>

            <v-text-field
               label="Serial number"
               v-model="client.serial_num"
               :rules="serialRules"
               prepend-icon="format_list_numbered"
            ></v-text-field>
            <v-text-field
               label="Problem"
               v-model="client.problem"
               prepend-icon="sync_problem"
            ></v-text-field>
            <v-text-field
               label="Diagnose/Repair"
               v-model="client.repair"
               prepend-icon="construction"
            ></v-text-field>
            <v-text-field
               type="number"
               label="Amount Paid"
               v-model="client.amount_paid"
               prepend-icon="payments"
            ></v-text-field>
            <v-select
               v-model="client.status"
               :items="items"
               label="Status"
               prepend-icon="mdi-pencil"
            ></v-select>
            <!-- <v-text-field
               label="Status"
               v-model="client.status"
               prepend-icon="mdi-pencil"
            ></v-text-field> -->
            <div class="d-flex justify-space-between">
               <div>
                  <v-btn
                     v-if="!isPending"
                     class="success mx-0 mt-3"
                     @click="submit"
                     >Update Client</v-btn
                  > 
                  <v-btn
                     v-if="isPending"
                     class="mx-0 mt-3"
                     disabled
                     >Updating...</v-btn
                  >
               </div>
               <div>
                  <v-btn
                     text
                     class="mx-0 mt-3 ml-2"
                     @click="clearForm"
                     >Clear form</v-btn
                  >
                  <v-btn 
                     text
                     class="mx-0 mt-3 cancelBtn"
                     @click="dialog=false"
                  >
                     Cancel
                  </v-btn>
               </div>
            </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import {projectFirestore, timestamp} from '../firebase/config'

export default {
   props: ['client'],
   data(){
      return{
         isPending: false,
         dialog: false,
         items: ['ongoing', 'done', 'delivered'],
         nameRules: [
            (v) => !!v || "Client Name is required",
         ],
         serialRules: [
            (v) => !!v || "Client Name is required",
         ],
      }
   },
   methods: {
      submit(){
         if(this.$refs.form.validate()){
            this.isPending = true
            const client = {
               client_name: this.client.client_name,
               contact_num: this.client.contact_num,
               model_unit: this.client.model_unit,
               date_received: this.client.date_received,
               date_claimed: this.client.date_claimed,
               warranty: this.client.warranty,
               serial_num: this.client.serial_num,
               problem: this.client.problem,
               repair: this.client.repair,
               amount_paid: this.client.amount_paid,
               status: this.client.status,
               archive_status: 0,
               created_at: timestamp(),
            }
            projectFirestore.collection('clients')
            .doc(this.client.id)
            .update(client)
            .then(() => {
               this.$emit('clientUpdated')
               this.dialog = false
               this.isPending = false
            })
            .catch(err =>{
               console.log(err.message)
            })
         }
      },
      clearForm(){
          this.client.client_name ='',
          this.client.model_unit = '',
          this.client.date_received= null,
          this.client.date_claimed= null,
          this.client.warranty = '',
          this.client.serial_num= '',
          this.client.problem= '',
          this.client.repair= '',
          this.client.amount_paid='',
          this.client.status= ''
      }
   },
   computed: {
      formattedDateReceived() {
         return this.client.date_received ? format(parseISO(this.client.date_received), "do MMM yyyy") : "";
      },
      formattedDateClaimed() {
         return this.client.date_claimed ? format(parseISO(this.client.date_claimed), "do MMM yyyy") : "";
      },
   },
   mounted(){
   
   },
   created(){
   }
}
</script>

<style scoped>
   .v-btn .cancelBtn{
      margin-left: 5rem;
   }
</style>