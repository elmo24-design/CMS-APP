<template>
   <v-container class="d-flex justify-center">
      <v-card class="signup">
         <v-card-title class="justify-center">
            REGISTER A NEW USER
         </v-card-title>
         <v-card-text>
            <v-form ref="form">
               <v-text-field
                  v-model="displayName"
                  label="Name"
                  required
                  :rules="nameRule"
               ></v-text-field>
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
               <v-text-field
                  v-model="c_password"
                  type="password"
                  label="Confirm password"
                  :rules="c_passwordRule"
                  required
               ></v-text-field>
                  <v-btn
                  v-if="!isPending"
                  class="mr-4"
                  color="primary"
                  @click="submit"
                  >
                  <v-icon class="mr-2">login</v-icon>
                  Register
                  </v-btn>
                  <v-btn
                  v-if="isPending"
                  class="mr-4"
                  color="primary"
                  disabled
                  @click="submit"
                  >
                  Loading...
                  </v-btn>
                  <v-btn @click="clear">
                     clear
                  </v-btn>
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
         displayName: '',
         email: '',
         password: '',
         c_password: '',
         isPending: false,
         user: projectAuth.currentUser,
         error: null,
         nameRule: [ (v) => !!v || "Name is required"],
         emailRule: [(v) => !!v || "E-mail is required", 
         v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
         ],
         passwordRule: [(v) => !!v || "Password is required"],
         c_passwordRule: [(v) => !!v || "Please Confirm your password"],
      }
   },
   methods: {
      submit(){
         if(this.$refs.form.validate()){
            const signup = async () => {
               this.isPending = true
               this.error = null
               try{
                  if(this.password !== this.c_password){
                     throw new Error('Password does not match')
                  }
                  const res = await projectAuth.createUserWithEmailAndPassword(this.email, this.password)
                  if(!res){
                     throw new Error ('could not complete the signup')
                  }
                  const displayName = this.displayName
                  await res.user.updateProfile({ displayName })
                  this.error = null
                  console.log('User signed up')
                  this.isPending = false
                  return res
               }catch(err){
                  console.log(err)
                  this.error = err.message
                  this.isPending = false
               }
            }
            
            signup()
         }
      },
      clear(){
         this.displayName= '',
         this.email = '' ,
         this.password = '',
         this.c_password = ''
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
   .signup{
      width: 500px;
      margin-top:4.3rem;
   }
   a{
      text-decoration: none;
   }
</style>