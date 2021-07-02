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
         <AddModal @clientAdded ="snackbar = true"/>
         <v-btn dark color="red darken-4" class="pdfBtn" @click="generatePdf">Generate PDF</v-btn>
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
            <!-- <v-col xs="12" sm="6" md="4" lg="3"> -->
               <!-- Sorting buttons -->
               <!-- <FilterClients @filterChange="current = $event" :current="current"/>
            </v-col> -->
         </v-row>
      </div>
      <v-data-table
         :headers="headers"
         :items="filteredNames"
         :items-per-page="10"
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
            <router-link :to="{ name: 'Details', params: { id: item.id }}" style="text-decoration: none; ">
               <v-icon small class="mr-3">
                  visibility
               </v-icon>
            </router-link>
           <EditModal :client="item" @clientUpdated ="snackbar2 = true"/>
            <v-icon
            small
            @click="archiveItem(item)"
            >
            mdi-delete
            </v-icon>
         </template>
      </v-data-table>
  </v-container>
</template>

<script>
import {projectFirestore} from '../firebase/config'
import AddModal from '../components/AddModal'
import EditModal from '../components/EditModal'
// import FilterClients from '../components/FilterClients'

export default {
   components:{
      AddModal,
      EditModal
      // FilterClients
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
        snackbar3: false,
        search: '',
        text: 'New Client has been Added',
        text2: 'Client data has been updated',
        text3: 'Item moved to archived',
        current: 'all',
        heading: 'My Clients'
      }
   },
   created(){
      projectFirestore.collection('clients').orderBy('created_at', 'desc').onSnapshot(res => {
         const changes = res.docChanges();

         changes.forEach(change => {
            if(change.type === "added"){
               const res = ({ ...change.doc.data() })
               if(res.archive_status !== 1){
                  const res = this.clients.push({ ...change.doc.data(), id: change.doc.id })
               }
            }
         })
      })
   },
   methods: {
      getColor(status){
         if(status == 'ongoing') return 'red'
         if(status == 'done') return 'blue'
         else return 'green'
      },
      archiveItem(item){
        const index = this.clients.indexOf(item)
        confirm('Are you sure you want to move this to your archive?') && 
        projectFirestore.collection('clients')
        .doc(item.id)
        .update({ 
           archive_status: 1
        }).then(() => {
           this.clients.splice(index, 1)
           this.snackbar3 = true
        }).catch(err => {
           console.log(err.message)
        })
      },
      generatePdf(){
         const columns = [
            { title: "Client Name", dataKey: "client_name" },
            { title: "Contact #", dataKey: "contact_num" },
            { title: "Model Unit", dataKey: "model_unit" },
            { title: "Date Received", dataKey: "date_received" },
            { title: "Date Claimed", dataKey: "date_claimed" },
            { title: "Warranty", dataKey: "warranty" },
            { title: "Serial Number", dataKey: "serial_num" },
            { title: "Problem", dataKey: "problem" },
            { title: "Diagnose/Repair", dataKey: "repair" },
            { title: "Amount paid", dataKey: "amount_paid" },
            { title: "Status", dataKey: "status" }
         ];
         const doc = new jsPDF({
            orientation: "landscape",
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
         body: this.clients,
         margin: { left: 0.5, top: 1.25 }
         });
         doc.save(`${this.heading}.pdf`);
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
      // filteredClients(){
      //    if(this.current == 'ongoing'){
      //       return this.clients.filter(client => client.status == 'ongoing')
      //    }
      //    if(this.current == 'delivered'){
      //       return this.clients.filter(client => client.status !== 'ongoing')
      //    }
      //    else{
      //       return this.clients
      //    }
      // }
   },
   mounted(){
     
   }
}
</script>

<style>
   @media(max-width: 450px){
      .v-btn{
         font-size: 0.7rem !important;
      }
   }
</style>