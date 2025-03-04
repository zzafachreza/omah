import { View, Text, FlatList, Animated, TouchableNativeFeedback, TouchableOpacity, Alert, TouchableWithoutFeedback, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { MyHeader } from '../../components';
import { colors, fonts } from '../../utils';
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, getData, MYAPP, storeData, webURL } from '../../utils/localStorage';
import moment from 'moment';
import Share from 'react-native-share';
import { useToast } from 'react-native-toast-notifications';

export default function SharingPengalaman({ navigation }) {
  const animatedValues = useRef(new Map()); // Gunakan Map untuk menyimpan animasi unik per item
  const [data, setData] = useState([]);
  const [like, setLike] = useState([]);
  const [user, setUser] = useState({});
  const toast = useToast();
  const isFocused = useIsFocused();

  const __getTransaksi = () => {
    axios.post(apiURL + 'pengalaman').then(res => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getData('user').then(u => setUser(u));
    if (isFocused) {
      __getTransaksi();
      getData('like').then(ll => {
        setLike(ll || []);
      });
    }
  }, [isFocused]);

  const handleLike = (item) => {
    let tmp = [...like];

    if (tmp.includes(item.id_pengalaman)) {
      tmp = tmp.filter(id => id !== item.id_pengalaman);
    } else {
      tmp.push(item.id_pengalaman);
    }

    setLike(tmp);
    storeData('like', tmp);

    if (!animatedValues.current.has(item.id_pengalaman)) {
      animatedValues.current.set(item.id_pengalaman, new Animated.Value(1));
    }

    Animated.sequence([
      Animated.timing(animatedValues.current.get(item.id_pengalaman), {
        toValue: 1.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues.current.get(item.id_pengalaman), {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 0 }}>
      <View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 10, paddingLeft: 5 }}>
        <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={{ uri: item.file_pengguna }} />
        <View>
          <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, color: colors.primary, marginLeft: 10 }}>
            {item.nama_lengkap}
          </Text>
          <Text style={{ fontFamily: fonts.primary[400], fontSize: 12, color: colors.black, marginLeft: 10 }}>
            {moment(item.tanggal).format('DD MMMM YYYY')}
          </Text>
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        {item.link_youtube ? (
          <YoutubePlayer height={223} width={380} play={false} videoId={item.link_youtube} />
        ) : (
          <Image style={{ width: 414, height: 243, borderRadius: 10 }} source={{ uri: item.gambar }} />
        )}
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, padding: 5 }}>
        <TouchableWithoutFeedback onPress={() => handleLike(item)}>
          <Animated.View style={{ transform: [{ scale: animatedValues.current.get(item.id_pengalaman) || new Animated.Value(1) }] }}>
            <Icon
              type="ionicon"
              name={like.includes(item.id_pengalaman) ? 'heart' : 'heart-outline'}
              size={25}
              color={like.includes(item.id_pengalaman) ? 'red' : colors.primary}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableOpacity onPress={() => {
          Share.open({
            title: MYAPP,
            url: item.link_youtube ? 'https://www.youtube.com/watch?v=' + item.link_youtube : item.gambar
          }).catch(err => console.log(err));
        }}>
          <View style={{ marginLeft: 10 }}>
            <Icon type='ionicon' name='share-outline' size={25} color={colors.primary} />
          </View>
        </TouchableOpacity>

        {user && item.id_pengguna == user.id_pengguna && (
          <TouchableOpacity onPress={() => {
            Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini?', [
              { text: 'TIDAK' },
              {
                text: 'YA, HAPUS',
                onPress: () => {
                  axios.post(apiURL + 'pengalaman_delete', {
                    id_pengalaman: item.id_pengalaman
                  }).then(res => {
                    if (res.data.status == 200) {
                      toast.show(res.data.message, { type: 'success' });
                      __getTransaksi();
                    }
                  });
                }
              }
            ]);
          }}>
            <View style={{ marginLeft: 10 }}>
              <Icon type='ionicon' name='trash-outline' size={25} color={colors.primary} />
            </View>
          </TouchableOpacity>
        )}
      </View>

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
        keyExtractor={item => item.id_pengalaman.toString()} // Pastikan key valid
      />

      <TouchableNativeFeedback onPress={() => navigation.navigate('TambahPengalaman')}>
        <View style={{
          padding: 10, backgroundColor: colors.primary, borderRadius: 50,
          width: 50, height: 50, position: 'absolute', bottom: 10, right: 10
        }}>
          <Icon type='ionicon' name='add' color='white' size={30} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
