import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import DestinasiCard from '../../components/DestinationCard';
import { apiURL, getData, MYAPP, storeData, webURL } from '../../utils/localStorage';
import moment from 'moment';
import Share from 'react-native-share';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
export default function DestinasiWisata({ navigation }) {



  const [data, setData] = useState([]);


  const [dataPanduan, setDataPanduan] = useState([]);
  const isFocused = useIsFocused();
  const __getTransaksi = () => {
    axios.post(apiURL + 'destinasi').then(res => {
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
      <MyHeader title="Destinasi Wisata" />
      <ScrollView>
        <View style={{
          flex: 1,
          padding: 10,
        }}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Wisata Sejarah</Text>
              <View style={styles.divider} />
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data.filter(i => i.jenis == 'Sejarah')}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <DestinasiCard
                  image={webURL + item.cover}
                  title={item.nama}
                  lokasi={item.lokasi}
                  rating={item.ratarating > 0 ? parseFloat(item.ratarating).toFixed(1) : 0}
                  reviews={item.jumlahrating}
                  onPress={() => navigation.navigate('Detail', {
                    data: item,
                    modul: 'destinasi',
                    judul: 'Destinasi Wisata'
                  })}
                />
              )}
            />
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Wisata Alam</Text>
              <View style={styles.divider} />
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data.filter(i => i.jenis == 'Alam')}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <DestinasiCard
                  image={webURL + item.cover}
                  title={item.nama}
                  lokasi={item.lokasi}
                  rating={item.ratarating > 0 ? parseFloat(item.ratarating).toFixed(1) : 0}
                  reviews={item.jumlahrating}
                  onPress={() => navigation.navigate('Detail', {
                    data: item,
                    modul: 'destinasi',
                    judul: 'Destinasi Wisata'
                  })}
                />
              )}
            />
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Wisata Rekreasi</Text>
              <View style={styles.divider} />
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data.filter(i => i.jenis == 'Rekreasi')}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <DestinasiCard
                  image={webURL + item.cover}
                  title={item.nama}
                  lokasi={item.lokasi}
                  rating={item.ratarating > 0 ? parseFloat(item.ratarating).toFixed(1) : 0}
                  reviews={item.jumlahrating}
                  onPress={() => navigation.navigate('Detail', {
                    data: item,
                    modul: 'destinasi',
                    judul: 'Destinasi Wisata'
                  })}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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