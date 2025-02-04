import { View, Text, ScrollView, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { MyHeader } from '../../components'
import { colors } from '../../utils'
import { Icon } from 'react-native-elements'

export default function SharingPengalaman({navigation}) {

  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white,
    }}>
      <MyHeader title="Sharing Pengalaman"/>

      <ScrollView>
        <View style={{
            padding:10,
        }}>

        </View>
      </ScrollView>

      <View style={{
        padding:20,
        flexDirection:'row',
        justifyContent:"flex-end",
      }}>
        <TouchableNativeFeedback>
            <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:50,
                width:50,
                height:50,
            }}>
            <Icon type='ionicon' name='add' color='white' size={30}/>
            </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
}