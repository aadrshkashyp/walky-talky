<template class="text-gray-600 body-font">


  <div class="container mb-20 py-4 mx-auto">
    <div class="lg:w-1/2 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
         <div class="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
      <h1 class="md:text-3xl text-2xl font-medium title-font text-gray-900">Logged in as</h1>
           <h2 class="md:text-xl text-xl font-medium title-font text-gray-900">USER ID: <span class="md:text-xl text-xl text-indigo-500 tracking-widest font-medium title-font mb-1"> {{ user.uid }}</span> </h2>
    </div>
      <button class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0" @click="auth.signOut()">Sign Out</button>
    </div>
  </div>


</template>

<script>
import { auth } from '../firebase';

export default {
  data() {
    return { 
          auth 
    }
  },
  props: ['user']
}
</script>