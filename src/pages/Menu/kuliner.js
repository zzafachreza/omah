import { View, Text, FlatList, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';


const data = [
  {
    id: '1',
    image: require('../../assets/rm_kampung_persisir.png'), // Foto utama
    shopImage: require('../../assets/rm_kampung_persisir2.png'), // Foto toko
    title: 'RM Kampoeng Pesisir',
    linklocation:'https://maps.app.goo.gl/QKf276pkGCV1HxgJ8',
    location: 'Nusa Indah, Ratu Agung, Bengkulu City, Bengkulu',
    description: '    Toko Kue Ende merupakan salah satu tujuan wisata kuliner yang ada di Kota Bengkulu. Ada berbagai pilihan  makanan yang dapat pengunjung nikmati.',
    videoUrl: 'https://www.youtube.com/watch?v=wn8E4LfeECQ',
    reviewImages: [
      require('../../assets/riview_rm_kampung_pesisir_1.png'),
      require('../../assets/riview_rm_kampung_pesisir_2.png'),
      require('../../assets/riview_rm_kampung_pesisir_3.png'),
    ],
    openingHours: '08.00 - 21.00 WIB', // Jam Buka
    priceRange: 'Mulai dari Rp5.000 - Rp35.000', // Range Harga
    emergencyContact: '(0736) 22098', // Kontak Darurat
    healthInfo: '(0736) 27070', // Informasi Kesehatan
    
    reviews: [
      {
        user: 'Nizam Syahputra',
        profilePic: require('../../assets/profile_nizam.png'), // Foto profil pengulas
        comment: 'Makanannya enak banget, harganya murah-murah juga. Banyak pilihan makanan yang bisa dibeli oleh pengunjung.',
        rating: 5,
      },
      {
        user: 'Aldi Pratama',
        profilePic: require('../../assets/prodile_aldi.png'), // Foto profil pengulas
        comment: 'Tempatnya bagus, bersih, penjual ramah. Tempat kulliner yang cocok dikunjungi jika ke Bengkulu. ',
        rating: 4,
      },
    ],
  },
  // Tambahkan item lainnya
];
export default function RekomendasiKuliner({navigation}) {
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
        <TouchableNativeFeedback  onPress={() => navigation.navigate('KulinerDetail', {item})}>
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
      <MyHeader title="Rekomendasi Kuliner" />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}