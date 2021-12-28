<template>
  <div id="app">
    <header>
      <h1>Walky Talky</h1>
      <p>By Aadarsh Kashyap</p>
    </header>

    <router-view></router-view> 

  </div>
</template>



<script>

import { auth } from './firebase'

console.log(auth)

export default {
  name: 'App',
  components: {
 
  }
}
</script>

<style>

</style>
