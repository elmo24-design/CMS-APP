<template>
   <v-container class="d-flex justify-center">
      <v-card class="login">
         <v-card-title class="justify-center capitalize" >
            <span class="text-uppercase">Sign in</span>
         </v-card-title>
         <v-card-text>
            <v-form ref="form">
               <v-text-field
                  v-model="email"
                  type="email"
                  label="E-mail"
                  :rules="emailRule"
                  required
               ></v-text-field>
               <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  :rules="passwordRule"
                  required
               ></v-text-field>
                  <v-btn v-if="!isPending"
                  class="mr-4"
                  color="primary"
                  @click="submit"
                  >
                  <v-icon class="mr-2">login</v-icon>
                  Sign in
                  </v-btn>
                  <v-btn v-if="isPending"
                  class="mr-4"
                  color="primary"
                  disabled
                  >
                  Loading...
                  </v-btn>
                  <v-btn @click="clear">
                     clear
                  </v-btn>
                  <v-spacer class="mb-5"></v-spacer>
                  <!-- Don't have an account yet?
                  <router-link :to="{ name: 'Signup'}">
                  <span right>Sign up</span>
                  </router-link>
                  <span class="ml-1">Instead</span> -->
            </v-form>
         </v-card-text>
         <v-card-text v-if = error class="red--text">
            {{ error }}
         </v-card-text>
      </v-card>
   </v-container>
</template>

<script>
import {projectAuth} from '../firebase/config'

export default {
   data(){
      return{
         user: projectAuth.currentUser,
         email: '',
         password: '',
         error: null,
         isPending: false,
         emailRule: [(v) => !!v || "E-mail is required", 
         v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
         ],
         passwordRule: [(v) => !!v || "Password is required"],
      }
   },
   methods: {
      submit(){
         if(this.$refs.form.validate()){
            const login = async () => {
               this.isPending = true
               this.error = null
               try{
                  const res = await projectAuth.signInWithEmailAndPassword(this.email, this.password)

                  this.error = null
                  this.isPending = false
                  console.log('User logged in')
                  
                  return res
               }catch(err){
                  console.log(err)
                  this.error = 'Invalid User Credentials'
                  this.isPending = false
               }
            }
            
            login()
            // if(!this.error && this.isPending === false){
            //    this.$router.push({ name: 'Home'})
            // }
         }
      },
      clear(){
         this.email = '' ,
         this.password = ''
      },
      updateRoute(){
         if(this.user){
            this.$router.push({ name: 'Home' })
         }
      }
   },
   mounted(){
      projectAuth.onAuthStateChanged(_user => {
         this.user = _user
      })
   },
   watch: {
      user : 'updateRoute'
   }
}
</script>

<style scoped>
   .login{
      width: 500px;
      margin-top:4.3rem;
   }
   a{
      text-decoration: none;
   }
</style>