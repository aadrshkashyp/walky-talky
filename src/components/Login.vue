<template>



  <aside class="section">


                    <!--  Login hero -->
    

              <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
              <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                <h1 class="title-font font-medium text-3xl text-gray-900">Enjoy a Simple Walky Talky</h1>
                <p class="leading-relaxed mt-4">This is a medium-scale project that I am working on to create a chat platform that will handle both text and audio.</p>
              </div>
              <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">

                    <div v-if="newUser">
                          <h2  class="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                              <a class="text-indigo-600 mb-3 underline underline-offset-auto" href="#" @click="newUser = false">Login Now</a>
                    </div>
                              <div v-else>

                                <h2  class="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
                                    <a class="text-indigo-600 mb-3 underline underline-offset-auto" href="#" @click="newUser = true">Register Now</a>
                          </div>
            
                <div class="relative mt-4 mb-4">
                  <label for="email" class=" leading-7 text-sm text-gray-600">Email</label>
                  <input  v-model="email" placeholder="youremail@here" type="email" class="input w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
                <div class="relative mb-4">
                  <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
                  <input v-model="password" placeholder="password" type="password"  class="input w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
                <button 
                class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                :class="{ 'is-loading': loading }"
                @click="signInOrCreateUser()" 
                >
                {{ newUser ? 'Sign Up' : 'Login'}}
                </button>
                <button class="mt-2 text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg" @click="auth.signInAnonymously()">Login Anonymously</button>
                <p class="text-xs text-gray-500 mt-3" v-if="errorMessage">{{ errorMessage }}</p>
              </div>
            </div>
          </section>


          <!-- Profile Section -->

          <section>
            <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
              <div class="grid grid-cols-1 ">
                <div class="w-full max-w-lg mx-auto my-4 bg-white shadow-xl rounded-xl">
                  <img alt="team" class="flex-shrink-0 object-cover object-center w-16 h-16 mx-auto -mt-8 rounded-full shadow-xl aboslute" src="https://avatars.githubusercontent.com/u/81368991?v=4">
                  <div class="p-6 lg:text-center">
                    <h4 class="mt-5 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl "> Aadarsh Kashyap</h4>
                    <p class="mt-3 text-base leading-relaxed text-gray-500"> Expert in all aspects of WordPress website creation, including design, plug-ins, SEO, optimization, and Website Hosting implementation. Skilled in creating engaging and interactive websites. </p>
                    <p></p>
                    <div class="mt-6">
                      <a href="https://aadarshkashyap.pw/" class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">View profile </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

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