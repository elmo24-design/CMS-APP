<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
       <v-icon small class="mr-2" v-on="on">mdi-pencil</v-icon>
    </template>

    <!-- Form goes here | The content of the pop up -->
    <v-card>
      <v-card-title>
        <h3>Edit Item</h3>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="Description"
            v-model="expenses.description"
            :rules="descRules"
            prepend-icon="create"
          ></v-text-field>
          <v-text-field
            label="Amount"
            type="number"
            v-model="expenses.amount"
            :rules="amountRules"
            prepend-icon="monetization_on"
          ></v-text-field>

         <div class="d-flex justify-space-between">
            <div>
               <v-btn
                  v-if="!isPending"
                  class="success mx-0 mt-3"
                  @click="submit"
                  >Update Item</v-btn
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
                  class="mx-0 mt-3 ml-2"
                  @click="dialog = false"
                  >Cancel</v-btn
               >
            </div>
         </div>

        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {projectFirestore, timestamp} from '../firebase/config'

export default {
   props: ['expenses'],
   data(){
      return{
         isPending: false,
         dialog: false,
         descRules: [
            (v) => !!v || "description is required",
         ],
         amountRules: [
            (v) => !!v || "amount is required",
         ],
      }
   },
   methods: {
      submit(){
         if(this.$refs.form.validate()){
            this.isPending = true
            const expenses = {
               description: this.expenses.description,
               amount: this.expenses.amount,
               created_at: timestamp(),
            }
            projectFirestore.collection('expenses')
            .doc(this.expenses.id)
            .update(expenses)
            .then(() => {
               this.$emit('expenseUpdated')
               this.dialog = false
               this.isPending = false
            })
            .catch(err =>{
               console.log(err.message)
            })
         }
      },
      clearForm(){
          this.expenses.description ='',
          this.expenses.amount = ''
      }
   }
}
</script>

<style>

</style>