<template>
  <div>
    <h3> signup </h3>
    <form v-if="!confirmPassword" class="flex flex-col items-center"  @submit.prevent ="signUp">
      <div class="flex flex-col user">
        <label
          for="username"
          class="block text-grey-700 text-sm font-bold mb-2"
        >
          User Name
        </label>
        <input
          class="shadow apperance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight"
          type="text"
          v-model="username"
          id="username"
        />
      </div>
      <div class="flex flex-col user">
        <label
          for="email"
          class="block text-grey-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          class="shadow apperance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight"
          type="text"
          v-model="email"
          id="email"
        />
      </div>
      <div class="flex flex-col mt-10">
        <label
          for="password"
          class="block text-grey-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <input
          class="shadow apperance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight"
          type="password"
          v-model="password"
        />
      </div>
      <button class="btn-blue">Sign up</button>
    </form>
    <div v-if= "error" class="text-red-600">{{ error.message }}</div>
    <div v-if= "confirmPassword" class="w-4/12 m-auto">
      <label for="password">Code</label>
      <input class= "shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight"
      type="text"
      v-model="code"/>
      <button class="btn-blue" @click="confirmSignUp">Confirm Code</button>
    </div>
  </div>
</template>

<script>
export default {
  data:()=>({
    username:'',
    password:'',
    email:'',
    error: '',
    confirmPassword:false,
    code:''
  }),
  methods:{
    async signUp(){
      if(!this.email ||!this.password){
        return;
      }

      try {
        await this.$store.dispatch("auth/signUp",{
          email:this.email,
          password:this.password,
          username:this.username,
        });        
        this.confirmPassword = true;

      }catch(e){
        if (e.message == "User already exists"){
        console.log("1");

        }
        this.error = e;
      }
    },
    async confirmSignUp() {
      if(!this.email ||!this.password){
        return;
      }
      try {
        const {username,password,code} = this;
        await this.$store.dispatch("auth/confirmSignUp",{
          username,
          code,
        });
        await this.$store.dispatch("auth/login",{
          username,
          password,
        });
        this.$router.push("/albums");
        
      }catch(e){
        this.error = e;
      }
    }
  }
}
</script>

<style>

</style>