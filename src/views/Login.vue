<template>
   <v-container class="d-flex justify-center">
      <v-card class="login">
         <v-img src="../assets/jmc_logo2.png" class="jmc_logo"></v-img>
         <v-card-title class="justify-center capitalize" >
            <span class="text-uppercase">Client management System App</span>
         </v-card-title>
         <v-card-text>
            <v-form ref="form">
               <v-text-field
                  v-model="email"
                  type="email"
                  label="E-mail"
                  :rules="emailRule"
                  v-on:keyup.enter="submit"
                  required
               ></v-text-field>
               <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  :rules="passwordRule"
                   v-on:keyup.enter="submit"
                  required
               ></v-text-field>
                  <v-btn v-if="!isPending"
                  class="mr-4 signinbtn"
                  color="primary"
                  style="height: 3rem"
                  @click="submit"
                  >
                     Sign in
                     </v-btn>
                  <v-btn v-if="isPending"
                  class="mr-4 signinbtn"
                  color="primary"
                  disabled
                  >
                  Loading...Please wait...
                  </v-btn>
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
      margin-top:6rem;
      width: 24rem;
   }
   .signinbtn{
      width: 100%;
      padding:1rem;
   }
   a{
      text-decoration: none;
   }
   .jmc_logo{
      width: 9rem;
      margin-left: 7.3rem;
      margin-top: -3.4rem;
   }

</style>