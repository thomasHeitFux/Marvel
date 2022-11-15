import * as React from 'react';
import { View, Text ,Image} from 'react-native';

export default function Comic({ name,image }) {
  return (
    <View style={{ margin:10, alignItems: 'center' }}>
      	<Image
        style={{ height: 450, width:270, borderRadius: 3 }}
         source={{uri: image}}
			/>
			<Text style={{fontSize:15,margin:15}}>{name}</Text>
    </View>
  )
}