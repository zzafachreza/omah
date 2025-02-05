import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import DestinasiCard from '../../components/DestinationCard';

export default function DestinasiWisata({ navigation }) {
  const sejarah = [
    {
      id: '1',
      image: require('../../assets/museum_bengkulu.png'),
      shopImage: require('../../assets/museum_bengkulu_full.png'),
      title: 'Museum Bengkulu',
      linklocation: 'https://maps.app.goo.gl/DusbrqnhUvP3UaWb7',
      location: 'Jl. Pembangunan No. 8 Gading Cempaka, Jemb. Kecil Bengkulu',
      description: '  Museum Bengkulu atau Museum Negeri Bengkulu merupakan tempat penyimpanan koleksi benda-benda bersejarah dan adat budaya masing-masing suku yang terdapat di Bengkulu. Diantaranya adalah koleksi pakaian pengantin dan pakaian adat, alat-alat rumah tangga, senjata tradisional, bentuk-bentuk rumah adat, tulisan huruf Ka ga nga dan peninggalan-peninggalan masa prasejarah mulai dari masa peradaban batu sampai perunggu. Selain itu, ada peninggalan kerajinan kain tenun yang terdiri dari kain tenun masyarakat Enggano dan aneka jenis motif kain besurek.',
      videoUrl: 'https://www.youtube.com/watch?v=OC-ehaljSwI',
      reviewImages: [
        require('../../assets/riview_rm_kampung_pesisir_1.png'),
        require('../../assets/riview_rm_kampung_pesisir_2.png'),
        require('../../assets/riview_rm_kampung_pesisir_3.png'),
      ],
      openingHours: [
        { hari: 'Senin', jam: '08.00 - 15.00 WIB' },
        { hari: 'Selasa', jam: '08.00 - 15.00 WIB' },
        { hari: 'Rabu', jam: '08.00 - 15.00 WIB' },
        { hari: 'Kamis', jam: '08.00 - 15.00 WIB' },
        { hari: 'Jumat', jam: '08.00 - 15.00 WIB' },
        { hari: 'Sabtu', jam: '08.00 - 15.00 WIB' },
        { hari: 'Minggu', jam: 'Tutup' },
      ],
      priceRange: 'Rp5.000',
      emergencyContact: '(0736) 22098',
      healthInfo: '(0736) 27070',
      rating: 4.8,
      riviews: 389,
      time: "08.00 - 15.00 WIB",
      reviews: [
        {
          user: 'Nizam Syahputra',
          profilePic: require('../../assets/profile_nizam.png'),
          comment: 'Tempatnya bagus, edukatif, petugas ramah. Tempat wisata yang cocok dikunjungi jika ke Bengkulu.',
          rating: 5,
        },
        {
          user: 'Aldi Pratama',
          profilePic: require('../../assets/prodile_aldi.png'),
          comment: 'Tempatnya bagus, edukatif, petugas ramah. Tempat wisata yang cocok dikunjungi jika ke Bengkulu.',
          rating: 4,
        },
      ],
    },
    {
      id: '2',
      image: require('../../assets/fort_malborough.png'),
      title: "Fort Malborough",
      rating: 4.8,
      riviews: 389,
      time: "08.00 - 15.00 WIB"
    },
    {
      id: '3',
      image: require('../../assets/rumahtua_seokarno.png'),
      title: "Rumah Tua Soekarno",
      rating: 4.8,
      riviews: 389,
      time: "08.00 - 15.00 WIB"
    },
    {
      id: '4',
      image: require('../../assets/rumah_pengasingan.png'),
      title: "Rumah Pengasingan Bung Karno",
      rating: 4.8,
      riviews: 389,
      time: "08.00 - 15.00 WIB"
    }
  ];

  const alam = [
    {
      id: '1',
      image: require('../../assets/pantai_panjang.png'),
      title: "Pantai Panjang",
      rating: 4.8,
      riviews: 389,
      time: "08.00 - 15.00 WIB"
    },
    {
      id: '2',
      image: require('../../assets/taman_wisata.png'),
      title: "Taman Wisata Wahana Surya",
      rating: 4.8,
      riviews: 389,
      time: "08.00 - 15.00 WIB"
    },
    {
      id: '3',
      image: require('../../assets/bukit_kandis.png'),
      title: "Bukit Kandis",
      rating: 4.8,
      riviews: 389,
      time: "08.00 - 15.00 WIB"
    },
    {
      id: '4',
      image: require('../../assets/gunung_kaba.png'),
      title: "Gunung Kaba",
      rating: 4.8,
      riviews: 389,
      time: "08.00 - 15.00 WIB"
    }
  ];

  const rekreasi = [
    {
      id: '1',
      image: require('../../assets/suban_hot_springs.png'),
      title: "Suban Hot Springs",
      rating: 4.8,
      riviews: 389,
      time: "08.00 - 15.00 WIB"
    },
    {
      id: '2',
      image: require('../../assets/waterpark_bim.png'),
      title: "Water Park BIM",
      rating: 4.8,
      riviews: 389,
      time: "08.00 - 15.00 WIB"
    },
    {
      id: '3',
      image: require('../../assets/kids_funland_bengkulu.png'),
      title: "Kidz Funland Bengkulu",
      rating: 4.8,
      riviews: 389,
      time: "08.00 - 15.00 WIB"
    },
    {
      id: '4',
      image: require('../../assets/kuliner_pantai_panjang.png'),
      title: "Kuliner Pantai Panjang",
      rating: 4.8,
      riviews: 389,
      time: "08.00 - 15.00 WIB"
    }
  ];

  const renderSection = (title, data) => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.divider} />
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DestinasiCard
            image={item.image}
            title={item.title}
            rating={item.rating}
            reviews={item.riviews}
            time={item.time}
            onPress={() => navigation.navigate('DetailDestinasiWisata', {item})}
          />
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <MyHeader title="Destinasi Wisata" />
      <FlatList
        data={[1]} // FlatList utama hanya untuk mengatur struktur
        keyExtractor={(item) => item.toString()}
        renderItem={() => (
          <View style={styles.contentContainer}>
            {renderSection("Wisata Sejarah", sejarah)}
            {renderSection("Wisata Alam", alam)}
            {renderSection("Wisata Rekreasi", rekreasi)}
          </View>
        )}
      />
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