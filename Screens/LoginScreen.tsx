import { Alert, Button, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/Config'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function LoginScreen({ navigation }: any) {
  const [correo, setcorreo] = useState('')
  const [contrasenia, setcontrasenia] = useState('')

  const [ver, setver] = useState(false)

  const [correoRestablecer, setCorreoRestablecer] = useState('')

  const defaultImage = 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-male-icon.png'

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Welcome')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let titulo
        let mensaje

        switch (errorCode) {
          case 'auth/wrong-password':
            titulo = 'Error en la contrasenia'
            mensaje = 'Contraseña incorrecta. Verificar'
            limpiar()
            break;
          case 'auth/user-not-found':
            titulo = 'Usuario no encontrado'
            mensaje = 'Por favor verificar el email ingresado'
            limpiar()
            break;
          case 'auth/internal-error':
            titulo = 'Error interno'
            mensaje = 'Error inesperado del servidor de autenticación.'
            limpiar()
            break;
          default:
            titulo = 'Error'
            mensaje = 'Verificar credenciales'
            limpiar()
            break;
        }

        Alert.alert(titulo, mensaje)
      });
  }
  function restablecer() {
    sendPasswordResetEmail(auth, correoRestablecer)
      .then(() => {
        Alert.alert('¡Listo!', 'Por favor, revise su correo electronico')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage)
      });
  }
  function limpiar() {
    setcontrasenia('')
    setcorreo('')
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.h1LogReg}>LoginScreen</Text>
      <Image source={{ uri: defaultImage }} style={styles.image} />
      <TextInput placeholder='Ingresa correo' style={styles.input} onChangeText={(texto) => setcorreo(texto)} value={correo} />
      <TextInput placeholder='Ingresa contraseña' style={styles.input} onChangeText={(texto) => setcontrasenia(texto)} value={contrasenia} />
      <Button title='Login' onPress={() => login()} />
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.txtlink}>Crear una cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setver(true)}>
        <Text style={styles.txtlink}>Olvidaste la contraseña? Da clic aquí</Text>
      </TouchableOpacity>
      <Modal visible={ver}>
        <View>
          <TextInput placeholder='Ingresar correo' onChangeText={(texto) => setCorreoRestablecer(texto)} />
          <Button title='Enviar' onPress={() => restablecer()} />
          <Button title='Cerrar' onPress={() => setver(false)} />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,

  },
  contenedorbtn: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center'
  },
  btnGalCam: {
    width: 120,
    height: 44,
    backgroundColor: '#1fc165',
    borderRadius: 16,
  },
  txtbtn: {
    textAlign: 'center',
    marginTop: 10,
    color: 'white',
    fontSize: 16
  },
  h1LogReg: {
    color: 'black',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  input: {
    height: 68,
    color: 'white',
    fontSize: 30,
    borderColor: 'white',
    marginBottom: 10,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor: '#1fc165',
    marginTop: 10
  },
  h1btn: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center'
  },
  txtlink: {
    fontSize: 16,
    color: '#129149',

  },
  btnRegLog: {
    width: '40%',
    backgroundColor: '#129149',
    borderRadius: 16,
    padding: 10,
    marginTop: 40,
    alignSelf: 'center'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: '#129149'
  },
})