import React , {useState }from 'react'

import {Text, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Formulario = () => {

    const [moneda, guardarMoneda] = useState('');
    const [criptomoneda, guardarCriptoMoneda] = useState('');

    const obtenerMoneda = (moneda) => {
        guardarMoneda(moneda);
    }

    return ( 
        <View
            selectedValue={moneda}
            onValueChange={moneda => obtenerMoneda(moneda)}
        >
            <Text style={styles.label}>Moneda</Text>
            <Picker>
                <Picker.Item label="-- Seleccione --" value="" />
                <Picker.Item label="USD DOLLAR" value="USD" />
                <Picker.Item label="MXN PESO" value="MXN" />
                <Picker.Item label="EUR EURO" value="EUR" />
                <Picker.Item label="GBP LIBRA" value="GBP" />
            </Picker>
            <Text style={styles.label}>Criptomoneda</Text>
        </View>
     );
};

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    }
})
 
export default Formulario;