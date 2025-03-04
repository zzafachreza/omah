import { View, Text, FlatList, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import DestinasiCard from '../../components/DestinationCard';
import { apiURL, getData, MYAPP, storeData, webURL } from '../../utils/localStorage';
import moment from 'moment';
import Share from 'react-native-share';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { Icon } from 'react-native-elements';
export default function SewaTransport({ navigation }) {


  const MODUL = 'sewa';
  const JUDUL = 'Sewa Transport & Penginapan'
  const [data, setData] = useState([]);
  const [key, setKey] = useState('Sewa Transport');

  const isFocused = useIsFocused();
  const __getTransaksi = () => {
    axios.post(apiURL + MODUL).then(res => {
      console.log(res.data);
      setData(res.data)
    })
  }
  useEffect(() => {
    if (isFocused) {
      __getTransaksi()
    }
  }, [isFocused])

  return (
    <View style={styles.container}>
      <MyHeader title={JUDUL} />
      <ScrollView>
        <View style={{
          flex: 1,
          padding: 10,
        }}>

          <View style={{
            flexDirection: 'row'
          }}>
            <TouchableOpacity onPress={() => {
              setKey('Sewa Transport')
            }} style={key == 'Sewa Transport' ? styles.btn : styles.btn0}>
              <Text style={key == 'Sewa Transport' ? styles.txt : styles.txt0}>Sewa Transport</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setKey('Penginapan')
            }} style={key == 'Penginapan' ? styles.btn : styles.btn0}>
              <Text style={key == 'Penginapan' ? styles.txt : styles.txt0}>Penginapan</Text>
            </TouchableOpacity>
          </View>

          <FlatList

            data={data.filter(i => i.jenis == key)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              // <DestinasiCard
              //   image={webURL + item.cover}
              //   title={item.nama}
              //   lokasi={item.lokasi}
              //   rating={item.ratarating > 0 ? parseFloat(item.ratarating).toFixed(1) : 0}
              //   reviews={item.jumlahrating}
              //   onPress={() => navigation.navigate('Detail', {
              //     data: item,
              //     modul: 'destinasi',
              //     judul: 'Destinasi Wisata'
              //   })}
              // />
              <View style={{
                padding: 10,
                borderWidth: 1,
                borderColor: colors.primary,
                marginVertical: 10,
                borderRadius: 8,
              }}>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <Image source={{
                    uri: webURL + item.cover
                  }} style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                  }} />
                  <View style={{
                    flex: 1,
                    paddingLeft: 10,
                  }}>
                    <Text style={{
                      fontFamily: fonts.secondary[800],
                      color: colors.primary,
                    }}>{item.nama}</Text>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 4,
                    }}>
                      <Text style={{ fontFamily: fonts.secondary[400], fontSize: 12, }} >{item.ratarating > 0 ? parseFloat(item.ratarating).toFixed(1) : 0}</Text>
                      <Icon type="ionicon" name="star" size={12} color="gold" />
                      <Text style={{ fontFamily: fonts.secondary[400], fontSize: 12, }} >({item.ratarating > 0 ? parseFloat(item.jumlahrating) : 0})</Text>
                    </View>

                    <View style={{
                      marginTop: 5,
                      flexDirection: 'row',
                      alignItems: 'flex-start'
                    }}>
                      <Icon type='ionicon' name='location' color={colors.primary} size={12} />
                      <Text style={{
                        flex: 1,
                        marginLeft: 4,
                        fontSize: 12,
                      }}>{item.lokasi}</Text>

                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Detail', {
                      data: item,
                      modul: MODUL,
                      judul: JUDUL
                    })}

                      style={{
                        backgroundColor: colors.primary,
                        alignSelf: 'flex-end',
                        width: 100,
                        marginTop: 4,
                        padding: 5,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}>
                      <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: 12,
                      }}>Detail</Text>
                      <Icon type='ionicon' size={15} name='chevron-forward-circle-outline' color={colors.white} />
                    </TouchableOpacity>


                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    // marginHorizontal: 10,
    flex: 1,
  },
  txt: {
    color: colors.white,
    fontFamily: fonts.secondary[600],
    fontSize: 14,
  },

  btn0: {
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    // marginHorizontal: 10,
    flex: 1,
  },
  txt0: {
    color: colors.primary,
    fontFamily: fonts.secondary[600],
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    padding: 10,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: fonts.primary[600],
    color: colors.primary,
    fontSize: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.black,
    marginLeft: 10,
  },
});