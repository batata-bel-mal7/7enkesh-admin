/* eslint-disable react-native/no-inline-styles */
// In App.js in a new project

import * as React from 'react';
import {ScrollView, Button, TextInput, Alert, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {addCategory} from './src/services/firestore';
import {Picker} from '@react-native-picker/picker';

function AdminScreen({navigation}: any) {
  return (
    <ScrollView>
      <Button
        title="add category"
        onPress={() => {
          navigation.navigate('AddCategory');
        }}
      />
      <Button
        title="add product"
        onPress={() => {
          navigation.navigate('AddProduct');
        }}
      />
    </ScrollView>
  );
}

const AddProduct = () => {
  const [name, setName] = React.useState('');
  const [selectedBrand, setSelectedBrand] = React.useState();
  const [brands, setBrands] = React.useState(['samsung', 'apple']);
  // const [images, setImages] = React.useState([]);
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
        }}>
        <Text>Name</Text>
        <TextInput
          style={{
            borderWidth: 1,
            flex: 1,
            margin: 10,
          }}
          placeholder="name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
        }}>
        <Text>brand</Text>
        <Picker
          style={{
            borderWidth: 1,
            flex: 1,
          }}
          selectedValue={selectedBrand}
          onValueChange={itemValue => setSelectedBrand(itemValue)}>
          {brands.map(item => {
            return <Picker.Item value={item} label={item} />;
          })}
        </Picker>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
        }}>
        <Text>brand</Text>
        <Picker
          style={{
            borderWidth: 1,
            flex: 1,
          }}
          selectedValue={selectedBrand}
          onValueChange={itemValue => setSelectedBrand(itemValue)}>
          {brands.map(item => {
            return <Picker.Item value={item} label={item} />;
          })}
        </Picker>
      </View>

      <ScrollView horizontal></ScrollView>
      <Button title="add" onPress={() => {}} />
    </ScrollView>
  );
};

function AddCategory() {
  const [category, setCategory] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  return (
    <ScrollView>
      <TextInput
        placeholder="category name"
        value={category}
        onChangeText={setCategory}
      />
      <Button
        title="add"
        onPress={() => {
          if (loading) return;
          addCategory({name: category}).then(() => {
            setLoading(false);
            Alert.alert('success');
          });
        }}
      />
    </ScrollView>
  );
}
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="AddCategory" component={AddCategory} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
