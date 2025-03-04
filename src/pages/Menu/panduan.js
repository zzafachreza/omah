import { View, Text, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage';




export default function PanduanWisata({ navigation }) {


  const [dataPanduan, setDataPanduan] = useState([]);
  const isFocused = useIsFocused();
  const __getTransaksi = () => {
    axios.post(apiURL + 'panduan').then(res => {
      console.log(res.data);
      setDataPanduan(res.data)
    })
  }
  useEffect(() => {
    if (isFocused) {
      __getTransaksi()
    }
  }, [isFocused])
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title="Panduan Wisata" />

      <FlatList
        data={dataPanduan}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => navigation.navigate("PanduanDetail", item)}>
            <View
              style={{
                margin: 10,
                borderRadius: 15,
                overflow: 'hidden',
                backgroundColor: '#000',
              }}
            >
              {/* Gambar */}
              <Image
                source={{
                  uri: webURL + item.gambar
                }}
                style={{ width: '100%', height: 250, resizeMode: 'cover' }}
              />

              {/* Overlay untuk judul dan tombol */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  padding: 15,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: fonts.primary[600],
                    color: colors.white,

                  }}
                >
                  {item.judul}
                </Text>

                {/* Tombol Selengkapnya */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                    justifyContent: "flex-end"
                  }}

                >
                  <Text style={{ color: colors.white, fontSize: 14, fontStyle: 'italic', fontFamily: fonts.primary[400] }}>
                    Selengkapnya
                  </Text>
                  <Icon name="chevron-right" size={18} color="white" />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

        )}
      />
    </View>
  );
}
