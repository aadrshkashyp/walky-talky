<template>
  <main class="section">

      <div class="container mb-10 py-4 mx-auto">
    <div class=" flex flex-col sm:flex-row sm:items-center items-start mx-auto">
         <div class="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
      <h1 class="md:text-3xl text-2xl font-medium title-font text-gray-900">Welcome to ChatRoom </h1>
       <h2 class="md:text-3xl text-2xl font-medium title-font text-gray-900">Chat Room ID: <span class="md:text-3xl text-2xl text-indigo-500 tracking-widest font-medium title-font mb-1"> {{ chatId }} </span> </h2>
    </div>
    </div>
  </div>
    <router-link to="/">    
    
       <a class="mt-3 mb-10 text-indigo-500 inline-flex items-center">
              <svg style="-webkit-transform: scaleX(-1);
  transform: scaleX(-1);" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
                         Back   
         </a>
    </router-link>

    <p>
    Open this link in another browser window to chat 
      <code>https://your-url.com/#/chats/{{ chatId }}</code>
    </p>

    <User #user="{ user }">
      <div v-if="user">
        <ul>
          <li v-for="message of messages" :key="message.id">
            <ChatMessage :message="message" :owner="user.uid === message.sender" />
          </li>
        </ul>

        <hr />
        <h5>Record Audio</h5>

        <button v-if="!recorder" @click="record()" class="button is-info">Record Voice</button>
        <button v-else @click="stop()" class="button is-danger">Stop</button>

        <br />

        <audio v-if="newAudio" :src="newAudioURL" controls></audio>

        <hr />

        <input v-model="newMessageText" class="input" />

        <button
          :disabled="(!newMessageText && !newAudio) || loading"
          class="button is-success"
          type="text"
          @click="addMessage(user.uid)"
        >Send</button>
      </div>

      <Login v-else />
    </User>
  </main>
</template>

<script>
import User from './User.vue';
import ChatMessage from './ChatMessage.vue';
import Login from './Login.vue';
import { db, storage } from '../firebase';
export default {
  components: {
    User,
    Login,
    ChatMessage,
  },
  data() {
      return {
          newMessageText: '',
          loading: false,
          messages: [],
          newAudio: null,
          recorder: null,
      }
  },
  computed: {
    chatId() {
      return this.$route.params.id;
    },
    messagesCollection() {
      return db.doc(`chats/${this.chatId}`).collection('messages');
    },
    newAudioURL() {
      return URL.createObjectURL(this.newAudio);
    }
  },
  firestore() {
    return {
      messages: this.messagesCollection.orderBy('createdAt').limitToLast(10)
    };
  },
  methods: {
    async addMessage(uid) {
        this.loading = true;
        let audioURL = null;
        const { id: messageId } = this.messagesCollection.doc();
        if (this.newAudio) {
          const storageRef = storage
            .ref('chats')
            .child(this.chatId)
            .child(`${messageId}.wav`);
            await storageRef.put(this.newAudio);
          audioURL = await storageRef.getDownloadURL();
        }
         await this.messagesCollection.doc(messageId).set({
            text: this.newMessageText,
            sender: uid,
            createdAt: Date.now(),
            audioURL
        });
        this.loading = false;
        this.newMessageText = '';
        this.newAudio = null;
    },
    async record() {
      this.newAudio = null;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
      const options = { mimeType: "audio/webm" };
      const recordedChunks = [];
      this.recorder = new MediaRecorder(stream, options);
      this.recorder.addEventListener("dataavailable", e => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      });
      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recordedChunks);
        console.log(this.newAudio);
      });
      this.recorder.start();
    },
    async stop() {
      this.recorder.stop();
      this.recorder = null;
    }
  }
};
</script>


<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  background: #efefef;
  padding: 10px;
  border-radius: 0;
}
li {
  display: flex;
}
</style>