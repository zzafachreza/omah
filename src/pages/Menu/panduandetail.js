import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { colors, fonts, windowWidth } from '../../utils';
import { MyHeader } from '../../components';
import { webURL } from '../../utils/localStorage';
import RenderHTML from 'react-native-render-html';
export default function PanduanDetail({ route }) {
  // Ambil data dari halaman sebelumnya
  const item = route.params;
  const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];


  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title="Panduan Wisata" />

      <ScrollView>
        <View style={{ padding: 10 }}>
          {/* JUDUL DARI PANDUAN WISATA */}
          <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, color: colors.primary, textAlign: "center" }}>
            {item.judul}
          </Text>

          {/* FOTO PANDUAN */}
          <Image
            source={{
              uri: webURL + item.gambar
            }}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 10,
              marginVertical: 10,
              resizeMode: 'cover',
            }}
          />

          {/* DESKRIPSI */}
          <RenderHTML

            tagsStyles={{
              p: {
                fontFamily: fonts.body3.fontFamily,
                textAlign: 'justify',
                lineHeight: 20,
              },
            }}
            systemFonts={systemFonts}
            contentWidth={windowWidth}
            source={{
              html: item.deskripsi
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
