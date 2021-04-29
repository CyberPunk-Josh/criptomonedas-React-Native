import React , {useState, useEffect} from 'react';

import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({moneda, criptomoneda, guardarMoneda, guardarCriptoMoneda, guardarConsultarAPI}) => {

    const [criptomonedas, guardarCriptoMonedas] = useState([]);

    // guarda las selecciones del usuario:
    const obtenerMoneda = (moneda) => {
        guardarMoneda(moneda);
    }

    const obtenerCriptoMoneda = (cripto) => {
        guardarCriptoMoneda(cripto);
    }

    // Funcion para cotizar precio:
    const cotizarPrecio = () => {
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            mostrarAlerta();
            return;
        }

        // se pasa la validacion:
        // cambiar el state de consultar api:
        guardarConsultarAPI(true);
    }

    // funcion para mostrar la alerta:
    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                {text: 'Ok'}
            ]
        )
    }

    useEffect(() => {
        const consultarAPI = async () => {
            url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptoMonedas(resultado.data.Data);
        }
        consultarAPI();
    }, [])

    return ( 
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
            selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
            >
                <Picker.Item label="-- Seleccione --" value="" />
                <Picker.Item label="USD DOLLAR" value="USD" />
                <Picker.Item label="MXN PESO" value="MXN" />
                <Picker.Item label="EUR EURO" value="EUR" />
                <Picker.Item label="GBP LIBRA" value="GBP" />
            </Picker>
            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
            selectedValue={criptomoneda}
                onValueChange={cripto => obtenerCriptoMoneda(cripto)}
            >
                <Picker.Item label="-- Seleccione --" value="" />
                {criptomonedas.map( cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ))}
            </Picker>
            <TouchableHighlight
                style={styles.botonCotizar}
                onPress={ () => cotizarPrecio() }
            >
                <Text style={styles.textoCotizar} >Cotizar</Text>
            </TouchableHighlight>
        </View>
     );
};

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    },
    botonCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 15
    },
    textoCotizar: {
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})
 
export default Formulario;