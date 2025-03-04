import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
  Alert,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyInputSecond, MyPicker, MyPickerSecond } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';
import SweetAlert from 'react-native-sweet-alert';
import MyLoading from '../../components/MyLoading';

export default function TambahPengalaman({ navigation, route }) {


  const [kirim, setKirim] = useState({});
  const [loading, setLoading] = useState(false);
  const sendServer = () => {
    // setLoading(true);
    console.log(kirim);
    axios.post(apiURL + 'tambah_pengalaman', kirim).then(res => {
      console.log(res.data)

      setLoading(false);

      if (res.data.status == 200) {
        SweetAlert.showAlertWithOptions({
          title: MYAPP,
          subTitle: res.data.message,
          style: 'success',
          cancellable: true
        },
          callback => {

            navigation.goBack();
          });


      }
    })
  }

  useEffect(() => {
    getData('user').then(u => {
      setKirim({
        ...u,
        link_youtube: '',
        gambar: null,
      })
    })
  }, [])

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      <MyHeader title="Tambah Pengalman" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} style={{
        paddingHorizontal: 20,
      }}>

        <View style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={() => {


            launchImageLibrary({
              includeBase64: true,
              quality: 1,
              mediaType: "photo",
              maxWidth: 700,
              maxHeight: 700
            }, response => {
              console.log('All Response = ', response);

              if (!response.didCancel) {
                setKirim({
                  ...kirim,
                  gambar: `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
                });
              }


            });



          }} style={{
            width: windowWidth - 40,
            height: 220,
            borderWidth: 1,
            borderColor: Color.blueGray[200],
            overflow: 'hidden',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image style={{
              width: kirim.gambar !== null ? windowWidth - 40 : 100,
              // resizeMode: 'contain',
              height: kirim.gambar !== null ? 220 : 100,
            }} source={{
              uri: kirim.gambar !== null ? kirim.gambar : 'https://zavalabs.com/nogambar.jpg',
            }} />
          </TouchableOpacity>
        </View>



        <MyInput label="Link ID youtube" placeholder="Masukan link ID youtube" iconname="logo-youtube" value={kirim.link_youtube} onChangeText={x => setKirim({ ...kirim, link_youtube: x })} />
        <MyGap jarak={10} />
        <Text style={{
          fontFamily: fonts.primary[600],
          color: colors.black,
          marginBottom: 8,
          marginLeft: 10
        }}>Deskripsi</Text>
        <View style={{
          height: 100,
          flexDirection: 'row', // Gunakan row agar TextInput dan label bisa sejajar
          alignItems: 'center', // Align center agar teks sejajar vertikal
          borderWidth: 1,
          borderRadius: 5,
          borderColor: Color.blueGray[300],
          backgroundColor: 'white',
        }}>



          <TextInput
            textAlignVertical="top"
            placeholderTextColor={Color.blueGray[400]}
            onChangeText={x => setKirim({
              ...kirim,
              deskripsi: x
            })}
            multiline

            autoCapitalize="none"
            style={{
              ...fonts.body3,
              flex: 1, // Flex untuk mengisi ruang yang ada
              paddingLeft: 10,

              height: 100,
              color: Color.blueGray[900],
            }}
          />


        </View>
        <MyGap jarak={10} />
        {loading && <MyLoading />}

        {!loading && <MyButton warna={colors.primary} colorText={colors.white} iconColor={colors.white} onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
        <MyGap jarak={20} />
      </ScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({})