import React, { useState } from "react";
import { Text, StyleSheet, TextInput, View, Button, TouchableHighlight, Alert, ScrollView } from "react-native";
import DateTimePickerModal from 'react-native-datetimepicker-modal';
import shortid from "shortid";
import colors from '../colors';

const Formulario = ({ citas, setcitas, guardarMostrarFrom, guardarCitasStorage }) => {
    //Variables para el formulario
    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    const [sintomas, guardarSintomas] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const confirmarFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
        guardarFecha(date.toLocaleDateString('es-Es', opciones));
        hideDatePicker();
    };
    //Muesta u oculta el Time picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimerPicker = () => {
        setTimePickerVisibility(false);
    };
    const confirmarHora = hora => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false };
        guardarHora(hora.toLocaleDateString('es-Es', opciones));
        hideTimerPicker();
    };
    //Crear nueva cita
    const crearNuevaCita = () => {
        //Validar
        if (paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            //Falla la validacion
            mostrarAlerta();
            return;
        }

        //Crear una nueva cita
        const cita = { paciente, propietario, telefono, fecha, hora, sintomas };
        cita.id = shortid.generate();

        //console.log(cita);

        //Agregar al state
        const citasNuevo = [...citas, cita];
        setcitas(citasNuevo);

        //Pasar las nuevas citas a storage
        guardarCitasStorage(JSON.stringify(citasNuevo));

        //ocultar el formulario
        guardarMostrarFrom(false);

        //Resetear el formulario
        guardarSintomas('');
        guardarPropietario('');
        guardarPaciente('');
        guardarHora('');
        guardarFecha('');
        guardarTelefono('');
    }

    //Muestra la alerta si falla la validaci??n
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', //Titulo
            'Todos los campos son obligatorios', //mensaje
            [{
                text: 'OK' //Arreglo de botones
            }]
        )
    }
    return (
        <>
            <ScrollView style={StyleSheet.formulario}>
                <View>
                    <Text style={StyleSheet.label}>Paciente:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarPaciente(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Due??o:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarPropietario(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Tel??fono Contacto:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarTelefono(texto)}
                        keyboardType='numeric'
                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                        headerTextIOS="Elige la fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{fecha}</Text>

                </View>
                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                        headerTextIOS="Elige una Hora"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                    <Text>{hora}</Text>
                </View>
                <View>
                    <Text style={styles.label}>S??ntomas:</Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        onChangeText={texto => guardarSintomas(texto)}
                    />
                </View>
                <View>
                    <TouchableHighlight onPress={() => crearNuevaCita()}

                        style={styles.btnSubmit}>

                        <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: colors.BUTTON_COLOR,
        marginVertical: 10
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
export default Formulario;