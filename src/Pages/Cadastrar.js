import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, StyleSheet, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, onAuthStateChanged  } from '../Config/firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Cadastrar({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const NovoUsuario = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      Alert.alert('conta criada');
      navigation.navigate('Login'); 
    } catch (error) {
      //console.error('Error signing up:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7WRs_S875bpXggXPJ7A748m8J7XmKX08dQ&s' }}
          style={styles.image}
        />
        <Text style={styles.bannerText}>MAJESTOSO</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.form}>
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding": "height"}
        style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(182, 144, 69, 0.5)"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="rgba(182, 144, 69, 0.5)"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <TouchableOpacity style={styles.signUpButton} onPress={NovoUsuario}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

            <Text 
                style={styles.txtNewuser}
                onPress={() => navigation.navigate('Login')}>
                    Já possui uma conta? Logar
            </Text>
        </KeyboardAvoidingView>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Telefone: (48) 99933-2071</Text>
        <Text style={styles.footerText}>Email: MajestosoBarbearia@gmail.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: '100%',
    backgroundColor: '#000000', // Cor do banner
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5, // Ajuste o padding conforme necessário
    marginBottom: -130,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginTop:25,
  },
  bannerText: {
    color: '#b69045',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#b69045',
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: 'black',
    width: 230, // Definindo uma largura fixa para os inputs
  },
  signUpButton: {
    backgroundColor: '#b69045',
    borderRadius: 40,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    width: '100%', // Definindo uma largura fixa para os botões
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#b69045',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
