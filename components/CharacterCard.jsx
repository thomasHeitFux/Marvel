import * as React from 'react';
import { Text, View, Image, TouchableOpacity ,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react'
import {addFavorite,removeFav} from '../Redux/Actions';
import heart from '../assets/heart.png';
import heartFill from '../assets/heartFill.png'

export default function CharacterCard({ image, name ,id,isIn}) {

	const dispatch = useDispatch()
	const [favorite,setFavorite] = React.useState({image,name,id})
	const [isInFav,setIsInFav] = React.useState(false)
	const { favorites } = useSelector((state) => state.userReducer)
	
	useEffect(()=>{
		if (favorites.filter(e=>{e.id===id})||isIn) {
			setIsInFav(true)
		}
	},[])

	function handleFav() {
		if (favorites.find(e=>{e.id==id})) {
			alert('character already added to favorites')
		}
		else{
			setIsInFav(!isInFav)
			setFavorite({image,name,id})
			dispatch(addFavorite(favorite))
		}
	}
	function handleRemoveFav() {
		setIsInFav(!isInFav)
		dispatch(removeFav(id))
	}

	const navigation = useNavigation();
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center' }}>
			<TouchableOpacity 
			style={{  
				flexDirection: 'column', backgroundColor: '#fff', width: 300, height: 300 ,margin: 8, borderRadius: 8, alignItems:'center',flex:1 }}
				onPress={() => navigation.navigate('Detail',{id:id})}>
				<Image 
				style={{ height: 150, width: 300,flex:8, borderRadius: 3 }} 
				source={{uri:image}}
				/> 
				<Text style={{flex:2, marginLeft: 15 , color:'#000',fontSize:25,fontWeight:'bold'}}>{name}</Text>
				<TouchableOpacity style={{flex:3, borderRadius:8,padding:16,marginLeft: 15}}
				onPress={isInFav||isIn?()=>handleFav():()=>handleRemoveFav()}
				><Image 
				style={{ height: 50, width: 52,marginTop:10,flex:1, borderRadius: 3 }}
				source={isInFav?heart:heartFill}/></TouchableOpacity>
			</TouchableOpacity>
		</View>

	);
}