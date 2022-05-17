// In App.js in a new project

import * as React from 'react';
import {View, Text, ScrollView, Button, TextInput, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {addCategory} from './src/services/firestore';

function AdminScreen({navigation}: any) {
  return (
    <ScrollView>
      <Button
        title="add category"
        onPress={() => {
          navigation.navigate('AddCategory');
        }}
      />
    </ScrollView>
  );
}

function AddCategory({navigation}: any) {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
