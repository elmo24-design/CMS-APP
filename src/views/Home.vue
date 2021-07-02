<template>
   <div>
      <v-container>
         <div v-if="user">
            <DataTable />
         </div>
      </v-container>
   </div>
</template>

<script>
// @ is an alias to /src
import{projectAuth} from '../firebase/config'
import DataTable from '../components/DataTable'

export default {
  name: 'Home',
  components: {
     DataTable
  },
  data(){
     return {
        user: projectAuth.currentUser
     }
  },
  methods: {
     
  },
  mounted(){
     projectAuth.onAuthStateChanged(_user => {
        this.user = _user
     })
  }
}
</script>
