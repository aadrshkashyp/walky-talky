<template>
  <div>
    <User v-slot:user="{ user }">
      <div v-if="user">
           <div class="container px-5 py-10 mx-auto flex items-center md:flex-row flex-col">
    <div class="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
      <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Profile</h2>
    </div>
  </div>
        <UserProfile :user="user" />
                     <div class="container px-5 py-5 mx-auto flex items-center md:flex-row flex-col">
    <div class="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
      <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">My Chat Room</h2>
    </div>
  </div>
        <ChatList :uid="user.uid" />
      </div>
      <Login v-else />
    </User>
   <Footer/>
  </div>
</template>

<script>
import Login from './Login'
import User from './User'
import UserProfile from './UserProfile'
import ChatList from './ChatList'
import Footer from './Footer'

export default {
    components: {
        Login, 
        User,
        UserProfile,
        ChatList,
        Footer
    }
}
</script>