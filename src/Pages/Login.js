import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, TouchableOpacity, StyleSheet, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, onAuthStateChanged } from '../Config/firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      navigation.navigate('Home', { idUser: userCredential.user.uid });

    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Erro', 'Email ou senha inválidos. Por favor, tente novamente.');
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
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(182, 144, 69, 0.5)"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="rgba(182, 144, 69, 0.5)"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
            <TouchableOpacity style={styles.btnLogin} onPress={LoginUser}>
              <Text style={styles.txtbtnLogin}>Login</Text>
            </TouchableOpacity>
          
            <Text 
              style={styles.txtNewuser}
              onPress={() => navigation.navigate('Cadastrar')}>
              Não possui uma conta? criar
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
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    marginBottom: -130,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginTop: 25,
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
    width: 220,
  },
  btnLogin: {
    backgroundColor: '#b69045',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 8,
    width: 220,
  },
  txtbtnLogin: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtNewuser: {
    color: '#373D20',
    fontSize: 12,
    padding: 10,
    marginTop: 10,
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
