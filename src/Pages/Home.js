import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Importando FontAwesome5 para ícones

export default function Home ({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {/* Banner */}
      <View style={styles.banner}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7WRs_S875bpXggXPJ7A748m8J7XmKX08dQ&s' }}
          style={styles.image}
        />
        <Text style={styles.bannerText}>MAJESTOSO</Text>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Formulário */}
          <View style={styles.formContainer}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/p/AF1QipPe9P-vkmj_zpBaanW6BuB6omZHkWTDTpnWqk95=s680-w680-h510' }}
              style={styles.imagemesa}
            />
            <Text style={styles.addressText}>
              <FontAwesome5 name="map-marker-alt" size={16} color="#b69045" /> R. Dr José de Patta, 471 - Centro, Criciúma - SC, 88802-240
            </Text>
            <Text style={styles.centeredText}>
              Refine sua aparência com estilo e precisão
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Agendamento')}>
              <Text style={styles.buttonText}>Agendar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Horario')}>
              <Text style={styles.buttonText}>Ver agendamentos</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            <FontAwesome5 name="phone" size={14} color="#b69045" /> (48) 99933-2071
          </Text>
          <Text style={styles.footerText}>
            <FontAwesome5 name="envelope" size={14} color="#b69045" /> MajestosoBarbearia@gmail.com
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 20, // Ajuste para evitar corte no topo do ScrollView
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80, // Ajustando a margem superior para descer o conteúdo abaixo do banner
  },
  banner: {
    width: '100%',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginTop: 10, // Ajustado para alinhar melhor com o texto do banner
  },
  bannerText: {
    color: '#b69045',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  content: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b69045',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  imagemesa: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  addressText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: '#b69045',
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#b69045',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#b69045',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#b69045',
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