<template>
  <v-app class="grey lighten-4">
    <Navbar v-if="isLogged"/>

    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
    
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: { Navbar},
  name: 'App',
  data: () => ({ isLogged: false }),
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      //usa o listener para verificar auteração no estado da autenticação
      //Caso verifique existencia do usuário, altera estado de isLogged
      window.uid = user ? user.uid : null 
      this.isLogged = !!user

      //ta logado? é roteado para componente home, caso não é roteado para componente login
      this.$router.push({ name: window.uid ? 'dashboard' : 'Login' })

    })
  }
}
</script>
