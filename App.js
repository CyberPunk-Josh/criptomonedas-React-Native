import React, {useState, useEffect} from 'react';
import { View, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

// components
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';



const App= () => {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptoMoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  const [resultado, guadarResultado] = useState({});

  // state para el spinner:
  const [cargando, guardarCargando] = useState(false);

  useEffect( () => {
    const cotizarCriptomoneda = async () => {
      if(consultarAPI){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);
        guardarCargando(true);
        setTimeout( () => {
          guadarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
          guardarConsultarAPI(false);
          guardarCargando(false);
        }, 2000)
      }
    }
    cotizarCriptomoneda();
  },[consultarAPI]);

  // mostrar el spinner o el resultado:
  const ComponenteResultado = cargando ? <ActivityIndicator size='large' color='#5E49E2' /> : <Cotizacion resultado={resultado}/>

  return (
    <ScrollView>
      <Header />
      <Image 
        style={styles.imagen}
        source={ require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          guardarMoneda={guardarMoneda}
          guardarCriptoMoneda={guardarCriptoMoneda}
          guardarConsultarAPI={guardarConsultarAPI}
        />
      </View>
      <View style={styles.componenteResultado}>
        {ComponenteResultado}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
  componenteResultado:{
    marginTop: 25
  }
})

export default App;
