<template>
  <v-container>
     <!-- snackbar pop-up 1 -->
      <v-snackbar v-model="snackbar" :timeout="3000" top>
         {{ text }}
         <template v-slot:action="{ attrs }">
         <v-btn text color="pink" @click="snackbar=false" v-bind="{attrs}">Close</v-btn>
         </template>
      </v-snackbar>
      <!-- snackbar pop-up 2 -->
      <v-snackbar v-model="snackbar2" :timeout="3000" top>
         {{ text2 }}
         <template v-slot:action="{ attrs }">
         <v-btn text color="pink" @click="snackbar2=false" v-bind="{attrs}">Close</v-btn>
         </template>
      </v-snackbar>
      <!-- snackbar pop-up 3 -->
      <v-snackbar v-model="snackbar3" :timeout="3000" top>
         {{ text3 }}
         <template v-slot:action="{ attrs }">
         <v-btn text color="pink" @click="snackbar3=false" v-bind="{attrs}">Close</v-btn>
         </template>
      </v-snackbar>
      <h2 class="subheading grey--text mt-3 mb-5">{{ heading }}</h2>
      <div class="d-flex justify-space-between align-items-center">
         <AddExpenses @expensesAdded ="snackbar = true"/>
         <v-btn dark color="red darken-4" @click="generatePdf">Generate PDF</v-btn>
      </div>
      <div>
         <v-row>
            <v-col>
                <v-text-field
                  v-model="search"
                  class="mb-3"
                  append-icon="mdi-magnify"
                  label="Search here..."
                  single-line
                  hide-details
               ></v-text-field>
            </v-col>
         </v-row>
      </div>
      <v-data-table
         :headers="headers"
         :items="filteredExpenses"
         :items-per-page="5"
         class="elevation-1"
      >
         <template v-slot:[`item.status`]="{ item }">
            <v-chip
            :color="getColor(item.status)"
            dark
            small
            >
            {{ item.status }}
            </v-chip>
         </template>
         <template v-slot:[`item.actions`]="{ item }">
            <EditExpensesModal :expenses="item" @expenseUpdated ="snackbar2 = true"/>
            <v-icon
            small
            @click="deleteItem(item)"
            >
            mdi-delete
            </v-icon>
         </template>
      </v-data-table>
  </v-container>
</template>

<script>
import {projectFirestore} from '../firebase/config'
import AddExpenses from '../components/AddExpenses'
import EditExpensesModal from '../components/EditExpenseModal'
// import EditModal from '../components/EditModal'
// import FilterClients from '../components/FilterClients'

export default {
   components:{
      AddExpenses,
      EditExpensesModal
      // EditModal
      // FilterClients
   },
   data(){
      return{
         headers: [
          {
            text: 'Items',
            align: 'start',
            sortable: false,
            value: 'description',
          },
          { text: 'Amount', value: 'amount' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        expenses: [],
        snackbar: false,
        snackbar2: false,
        snackbar3: false,
        search: '',
        text: 'New Item has been Added',
        text2: 'Item data has been updated',
        text3: 'Item has been Deleted',
        heading: 'My Expenses'
      }
   },
   created(){
      projectFirestore.collection('expenses').onSnapshot(res => {
         const changes = res.docChanges();

         changes.forEach(change => {
            if(change.type === "added"){
               const res = this.expenses.push({ ...change.doc.data(), id: change.doc.id })   
            }
         })
      })
   },
   methods: {
      deleteItem(item){
        const index = this.expenses.indexOf(item)
        confirm('Are you sure you want to permanently delete this item?') && 
        projectFirestore.collection('expenses')
        .doc(item.id)
        .delete()
        .then(() => {
           this.expenses.splice(index, 1)
           this.snackbar3 = true
        }).catch(err => {
           console.log(err.message)
        })
      },
      generatePdf(){
         const columns = [
               { title: "Items", dataKey: "description" },
               { title: "Amount", dataKey: "amount" },
            ];
            const doc = new jsPDF({
               orientation: "portrait",
               unit: "in",
               format: "long"
            });
            // text is placed using x, y coordinates
            doc.setFontSize(16).text(this.heading, 0.5, 1.0);
            // create a line under heading 
            // doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
            // Using autoTable plugin
            doc.autoTable({
            columns,
            body: this.expenses,
            margin: { left: 0.5, top: 1.25 }
            });
            doc.save(`${this.heading}.pdf`);
      }
   },

   computed: {
      filteredExpenses(){
         const searchVal = this.search.toLowerCase()
         return this.expenses.filter(expense => {
            return expense.description.toLowerCase().match(searchVal)
         })
      }
   },
   mounted(){
     
   }
}
</script>

<style>

</style>