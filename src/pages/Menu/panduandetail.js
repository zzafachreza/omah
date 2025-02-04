import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';

export default function PanduanDetail({ route }) {
  // Ambil data dari halaman sebelumnya
  const { title, image, description } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title="Panduan Wisata" />

      <ScrollView>
        <View style={{ padding: 10 }}>
          {/* JUDUL DARI PANDUAN WISATA */}
          <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, color: colors.primary, textAlign:"center" }}>
            {title}
          </Text>

          {/* FOTO PANDUAN */}
          <Image
            source={image}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 10,
              marginVertical: 10,
              resizeMode: 'cover',
            }}
          />

          {/* DESKRIPSI */}
          <Text
            style={{
              fontFamily: fonts.primary[500],
              fontSize: 12,
              textAlign: 'justify',
            }}
          >
            {description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
