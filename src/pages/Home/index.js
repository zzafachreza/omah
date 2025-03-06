import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData, webURL } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';

import { Icon } from 'react-native-elements';
import { Linking } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const MyMenu = ({ onPress, img, label, imgStyle, labelStyle, containerStyle }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          height: 123,
          width: 106,
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.primary,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          marginTop: 10,
          ...containerStyle, // Custom styling for the container
        }}
      >
        {/* Image */}
        <Image
          source={img}
          style={{
            width: 70,
            height: 70,
            resizeMode: "contain",
            ...imgStyle, // Custom styling for the image
          }}
        />
        {/* Label */}
        <Text
          style={{
            marginTop: 10,
            fontSize: 10,
            color: colors.primary,
            textAlign: "center",
            fontFamily: fonts.primary[600],
            ...labelStyle, // Custom styling for the label
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};


export default function Home({ navigation, route }) {

  const [sliderImages, setSlider] = useState([]);

  const renderSliderItem = ({ item }) => (
    <View style={{
      width: windowWidth - 20,
      position: 'relative',
      borderRadius: 10,
      overflow: 'hidden'
    }}>
      <Image
        source={{ uri: webURL + item.gambar }}
        style={{
          // resizeMode: 'contain',
          height: 220,
          width: windowWidth - 20,
        }}
      />
    </View>
  );

  const [user, setUser] = useState({});

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
    })
  }

  const __getSlider = () => {
    axios.post(apiURL + 'slider').then(res => {
      console.log(res.data);
      setSlider(res.data);
    })
  }

  const handlePress = () => {
    // Ganti URL dengan link yang ingin kamu buka
    // Linking.openURL('https://www.alodokter.com/obat-a-z')
    //   .catch((err) => console.error('Failed to open URL', err));
    navigation.navigate('Referensi')
  };


  useEffect(() => {
    __getSlider();
    __getUser();
  }, [])
  return (
    <ImageBackground source={require('../../assets/bghome.png')} style={{
      flex: 1,
      backgroundColor: colors.white,
      width: "100%",
      height: "100%"
    }}>

      {/* HEDAER */}
      <View style={{
        padding: 10,
        backgroundColor: colors.primary,
        height: windowHeight / 3.6,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

      }}>

        <View style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <View>
            <Text style={{
              fontFamily: fonts.tertiary[300],
              color: colors.white,
              fontSize: 24,
            }}>Selamat Datang</Text>
            <Text style={{
              fontFamily: fonts.primary[500],
              color: colors.white,
              fontSize: 20,
            }}>{user.nama_lengkap}</Text>
          </View>


          <View>
            <Image style={{
              width: 80,
              height: 80,
              alignSelf: 'center'
            }} source={require('../../assets/logosplash.png')} />
          </View>
        </View>

      </View>

      {/* SLIDER */}
      <View>
        <View style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          marginTop: -80

        }}>
          <Carousel
            autoplay
            loop={true}
            // layout="stack"
            layoutCardOffset={18}
            itemWidth={windowWidth - 20}
            removeClippedSubviews={false}
            data={sliderImages}
            renderItem={renderSliderItem}
            sliderWidth={windowWidth}

          />
        </View>
      </View>


      {/* Menu */}
      <View style={{
        padding: 10,

      }}>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',

        }}>
          <MyMenu
            onPress={() => navigation.navigate('DestinasiWisata')}
            img={require('../../assets/icon_menu1.png')}
            label="Destinasi Wisata"
            backgroundColor={colors.primary}
          />

          <MyMenu
            onPress={() => navigation.navigate('OleholehUMKM')}
            img={require('../../assets/icon_menu2.png')}
            label="Oleh-oleh UMKM"
            backgroundColor={colors.primary}
          />

          <MyMenu
            onPress={() => navigation.navigate('RekomendasiKuliner')}
            img={require('../../assets/icon_menu3.png')}
            label="Rekomendasi Kuliner"
            backgroundColor={colors.primary}
          />

          <MyMenu
            onPress={() => navigation.navigate('SewaTransport')}
            img={require('../../assets/icon_menu4.png')}
            label="Sewa Transport & Penginapan"
            backgroundColor={colors.primary}
          />

          <MyMenu
            onPress={() => navigation.navigate('SharingPengalaman')}
            img={require('../../assets/icon_menu5.png')}
            label="Sharing Pengalaman"
            backgroundColor={colors.primary}
          />

          <MyMenu
            onPress={() => navigation.navigate('PanduanWisata')}
            img={require('../../assets/icon_menu6.png')}
            label="Panduan Wisata"
            backgroundColor={colors.primary}
          />
        </View>

      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({})