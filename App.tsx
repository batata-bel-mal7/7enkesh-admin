/* eslint-disable react-native/no-inline-styles */
// In App.js in a new project

import * as React from 'react';
import {
  ScrollView,
  Button,
  TextInput,
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ReactNativeModal} from 'react-native-modal';
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
  const [category, setGategory] = React.useState(['wearable', 'mobile']);
  const [selectedCategory, setSelectedCategory] = React.useState([
    'wearable',
    'mobile',
  ]);

  const [imagesArr, setImagesArr] = React.useState([['']]);
  const [images, setImages] = React.useState(['']);
  const [imagesrc, setImagesrc] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [ModalVisable, setModalVisable] = React.useState(false);
  const [color, setColor] = React.useState('');
  const [hexCode, setHexCode] = React.useState('');
  const [colors, setColors] = React.useState([{}]);
  const [colorIndex, setColorIndex] = React.useState(0);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [quantity, setquantity] = React.useState(0);

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
        <Text>Descreption</Text>
        <TextInput
          style={{
            borderWidth: 1,
            flex: 1,
            margin: 10,
          }}
          placeholder="Descreption"
          value={desc}
          onChangeText={setDesc}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
        }}>
        <Text>Category</Text>
        <Picker
          style={{
            borderWidth: 1,
            flex: 1,
          }}
          selectedValue={selectedCategory}
          onValueChange={itemValue => setSelectedCategory(itemValue)}>
          {category.map(item => {
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
        }}>
        <Text style={{marginRight: 15}}>Images</Text>
        <Button
          title="Add Images"
          onPress={() => {
            setModalVisable(true);
          }}
        />
        <ReactNativeModal isVisible={ModalVisable}>
          <View style={{backgroundColor: 'white'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
              }}>
              <Text>imageSrc</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  flex: 1,
                  margin: 10,
                }}
                placeholder="ImageSrc"
                value={imagesrc}
                onChangeText={setImagesrc}
              />
            </View>
            <ScrollView horizontal>
              {images.map(value => (
                <TouchableOpacity
                  onPress={() =>
                    setImages(images.filter(item => item !== value))
                  }>
                  <Text style={{marginRight: 5}}>{value}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button
              title="Add Image"
              onPress={() => {
                setImages(arr => [...arr, imagesrc]);
              }}
            />
            <Button
              title="submit"
              onPress={() => {
                if (images.length > 0) setImagesArr([...imagesArr, images]);
                setImages([]);
                setModalVisable(false);
              }}
            />
          </View>
        </ReactNativeModal>
      </View>
      <ScrollView horizontal>
        {imagesArr.map(value => (
          <Text style={{marginRight: 5}}>
            [
            {value.map(val => (
              <View>
                <Text style={{marginRight: 5}}>{val}</Text>
              </View>
            ))}
            ]
          </Text>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
        }}>
        <Text>color</Text>
        <TextInput
          style={{
            borderWidth: 1,
            flex: 1,
            margin: 10,
          }}
          placeholder="color"
          value={color}
          onChangeText={setColor}
        />
        <Text>Hex code</Text>
        <TextInput
          style={{
            borderWidth: 1,
            flex: 1,
            margin: 10,
          }}
          placeholder="Hex code"
          value={hexCode}
          onChangeText={setHexCode}
        />
        <Button
          title="Add color"
          onPress={() => {
            setColors([...colors, {color: color, Hex: hexCode}]);
            console.log(colors);
          }}
        />
      </View>
      <Text
        style={{margin: 15, color: 'black', fontSize: 16, fontWeight: '700'}}>
        Variants Complete
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
        }}>
        <Text>Color index</Text>
        <TextInput
          style={{
            borderWidth: 1,
            flex: 1,
            margin: 10,
          }}
          keyboardType="phone-pad"
          value={colorIndex.toString()}
          onChangeText={setColorIndex}
        />
        <Text>Image index</Text>
        <TextInput
          style={{
            borderWidth: 1,
            flex: 1,
            margin: 10,
          }}
          keyboardType="phone-pad"
          value={imageIndex.toString()}
          onChangeText={setImageIndex}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
        }}>
        <Text>price</Text>
        <TextInput
          style={{
            borderWidth: 1,
            flex: 1,
            margin: 10,
          }}
          keyboardType="phone-pad"
          value={price.toString()}
          onChangeText={setPrice}
        />
        <Text>quantity</Text>
        <TextInput
          style={{
            borderWidth: 1,
            flex: 1,
            margin: 10,
          }}
          keyboardType="phone-pad"
          value={quantity.toString()}
          onChangeText={setquantity}
        />
      </View>
      <Button title="add" />
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
