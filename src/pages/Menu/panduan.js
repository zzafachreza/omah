import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import Icon from 'react-native-vector-icons/MaterialIcons';

const dataPanduan = [
  {
    id: '1',
    title: 'Rute Perjalanan yang Direkomendasikan',
    image: require('../../assets/rute_perjalanan.png'), // Sesuaikan dengan lokasi file
    description: 'Panduan ini memberikan rekomendasi rute perjalanan terbaik untuk wisatawan agar perjalanan lebih efisien dan menyenangkan.',
  },
  {
    id: '2',
    title: 'Tips dan Saran untuk Pengunjung',
    image: require('../../assets/tips_saran.png'),
    description: 'Panduan ini berisi berbagai tips agar wisata lebih hemat, mulai dari transportasi murah hingga tempat makan dengan harga terjangkau.',
  },
  // Tambahkan data lain jika perlu
];

export default function PanduanWisata({navigation}) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title="Panduan Wisata" />

      <FlatList
        data={dataPanduan}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
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
              source={item.image}
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
                fontFamily:fonts.primary[600],
                  color: colors.white,
                  
                }}
              >
                {item.title}
              </Text>

              {/* Tombol Selengkapnya */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  justifyContent:"flex-end"
                }}
               onPress={() => navigation.navigate("PanduanDetail", {
                title: item.title,
                image: item.image,
                description: item.description, // Kirim deskripsi
               })}
              >
                <Text style={{ color: colors.white, fontSize: 14, fontStyle: 'italic', fontFamily:fonts.primary[400] }}>
                  Selengkapnya
                </Text>
                <Icon name="chevron-right" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
