
import { Text, View,Image } from 'react-native';
import React, { useState, useEffect } from 'react';


export default function Information({ image, name, description }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image 
         style={{ flex:3,minHeight: 300, minWidth:270, borderRadius: 3 }}
          source={{uri: image}}
        />
        <Text style={{flex:2,fontSize:30}}>{name}</Text>
        <Text style={{flex:3,fontSize:13}}>{description}</Text>
      </View>
    )
  }