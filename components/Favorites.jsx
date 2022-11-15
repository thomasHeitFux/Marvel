import { FlatList, Text } from "react-native";
import * as React from 'react';
import CharacterCard from './CharacterCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'


export default function Favorites() {
    const { favorites } = useSelector((state) => state.userReducer);
    const[loading,setLoading] = useState(true)
    
    setTimeout(() => {
        setLoading(false)
    }, 1000);
    return (
      loading?<></>:
      <>
      <FlatList
          data={favorites}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
              <CharacterCard
              id={item.id}
              image={item.image}
              name={item.name} 
              />
              )}
              />
  </>
    )

}

