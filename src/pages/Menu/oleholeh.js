import { View, Text, FlatList, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';

const data = [
  {
    id: '1',
    image: require('../../assets/oleholeh_1.png'),
    title: 'Toko Kue Ende',
    location: 'Lempuing, Ratu Agung, Bengkulu City, Bengkulu',
  },
  // Tambahkan data lainnya di sini
];

export default function OleholehUMKM() {
  const renderItem = ({ item }) => (
    <View style={{
      padding: 10,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 5,
      marginBottom: 10,
    }}>
      <View style={{ flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center' }}>
        <View>
          <Image style={{
            width: 106,
            height: 106,
            borderRadius: 5
          }} source={item.image} />
        </View>

        <View style={{
          padding: 10,
          width: '63%'
        }}>
          <Text style={{
            fontFamily: fonts.primary[600],
            color: colors.primary,
          }}>{item.title}</Text>

          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Icon type='ionicon' name='location' color={colors.primary} size={12} />
            <Text style={{
              fontFamily: fonts.primary[400],
              fontSize: 10,
              left: 2
            }}>{item.location}</Text>
          </View>
        </View>
      </View>

      <View style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: -20
      }}>
        <TouchableNativeFeedback>
          <View style={{
            padding: 10,
            backgroundColor: colors.primary,
            borderRadius: 3,
          }}>
            <Text style={{
              fontFamily: fonts.primary[400],
              fontSize: 10,
              color: colors.white,
            }}>Detail</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      <MyHeader title="Oleh-oleh UMKM" />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}