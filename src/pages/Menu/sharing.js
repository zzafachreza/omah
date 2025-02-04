import { View, Text, FlatList, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import { MyHeader } from '../../components';
import { colors, fonts } from '../../utils';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

const data = [
  {
    id: '1',
    profileImage: require('../../assets/profile_nizam.png'),
    username: 'Nizam Syahputra',
    postImage: require('../../assets/post_nizam.png'),
    caption: 'Sedang berkunjung ke salah satu pantai di Bengkulu, viewnya cakep banget!',
  },
  {
    id: '2',
    profileImage: require('../../assets/prodile_aldi.png'),
    username: 'Aldi Pratama',
    videoId: 'ydE9mFUoCH0', // Contoh video YouTube
    caption: 'Nyobain belanja di pasar tradisionalnya ternyata murah-murah dan penjualnya ramah-ramah semua.',
  },
  // Tambahkan data lain di sini
];

export default function SharingPengalaman({ navigation }) {

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      {/* Profil User */}
      <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", padding: 10 }}>
        <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={item.profileImage} />
        <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, color: colors.primary, marginLeft: 10 }}>
          {item.username}
        </Text>
      </View>

      {/* Gambar atau Video */}
      <View style={{ alignItems: 'center',}}>
        {item.videoId ? (
          <YoutubePlayer
            height={223}
            width={380}
            play={false}
            videoId={item.videoId}
          />
        ) : (
          <Image style={{ width: 414, height: 243, borderRadius: 10 }} source={item.postImage} />
        )}
      </View>

      {/* LIKE AND SHARE */}
      <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 5, padding: 5 }}>
        <TouchableNativeFeedback>
          <View>
            <Icon type='ionicon' name='heart-outline' size={25} color={colors.primary} />
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
          <View style={{ marginLeft: 10 }}>
            <Icon type='ionicon' name='share-outline' size={25} color={colors.primary} />
          </View>
        </TouchableNativeFeedback>
      </View>

      {/* CAPTION */}
      <View style={{ padding: 5 }}>
        <Text style={{ fontFamily: fonts.primary[400], fontSize: 12, textAlign: 'left' }}>{item.caption}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title="Sharing Pengalaman" />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* Tombol Tambah */}
      <View style={{ padding: 10, flexDirection: 'row', justifyContent: "flex-end" }}>
        <TouchableNativeFeedback onPress={() => navigation.navigate('TambahPengalaman')}>
          <View style={{ padding: 10, backgroundColor: colors.primary, borderRadius: 50, width: 50, height: 50 }}>
            <Icon type='ionicon' name='add' color='white' size={30} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}
