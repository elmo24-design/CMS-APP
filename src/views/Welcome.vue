<template>
  <v-container class="container">
      <div>
         <v-responsive class="pt-4">
            <v-img class="grey-lighten-2">
               <img
               class="mosfeLogo"
               src="../assets/mosfe.png"
               alt="logo"
               aspect-ratio="1.7"
               contain
               />
               <img />
            </v-img>
         </v-responsive>
      </div>
      <div>
         Sign in to manage your data
      </div>
  </v-container>
</template>

<script>

export default {
   components:{

   },

}
</script>

<style scoped>
   .mosfeLogo{
      width: 100%;
   }
   @media(max-width: 600px){
      .cmsLogo{
         height: 300px;
      }
   }
   @media(max-width: 482px){
      .cmsLogo{
         height: 200px;
         margin-top: 3rem;
      }
   }
</style>