import React, { useState, useEffect } from 'react';
import { Text, FlatList, Button, TextInput, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
 
const Stack = createStackNavigator();
 
const App = () => {
  const [produtos, setProdutos] = useState([]);
 
  useEffect(() => {
    carregarProdutos();
  }, []);
 
  const _storeData = async (codigo, nome, quantidade) => {
    try {
      const novoProduto = { codigo, nome, quantidade };
      await AsyncStorage.setItem(codigo, JSON.stringify(novoProduto));
      setProdutos([...produtos, novoProduto]);
    } catch (error) {
      alert(error);
    }
  };
 
  const _retrieveAllData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      const produtos = values.map(([key, value]) => JSON.parse(value));
      setProdutos(produtos);
    } catch (error) {
      alert(error);
    }
  };
 
  const carregarProdutos = async () => {
    await _retrieveAllData();
  };
 
  const registrarProduto = () => {
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
 
    return (
      <View>
        <TextInput placeholder='Codigo' value={codigo} onChangeText={setCodigo} />
        <TextInput placeholder='Nome' value={nome} onChangeText={setNome} />
        <TextInput placeholder='Quantidade' value={quantidade} onChangeText={setQuantidade} />
        <Button onPress={() => _storeData(codigo, nome, quantidade)} title="Salvar" />
      </View>
    );
  };
 
  const HomeScreen = ({ navigation }) => {
    return (
      <View>
        <Button onPress={() => navigation.navigate("Registrar")} title="Novo Produto" />
        <FlatList
          data={produtos}
          renderItem={({ item }) => (
            <View>
              <Text>{item.codigo}</Text>
              <Text>{item.nome}</Text>
              <Text>{item.quantidade}</Text>
            </View>
          )}
          keyExtractor={(item) => item.codigo.toString()}
        />
      </View>
    );
  };
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Registrar" component={registrarProduto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;