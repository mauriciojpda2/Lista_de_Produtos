import { Text, FlatList, Button, TextInput, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

_storeData = async (userParaSalvar, listaParaSalvar) => {
  try {
    await AsyncStorage.setItem(userParaSalvar, listaParaSalvar);
  } catch (error) { alert(error) }
};

_retrieveData = async (userParaPegar) => {
  try {
    const value = await AsyncStorage.getItem(userParaPegar);
    if (value !== null) { alert(value); }
  } catch (error) { alert(error) }
};

_retrieveAllData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys)
    values.forEach(element => {
      alert(element);
    })
  } catch (error) { alert(error) }
};


const registrarProduto = () => {
  const [codigoVal, setCodigo] = useState('');
  const [nomeVal, setNome] = useState('');
  const [quantidadeVal, setQuantidade] = useState('');
  return (
    <View>
      <TextInput placeholder='Codigo' value={codigoVal} onChangeText={setCodigo} />
      <TextInput placeholder='Nome' value={nomeVal} onChangeText={setNome} />
      <TextInput placeholder='Quantidade' value={quantidadeVal} onChangeText={setQuantidade} />
      <Button onPress={() => _storeData(codigoVal, '{"Nome":"' + nomeVal + '", "Quantidade":"' + quantidadeVal + '"}')} title="Salvar" />
      <Button onPress={() => _retrieveData(codigoVal)} title="Verificar nome do produto" />
    </View>
  )
}


const home = ({ navigation }) => {
  return (
    <View>
      <Button onPress={() => navigation.navigate("Registrar")} title="Novo Prouto" />
      <FlatList
        data={??}
        renderItem={({ item }) => (
          <View>
            <Text>{??}</Text>
          </View>
        )}
      />

    </View>)
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="Registrar" component={registrarProduto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}