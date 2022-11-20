import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import CharacterCard from './CharacterCard';
import { Searchbar } from 'react-native-paper';
import { getCharacters, loadMore } from '../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native-web';
import theme from '../config/config';

export default function Home() {

  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(5);
  const dispatch = useDispatch()
  const { characters } = useSelector((state) => state.userReducer)


  useEffect(() => {
    dispatch(getCharacters())
    setLoading(false)
  }, []);

  function searchCharacter() {
    if (search !== '') {
      setLoading(true);
      dispatch(getCharacters(search))
      setLoading(false)
    } else {
      setLoading(true);
      dispatch(getCharacters())
      setLoading(false)
    }
  }
  const loadMoreItems = () => {
    // Alert('more')
    setOffset(offset + 5)
    dispatch(loadMore(offset))
  }

  const renderLoader = () => {
    return (
      <View style={{ marginBottom: 100 }}>
        <ActivityIndicator size="large" color="#0000ff" style={{ justifyContent: 'center', alignItems: 'center' }} />
      </View>
    )
  }

  return (
    <SafeAreaView style={{backgroundColor:theme.dark.background, color:theme.dark.color}}>
      <Searchbar style={{backgroundColor:theme.dark.background, color:theme.dark.color}}
        placeholder="Search for character..."
        onChangeText={value => setSearch(value)}
        value={search}
        onIconPress={searchCharacter}
        onSubmitEditing={searchCharacter}
      />
      {isLoading
        ? (<ActivityIndicator size="large" color="#0000ff" style={{ justifyContent: 'center', alignItems: 'center' }} />)
        : (
          <View >
            <FlatList 
              data={characters}
              keyExtractor={({ id }) => id.toString()}
              refreshing={isLoading}
              onRefresh={searchCharacter}
              onEndReachedTShreshold={0.3}
              onEndReached={loadMoreItems}
              ListFooterComponent={renderLoader}
              renderItem={({ item }) => (
                <CharacterCard
                  id={item.id}
                  image={`${item?.thumbnail?.path}.${item?.thumbnail.extension}`}
                  name={item.name} />
              )}
            />
          </View>
        )
      }
    </SafeAreaView>
  );
}