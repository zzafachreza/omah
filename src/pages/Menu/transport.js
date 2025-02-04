import { View, Text, FlatList, TouchableNativeFeedback } from 'react-native';
import React, { useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';


const data = [
  {
    id: '1',
    category: 'Transportasi',
    image: require('../../assets/asj.png'),
    shopImage: require('../../assets/toko_kue_ende.png'),
    title: 'ASJ Group',
    linklocation: 'https://maps.app.goo.gl/kYbMzBXMhZTEaCV39',
    location: 'Nusa Indah, Ratu Agung, Bengkulu City, Bengkulu',
    description: 'ASJ Group merupakan salah satu jasa penyewaan kendaraan yang ada di Kota Bengkulu. Pengalaman sudah lebih dari 10 tahun dalam melayani konsumen untuk memenuhi kebutuhan berswisata ke Kota Bengkulu.',
    videoUrl: 'https://www.youtube.com/watch?v=rjtJTE59m-U',
    reviewImages: [
      require('../../assets/riview_asj1.png'),
      require('../../assets/riview_asj2.png'),
      require('../../assets/riview_asj3.png'),
    ],
    openingHours: '06.00 - 23.00 WIB',
    priceRange: 'Mulai dari Rp300.000/hari',
    emergencyContact: '(0736) 22098',
    healthInfo: '(0736) 27070',
    reviews: [
      {
        user: 'Nizam Syahputra',
        profilePic: require('../../assets/profile_nizam.png'),
        comment: 'Kendaraannya nyaman, lengkap, bersih. Petugasnya juga ramah dan sangat membantu saat saya berada di Bengkulu.',
        rating: 5,
      },
      {
        user: 'Aldi Pratama',
        profilePic: require('../../assets/prodile_aldi.png'),
        comment: 'Harganya sangat terjangkau, bisa dengan jasa sewa supir juga apabila diperlukan. Tidak jauh dari pusat Kota Bengkulu.',
        rating: 4,
      },
    ],
  },
  {
    id: '2',
    category: 'Penginapan',
    image: require('../../assets/murcure_bengkulu.png'),
    shopImage: require('../../assets/murcure_bengkulu2.png'),
    title: 'Mercure Bengkulu',
    linklocation: 'https://maps.app.goo.gl/exMrncPZjdtmcqGVA',
    location: 'Jl. S. Parman No.27, Padang Jati, Kec. Ratu Samban, Kota Bengkulu, Bengkulu 38227',
    description: '   Mercure Bengkulu merupakan hotel berbitang 4 yang ada di Kota Bengkulu. Hotel ini menawarkan fasilitas terbaik untuk tempat Anda menginap.',
    videoUrl: 'https://www.youtube.com/watch?v=r4CihCp7GSQ',
    reviewImages: [
      require('../../assets/riview_murcure1.png'),
      require('../../assets/riview_murcure2.png'),
      require('../../assets/riview_murcure3.png'),
    ],
    openingHours: '24 Jam',
    priceRange: 'Mulai dari Rp300.000/nett',
    emergencyContact: '(0736) 22098',
    healthInfo: '(0736) 27070',
    reviews: [
      {
        user: 'Nizam Syahputra',
        profilePic: require('../../assets/profile_nizam.png'),
        comment: 'Kamar, kamar mandi bersih. Lengkap ada kolam renang untuk relax. Ada kafe juga bisa dipakai untuk meeting.',
        rating: 5,
      },
      {
        user: 'Aldi Pratama',
        profilePic: require('../../assets/prodile_aldi.png'),
        comment: 'Viewnya bagus banget pemandangan kota Bengkulu. Lokasi strategis dan mudah dijangkau oleh transportasi umum.',
        rating: 4,
      },
    ],
  },
];


const renderItem = ({ item, navigation }) => (
    <View style={{
        padding:10
    }}>
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
           <TouchableNativeFeedback 
          onPress={() => navigation.navigate(item.category === 'Transportasi' ? 'TransportDetail' : 'PenginepanDetail', { item })}>
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
    </View>
   
  );


export default function SewaTransport({ navigation }) {
     const [selectedCategory, setSelectedCategory] = useState('Transportasi');

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title="Sewa Transport & Penginapan" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
        <TouchableOpacity onPress={() => setSelectedCategory('Transportasi')}>
          <Text style={{ fontFamily: fonts.primary[600], color: selectedCategory === 'Transportasi' ? colors.primary : 'gray' }}>Sewa Transport</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('Penginapan')}>
          <Text style={{ fontFamily: fonts.primary[600], color: selectedCategory === 'Penginapan' ? colors.primary : 'gray' }}>Penginapan</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={data.filter(item => item.category === selectedCategory)}
        renderItem={({ item }) => renderItem({ item, navigation })}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
