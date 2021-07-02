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

      <h2 class="subheading grey--text mt-5 mb-3">My Archive</h2>
       <v-text-field
         v-model="search"
         class="mb-3"
         append-icon="mdi-magnify"
         label="Search here..."
         single-line
         hide-details
      ></v-text-field>
      <v-data-table
         :headers="headers"
         :items="filteredNames"
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
            <v-icon
            class='mr-2'
            small
            @click="restoreItem(item)"
            >
            restore
            </v-icon>
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


export default {
   components:{
      
   },
   data(){
      return{
         headers: [
          {
            text: 'Client Name',
            align: 'start',
            sortable: false,
            value: 'client_name',
          },
          { text: 'Model Unit', value: 'model_unit' },
          { text: 'Date Received', value: 'date_received' },
          { text: 'Date Claimed', value: 'date_claimed' },
          { text: 'Status', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        clients: [],
        snackbar: false,
        snackbar2: false,
        text: 'Item restored',
        text2: 'Item Deleted',
        search: ''
      }
   },
   created(){
      projectFirestore.collection('clients').orderBy('created_at', 'desc').onSnapshot(res => {
         const changes = res.docChanges();

         changes.forEach(change => {
            if(change.type === "added"){
               const res = ({ ...change.doc.data() })
               if(res.archive_status === 1){
                  this.clients.push({ ...change.doc.data(), id: change.doc.id })
               }
            }
         })
      })
   },
   methods: {
      getColor(status){
         if(status == 'ongoing') return 'red'
         else return 'green'
      },
      restoreItem(item){
         const index = this.clients.indexOf(item)
         confirm('Are you sure you want to restore this item?') && 
         projectFirestore.collection('clients')
         .doc(item.id)
         .update({ 
            archive_status: 0
         }).then(() => {
            this.clients.splice(index, 1)
            this.snackbar = true
         }).catch(err => {
            console.log(err.message)
         })
      },
      deleteItem(item){
         const index = this.clients.indexOf(item)
         confirm('Are you sure you want to permanently delete this item?') && 
         projectFirestore.collection('clients')
         .doc(item.id)
         .delete()
         .then(() => {
            this.clients.splice(index, 1)
            this.snackbar2 = true
         }).catch(err => {
            console.log(err.message)
         })
      }
   },
   computed: {
      filteredNames(){
         const searchVal = this.search.toLowerCase()
         return this.clients.filter(client => {
            return client.client_name.toLowerCase().match(searchVal) ||
                   client.model_unit.toLowerCase().match(searchVal) ||
                   client.status.toLowerCase().match(searchVal) ||
                   client.serial_num.toLowerCase().match(searchVal)
         })
      }
   }
}
</script>

<style>

</style>