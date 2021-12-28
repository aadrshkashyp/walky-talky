<template>
  <aside class="section">
   
   

    <div v-if="newUser">
      <h3>Sign Up for a New Account</h3>
      <a href="#" @click="newUser = false">Returning User?</a>
    </div>

    <div v-else>
      <h3>Sign In with Email</h3>
      <a href="#" @click="newUser = true">New user?</a>
    </div>

   
<div style="margin-top:25px">
<label class="ot-padding" for="email">Email</label>
    <br />
    <input  v-model="email" placeholder="youremail@here" type="email" class="input" />
</div>
    
    
    <div style="margin-top:25px">

                <label for="password">Password</label>
                <br />
                <input  v-model="password" placeholder="password" type="password" class="input" />
        
    </div>
    
   

    <br />
    <br />
    <button
      class="button is-info"
      :class="{ 'is-loading': loading }"
      @click="signInOrCreateUser()"
    >{{ newUser ? 'Sign Up' : 'Login'}}</button>

     <button style="margin-left: 20px;" class="button" @click="auth.signInAnonymously()">Sign in Anonymously</button>

    <p class="has-text-danger" v-if="errorMessage">{{ errorMessage }}</p>
  </aside>
</template>



<script>
import { auth } from '../firebase';


export default {
  data() {
    return {
      auth,
      newUser: false,
      email: '',
      password: '',
      errorMessage: '',
      loading: false
    }
  },

  methods: {
      async signInOrCreateUser() {
 
        this.loading = true;
        this.errorMessage = '';
        try {
          if (this.newUser) {
            await auth.createUserWithEmailAndPassword(this.email, this.password)
          } else {
            await auth.signInWithEmailAndPassword(this.email, this.password)
          }
        } catch (error) {
            this.errorMessage = error.message;
        }

        this.loading = false;
      }

  },
}

</script>