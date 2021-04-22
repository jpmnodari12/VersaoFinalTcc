<template>
  <div class="device">
    <h1 class="subheading grey--text">Dispositivos</h1>

    <v-container class="my-5">     
      <v-card flat v-for="dispositivo in dispositivos" :key="dispositivo.nome">
        <v-layout row wrap :class="`pa-4 dispositivo ${dispositivo.tipo}`">
          <v-flex xs12 md3>
            <div class="caption grey--text">Nome dispositivo</div>
            <div>{{ dispositivo.nome }}</div>
          </v-flex>
          <v-flex xs12 md3>
            <div class="caption grey--text">Tipo dispositivo</div>
            <div v-if="dispositivo.tipo">Sensoriamento</div>
            <div v-else>Controle</div>
          </v-flex>
          <v-flex xs12 md3>
            <div class="right">
                          
                <v-icon :color="'#0B090A'" v-if="dispositivo.tipo">mdi-eye</v-icon>
                <v-icon :color="'#0B090A'" v-else>mdi-lightning-bolt-outline</v-icon>
            
            </div>
          </v-flex>
        
        </v-layout>
        <v-divider></v-divider>
      </v-card>

    </v-container>
   
  </div>
</template>

<script>

export default {
  data: () => ({
    dispositivos: []
  }),
  created () {
    this.getData()
  },
  
  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`Users/${window.uid}/Dispositivos`)

      ref.on('value', snapshot => {
        const values = snapshot.val()
        this.dispositivos = Object.keys(values).map(i => values[i])
      })
    }
  }
}
</script>

<style>
.dispositivo.true{
  border-left: 4px solid #0B090A;
}
.dispositivo.false{
  border-left: 4px solid #FFFFFF;
}



</style>
