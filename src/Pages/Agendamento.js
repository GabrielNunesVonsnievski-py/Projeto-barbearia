import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { database, auth, collection, addDoc, query, where, getDocs } from "../Config/firebaseconfig";

export default function Agendamento({ navigation }) {
  const [barbeiro, setBarbeiro] = useState('barbeiro1');
  const [servico, setServico] = useState('corte');
  const [local, setLocal] = useState('local1');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  const addAgendamento = async () => {
    try {
      const disponivel = await checkDisponibilidade(data, hora);
      
      if (!disponivel) {
        Alert.alert('Horário Indisponível', 'Este horário já está agendado. Por favor, escolha outro horário.');
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user is authenticated');
      }

      const agendamentoCollection = collection(database, "agendamento");
      await addDoc(agendamentoCollection, {
        barbeiro: barbeiro,
        servico: servico,
        local: local,
        data: data,
        horario: hora,
        idUser: user.uid,
      });

      Alert.alert(
        'Agendamento Confirmado!',
        `Barbeiro: ${barbeiro}\nServiço: ${servico}\nLocal: ${local}`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );

      navigation.navigate('Horario');
    } catch (error) {
      console.error("Error adding agendamento: ", error);
    }
  };

  const checkDisponibilidade = async (data, hora) => {
    try {
      const agendamentoCollection = collection(database, "agendamento");
      const q = query(agendamentoCollection, 
        where("data", "==", data),
        where("horario", "==", hora),
        where("barbeiro", "==", barbeiro) // Verifica disponibilidade para o barbeiro específico
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.empty;
    } catch (error) {
      console.error("Error checking availability: ", error);
      return false;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7WRs_S875bpXggXPJ7A748m8J7XmKX08dQ&s' }}
            style={styles.logo}
          />
          <Text style={styles.bannerText}>MAJESTOSO</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Escolha o barbeiro:</Text>
            <Picker
              selectedValue={barbeiro}
              style={styles.picker}
              onValueChange={(itemValue) => setBarbeiro(itemValue)}
            >
              <Picker.Item label="Barbeiro 1" value="barbeiro1" />
              <Picker.Item label="Barbeiro 2" value="barbeiro2" />
              <Picker.Item label="Barbeiro 3" value="barbeiro3" />
            </Picker>

            <Text style={styles.label}>Escolha o serviço:</Text>
            <Picker
              selectedValue={servico}
              style={styles.picker}
              onValueChange={(itemValue) => setServico(itemValue)}
            >
              <Picker.Item label="Corte de Cabelo" value="corte" />
              <Picker.Item label="Barba" value="barba" />
              <Picker.Item label="Corte e Barba" value="corte-barba" />
            </Picker>

            <Text style={styles.label}>Escolha o local:</Text>
            <Picker
              selectedValue={local}
              style={styles.picker}
              onValueChange={(itemValue) => setLocal(itemValue)}
            >
              <Picker.Item label="Local 1" value="local1" />
              <Picker.Item label="Local 2" value="local2" />
              <Picker.Item label="Local 3" value="local3" />
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Ex: 260624 (26/06/24)"
              onChangeText={(text) => setData(text)}
              value={data}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 1900 (19:00)"
              onChangeText={(text) => setHora(text)}
              value={hora}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => addAgendamento()}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Voltar para Home</Text>                                            
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
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
    paddingVertical: 10,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginTop: 25,
  },
  bannerText: {
    color: '#b69045',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#b69045',
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#b69045',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '100%', // Make buttons full-width
    maxWidth: 300, // Limit maximum width if needed
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Center text within buttons
  },
  input:{
    width: '90%',
    marginTop: 10,
    padding: 10, 
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#b69045',
    margin: 'auto'
  }
});
