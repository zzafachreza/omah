import { View, Text, FlatList, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';


const data = [
  {
    id: '1',
    image: require('../../assets/oleholeh_1.png'), // Foto utama
    shopImage: require('../../assets/toko_kue_ende.png'), // Foto toko
    title: 'Toko Kue Ende',
    linklocation:'https://maps.app.goo.gl/HwUeFm2xpuRa4sx58',
    location: 'Lempuing, Ratu Agung, Bengkulu City, Bengkulu',
    description: '       Toko Kue Ende merupakan salah satu toko oleh-oleh yang dikelola oleh UMKM di Kota Bengkulu. Ada berbagai pilihan oleh-oleh makanan yang dapat pengunjung beli.',
    videoUrl: 'https://www.youtube.com/watch?v=QBAEZP2GFHA',
    reviewImages: [
      require('../../assets/riview_tokokueende_1.png'),
      require('../../assets/riview_tokokueende_2.png'),
      require('../../assets/riview_tokokueende_3.png'),
    ],
    openingHours: '08.00 - 21.00 WIB', // Jam Buka
    priceRange: 'Mulai dari Rp30.000 - Rp100.000', // Range Harga
    emergencyContact: '(0736) 22098', // Kontak Darurat
    healthInfo: '(0736) 27070', // Informasi Kesehatan
    
    reviews: [
      {
        user: 'Nizam Syahputra',
        profilePic: require('../../assets/profile_nizam.png'), // Foto profil pengulas
        comment: 'Makanannya enak banget, harganya murah-murah juga. Banyak pilihan oleh-oleh yang bisa dibeli oleh pengunjung.',
        rating: 5,
      },
      {
        user: 'Aldi Pratama',
        profilePic: require('../../assets/prodile_aldi.png'), // Foto profil pengulas
        comment: 'Tempatnya bagus, bersih, penjual ramah. Tempat oleh-oleh yang cocok dikunjungi jika ke Bengkulu. ',
        rating: 4,
      },
    ],
  },
  // Tambahkan item lainnya
];
export default function OleholehUMKM({navigation}) {
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
        <TouchableNativeFeedback  onPress={() => navigation.navigate('OleholehUMKMDetail', { item })}>
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