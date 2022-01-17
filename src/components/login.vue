<template>
  <div class=""></div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data:()=>({
        username:"",
        password:"",
        email:"",
        error:""
    }),
    method:{
        ...mapActions({
            loginVue: "auth/login",
        }),
        async login(){
            try {
                await this.loginVue({
                    username: this.username,
                    password: this.password,
                });
            } catch (e) {
                this.error = e.message;
            }

        }
    },
};
</script>

<style></style>
