import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import apiParams from '../config.js';
import axios from 'axios';
import Information from './Information';
import Comics from './Comics';

const Tab = createBottomTabNavigator();



export default function Detail({ route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { ts, apikey, hash, baseURL } = apiParams;

  // ------------------------------------ Get the character by id from the api ---------------------- //
  useEffect(() => {
    axios.get(`${baseURL}/v1/public/characters/${route.params.id}`, {
      params: {
        apikey,
        ts,
        hash
      }
    })
      .then(response => setData(response.data.data.results[0]))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  return (
    <Tab.Navigator
      initialRouteName="Information"
      screenOptions={{
        activeTintColor: 'darkred'
      }}
    >
      <Tab.Screen
        name="Information"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information-circle" color={color} size={size} />
          )
        }}
      >
        {() =>
        (isLoading
          ? <ActivityIndicator size="large" color="#0000ff" />
          : <Information
            image={`${data?.thumbnail?.path}.${data.thumbnail.extension}`}
            name={data.name}
            description={data.description ? data.description : 'no description'}
          />
        )
        }
      </Tab.Screen>

      <Tab.Screen
        name="Comics"

        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          )
        }}
      >
        {() =>
        (isLoading
          ? <ActivityIndicator size="large" color="#0000ff" />
          : <Comics
            listComics={data?.comics?.items}
          />
        )
        }
      </Tab.Screen>

    </Tab.Navigator>
  );
}

