<template>

 
  <div class="container px-5 mb-20 mx-auto">

        <div  v-for="chat of chats" :key="chat.id" class="mb-5 bg-gray-100 rounded flex p-4 h-full items-center">
     <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
          <span class="title-font font-medium"><router-link :to="{ name: 'chat', params: { id: chat.id } }">{{ chat.id }}</router-link></span>
        </div>
                      <button class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" @click="createChatRoom()">Create New Chat Room</button>
                        
  </div>

</template>

<script>
import { db } from '../firebase';

export default {
  data() {
    return { 
        chats: [] 
    }
  },
  firestore() {
    return { 
        chats: db.collection('chats').where('owner', '==', this.uid) 
    }
  },
  methods: {
      async createChatRoom() {
          const newChat = await db.collection('chats').add({
              createdAt: Date.now(),
              owner: this.uid,
              members: [this.uid]
          })

            console.log(newChat)
      }


      
  },
  props: ['uid']

};
</script>