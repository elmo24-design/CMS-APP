<template>
  <nav>
    <!-- Top navigation bar -->
    <v-app-bar app color = "primary">
      <v-toolbar-title class="text-uppercase">
         <router-link :to="{name: 'Welcome'}" class="d-flex align-center">
            <v-img src="../assets/jmc_logo2.png" class="jmc_logo"></v-img>
            <v-btn class="transparent cmsApp" dark depressed style="font-size: 1rem;">
               <span class="white--text">CMS</span>
               <span class="font-weight-light white--text">App</span>
            </v-btn>
         </router-link>
      </v-toolbar-title>
    <v-spacer></v-spacer>

      <!-- Darkmode -->
      <v-switch v-model="$vuetify.theme.dark" inset class="mt-5" color="#26323"></v-switch>

      <!-- If the user is logged in -->
      <div v-if="user">
         <v-btn class="transparent welcome" dark depressed>
            <span>Welcome, {{ user.displayName }}</span>
         </v-btn>
          <!-- Menu dropdown -->
         <v-menu offset-y>
            <template v-slot:activator="{on}">
               <v-btn class="transparent white--text" depressed v-on="on">
                  <v-icon left>expand_more</v-icon>
                  <span>Menu</span>
               </v-btn>
            </template>
            <v-list>
               <v-list-item color="primary" v-for="(link,index) in links" :key="index" route :to="link.route">
                  <v-icon class="mr-2" small>{{ link.icon }} </v-icon>
                  <v-list-item-title small>{{ link.text }}</v-list-item-title>
               </v-list-item>
            </v-list>
         </v-menu>
         <v-btn class="transparent" dark depressed @click="handleSignOut">
            <span class="pr-sm-1">Sign Out</span>
            <v-icon>exit_to_app</v-icon>
         </v-btn>
      </div>

      <!-- If the user is not logged in  -->

      <router-link :to="{ name: 'Login'}">
         <v-btn class="transparent" dark depressed v-if="!user">
            <span>Sign In</span>
         </v-btn>
      </router-link>
      <!-- <router-link :to="{ name: 'Signup'}">
         <v-btn class="transparent" dark depressed v-if="!user">
            <span>Sign up</span>
         </v-btn>
      </router-link> -->
    </v-app-bar>
  </nav>
</template>

<script>
// @ is an alias to /src
import{projectAuth} from '../firebase/config'

export default {
  components: {

  },
  data(){
     return {
        user: projectAuth.currentUser,
        links: [
         { icon: "dashboard", text: "Dashboard", route: "/dashboard" },
         { icon: "person", text: "My Clients", route: "/clients" },
         { icon: "payments", text: "My Expenses", route: "/expenses" },
         { icon: "archive", text: "My Archive", route: "/archive" },
         { icon: "exit_to_app", text: "Add new user", route: "/Signup" },
        ],
     }
  },
  methods: {
     handleSignOut(){
        const signOut = async() => {
           try{
              await projectAuth.signOut()
           }catch(err){
              console.log(err)
           }
        }
        signOut()
     },
     updateRoute(){
        if(!this.user){
           this.$router.push({ name: 'Login'})
        }
     }
  },
  mounted(){
     projectAuth.onAuthStateChanged(_user => {
        this.user = _user
     })
  },
  watch: {
     user: 'updateRoute'
  }
}
</script>


<style scoped>
   .jmc_logo{
      width:50px;
   }
   @media(max-width: 600px){
      .welcome, .cmsApp{
         display: none !important;
         pointer-events: none;
      }
      .v-btn{
         width:5.5rem !important;
      }
   }
</style>