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
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
header {
  text-align: center;
}
button, input {
  margin-bottom: 10px;
}
</style>