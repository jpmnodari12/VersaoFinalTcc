<template>
  <div class ="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
      
        <v-container
          fluid
          grid-list-lg
          v-for="dispositivo in dispositivos"
            :key="dispositivo.nome"
        >
          <v-layout row wrap>
            <v-flex xs12>
              <v-card v-if ="dispositivo.tipo"     
              class="primary"
              dark>
                <v-card-title primary-title class="justify-center align-center">
                  <div>
                    <div class="headline">{{dispositivo.nome}}</div>
                    <p></p>
                    <span>Sensoriamento</span>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="show=!show">
            <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                  </v-btn>
                </v-card-actions> 
                <v-slide-y-transition >
                  <v-list v-show="show" class="secondary black--text" >
                    <v-list-tile>
                      
                        <v-icon :color="'#cc0000'">mdi-thermometer</v-icon>
                    
                      <v-list-tile-content>
                      <v-list-tile-title>{{dispositivo.temperatura}} °C</v-list-tile-title>
                      </v-list-tile-content>   
                    </v-list-tile>
                    
                    <v-list-tile>
                      
                        <v-icon :color = "'#00fff7'">mdi-water</v-icon>
                      
                      <v-list-tile-content>
                      <v-list-tile-title>{{dispositivo.umidade}}%</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                        
                            <v-icon :color="'#0B090A'" v-if="dispositivo.presenca">mdi-account</v-icon>
                            <v-icon :color="'#0B090A'" v-else>mdi-account-off</v-icon>
                        
                        <v-list-tile-content>
                        <v-list-tile-title v-if="dispositivo.presenca">Presença detectada</v-list-tile-title>
                        <v-list-tile-title v-else> Presença não detectada</v-list-tile-title>                    
                        </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-slide-y-transition>                       
              </v-card>
              <v-card v-else color="'#FFFFFF'" class="align-center">
                <v-card-title primary-title class="justify-center align-center">
                  <div>
                    <div class="headline">{{dispositivo.nome}}</div>
                    <p></p>
                    <span>Controle</span>
                  </div>
                </v-card-title>
                  
                    <v-list>
                      
                      <v-list-tile >
                      <v-spacer></v-spacer>
                        <v-icon large :color="'#ffff00'" v-if="dispositivo.statusrede">mdi-flash</v-icon>
                        <v-icon large v-else>mdi-flash</v-icon>
                      
                      <v-list-tile-content>
                      <v-list-tile-title v-if="dispositivo.statusrede">Ligado</v-list-tile-title>
                      <v-list-tile-title v-else>Desligado</v-list-tile-title>
                      </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  
                  
                                 <v-card-actions class="justify-center">
                   
                    <v-btn     
                      outlined
                      rounded
                      class="primary"
                      v-if="dispositivo.statusrede"   
                      @click="changeButtonStateToFalse(dispositivo.id)" 
                    >
                      Desligar
                    </v-btn>
                    <v-btn     
                      outlined
                      rounded
                      class="primary"
                      v-else    
                      @click="changeButtonStateToTrue(dispositivo.id)"
                    >
                      Ligar
                    </v-btn>
                  </v-card-actions>
                </v-card>  
            </v-flex>
            
  
            
            
          </v-layout>
        </v-container>
      
    
  </div>
</template>

<script>
export default {
  data: () => ({
    show:false,
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
    },

    changeButtonStateToTrue(dispositivoID){
      const ref2 = this.$firebase.database().ref(`Dispositivos/` + dispositivoID + `/relay1`)
      ref2.set(1)},
    changeButtonStateToFalse(dispositivoID){
      const ref3 = this.$firebase.database().ref(`Dispositivos/` + dispositivoID + `/relay1`)
      ref3.set(0)
    }
    
  }
}
</script>

<style>

</style>