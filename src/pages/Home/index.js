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
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';

import { Icon } from 'react-native-elements';
import { Linking } from 'react-native';

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
          marginTop:10,
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
            fontFamily:fonts.primary[600],
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

  const sliderImages = [
    require('../../assets/slider_1.png'),
    require('../../assets/slider_2.png'),
    require('../../assets/slider_3.png'),
    require('../../assets/slider_4.png'),
    require('../../assets/slider_5.png'),
  ];

  const renderSliderItem = ({ item }) => (
    <View style={{alignItems:"center", justifyContent:"center"}}>
      <Image style={{width:350,height:218,alignSelf:"center"}} source={item}  />
    </View>
  );
  
  const [user, setUser] = useState({});

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
    })
  }

  const handlePress = () => {
    // Ganti URL dengan link yang ingin kamu buka
    // Linking.openURL('https://www.alodokter.com/obat-a-z')
    //   .catch((err) => console.error('Failed to open URL', err));
    navigation.navigate('Referensi')
  };


  useEffect(() => {
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
      padding:10,
      backgroundColor:colors.primary,
      height:200,

    }}>

    <View style={{
      padding:10,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    }}>
    <View>
      <Text style={{
        fontFamily:fonts.tertiary[300],
        color:colors.white,
        fontSize:24,
      }}>Selamat Datang</Text>
      <Text style={{
        fontFamily:fonts.primary[500],
        color:colors.white,
        fontSize:20,
      }}>Fadhlan Himawan</Text>
    </View>


    <View>
      <Image style={{
        width:82,
        height:86,
        alignSelf:'center'
      }} source={require('../../assets/logosplash.png')}/>
    </View>
    </View>

    </View>

    {/* SLIDER */}
    <View>
    <View style={{
      alignItems:"center",
      justifyContent:"center",
      padding:5,
      margin:0,
      marginTop:-80
      
    }}>
    <FlatList
      data={sliderImages}
      renderItem={renderSliderItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
    />
    </View>
    </View>


    {/* Menu */}
    <View style={{
      padding:10,
     
    }}>

    <View style={{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      flexWrap:'wrap',

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
      onPress={() => navigation.navigate('InputSwamedikasi')}
      img={require('../../assets/icon_menu3.png')}
      label="Rekomendasi Kuliner"
      backgroundColor={colors.primary}
      />

<MyMenu
      onPress={() => navigation.navigate('InputSwamedikasi')}
      img={require('../../assets/icon_menu4.png')}
      label="Sewa Transport & Penginapan"
      backgroundColor={colors.primary}
      />

<MyMenu
      onPress={() => navigation.navigate('InputSwamedikasi')}
      img={require('../../assets/icon_menu5.png')}
      label="Sharing Pengalaman"
      backgroundColor={colors.primary}
      />

<MyMenu
      onPress={() => navigation.navigate('InputSwamedikasi')}
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