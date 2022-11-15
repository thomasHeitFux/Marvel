import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, FlatList } from 'react-native';
import Home from './components/Home'
import Detail from './components/Detail';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Favorites from './components/Favorites';
import { Provider } from 'react-redux';
import { Store } from './Redux/store';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function HomeScreen() {
  return (
       <Drawer.Navigator
      initialRouteName="Home">
       <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Favorites" component={Favorites} />
     </Drawer.Navigator>
  );
}


export default function App() {
  return (
 <Provider store={Store}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
          headerShown: false}} /> 
        <Stack.Screen name="Detail" component={Detail}/>
      </Stack.Navigator>
    </NavigationContainer>
 </Provider>
  );
};