import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components'


export default function DestinasiWisata({navigation}) {
  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white,
    }}>
    {/*  */}
    <MyHeader title="Destinasi Wisata"/>
      <ScrollView >
    <View style={{
        padding:10,
    }}>
    

    {/* Wisata Sejarah */}

    <View style={{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center'
    }}>

    <View>
        <Text style={{
            fontFamily:fonts.primary[600],
            color:colors.primary,
            fontSize:20,

        }}>Wisata Sejarah</Text>
    </View>

    <View style={{padding:0.8, backgroundColor:colors.black, width:170}}/>

    </View>
    </View>
      </ScrollView>
    </View>
  )
}