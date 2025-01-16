import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/Config'
import { TextInput } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker';



export default function RegisterScreen() {
  const [correo, setcorreo] = useState('')
  const [contrasenia, setcontrasenia] = useState('')

  const [image, setImage] = useState<string | null>(null);

  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7gUu-g89_eju6qtZSvsM5mssZbFfcEKyJSQ&s'

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let titulo
        let mensaje

        switch (errorCode) {
          case 'auth/email-already-exists':
            titulo = 'Error en el correo'
            mensaje = 'El correo ya está en uso'
            limpiar()
            break;
          case 'auth/invalid-argument':
            titulo = 'Error'
            mensaje = 'Argumento no válido proporcionado.'
            limpiar()
            break;
          case 'auth/invalid-credential':
            titulo = 'Error inesperado'
            mensaje = 'La credencial no es válida para la acción deseada.'
            limpiar()
            break;
          default:
            titulo = 'Error'
            mensaje = 'Verificar credenciales'
            limpiar()
            break;
        }

        Alert.alert(titulo, mensaje)
      })
  }
  function limpiar() {
    setcontrasenia('')
    setcorreo('')
  }

  //Galería
  const pickImageGal = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //Cámara
  const pickImageCam = async () => {

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.h1LogReg}>REGISTRO</Text>
      <Image source={{ uri: image || defaultImage }} style={styles.image}/>
      <TextInput
        placeholder='Ingresar correo'
        style={styles.input}
        onChangeText={(texto) => setcorreo(texto)}
        value={correo}
        placeholderTextColor={'#4ed086'}
      />
      <TextInput
        placeholder="Ingresar contraseña"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(texto) => setcontrasenia(texto)}
        value={contrasenia}
        placeholderTextColor={'#4ed086'}
      />
      <View style={styles.contenedorbtn}>
        <TouchableOpacity onPress={pickImageGal} style={styles.btnGalCam}>
          <Text style={styles.txtbtn}>Abrir Galería</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImageCam} style={styles.btnGalCam}>
          <Text style={styles.txtbtn}>Abrir Cámara</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => registro()} style={styles.btnRegLog}>
        <Text style={styles.h1btn}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor:{
    flex:1,
    padding:20,
  },
  contenedorbtn:{
    width:'100%',
    flexDirection:'row',
    gap:10,
    justifyContent:'center'
  },
  btnGalCam:{
    width:120,
    height:44,
    backgroundColor:'#1d9551',
    borderRadius:16,
  },
  txtbtn:{
    textAlign:'center',
    marginTop:10,
    color:'white',
    fontSize:16
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
    backgroundColor: '#118d47',
    marginTop:10
  },
  h1btn: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center'
  },
  btnRegLog: {
    width: '40%',
    backgroundColor: '#118d47',
    borderRadius: 16,
    padding: 10,
    marginTop:40,
    alignSelf:'center'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius:100,
    alignSelf:'center',
    borderWidth:4,
    borderColor:'#118d47'
  },
})
