import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import YoutubePlayer from "react-native-youtube-iframe";
import { Icon } from 'react-native-elements';

const OleholehUMKMDetail = ({ route, navigation }) => {
  const { item } = route.params || {};
    console.log("Data yang diterima di KulinerDetail:", route.params);
    console.log("Title di DetailKuliner:", item?.title);
  
  // Fungsi untuk membuka Google Maps
  const openGoogleMaps = async () => {
    const url = item.linklocation; // Ambil link dari data toko
    console.log('Mencoba membuka link:', url);

    // Periksa apakah link bisa dibuka
    const supported = await Linking.canOpenURL(url);
    console.log('Apakah link didukung?', supported);

    if (supported) {
      // Buka link
      await Linking.openURL(url);
    } else {
      alert('Tidak dapat membuka Google Maps. Pastikan aplikasi Google Maps terinstal.');
    }
  };

  const data = [
    { type: 'header', title: 'Oleh-oleh UMKM' },
    { type: 'title', text: item.title }, // Judul dari data yang dipilih
    { type: 'image', source: item.shopImage }, // Foto toko dari data yang dipilih
    { type: 'reviewImages', sources: item.reviewImages }, // Foto review dari data yang dipilih
    { type: 'description', text: item.description }, // Deskripsi dari data yang dipilih
    { type: 'video', videoId: item.videoUrl.split('v=')[1] }, // Video dari data yang dipilih
    { type: 'info', label: 'Lokasi', value: item.location, onPress: openGoogleMaps }, // Lokasi dari data yang dipilih (bisa diklik)
    { type: 'info', label: 'Jam Buka', value: item.openingHours }, // Jam Buka dari data yang dipilih
    { type: 'info', label: 'Range Harga', value: item.priceRange }, // Range Harga dari data yang dipilih
    { type: 'info', label: 'Kontak Darurat', value: item.emergencyContact }, // Kontak Darurat dari data yang dipilih
    { type: 'info', label: 'Informasi Kesehatan', value: item.healthInfo }, // Informasi Kesehatan dari data yang dipilih
    { type: 'reviews', reviews: item.reviews }, // Ulasan dari data yang dipilih
  ];

  const renderStars = (rating) => {
    return (
      <View style={styles.starContainer}>
        {[...Array(5)].map((_, index) => (
          <Icon 
            key={index} 
            name={index < rating ? 'star' : 'star-border'} 
            size={14} 
            color='gold' 
          />
        ))}
      </View>
    );
  };
  const titleObject = data.find(d => d.type === 'title'); // Cari yang type-nya 'title'
  const title = titleObject ? titleObject.text : "Judul Tidak Tersedia"; // Ambil text-nya
  console.log("🔥 TITLE yang dikirim:", title); // Debugging
  
  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return <MyHeader title={item.title} />;
      case 'title':
        return (
          <Text style={styles.titleText}>{item.text}</Text>
        );
      case 'image':
        return (
          <Image style={styles.image} source={item.source} />
        );
      case 'reviewImages':
        return (
          <View style={styles.reviewContainer}>
            {item.sources.map((source, index) => (
              <Image key={index} style={styles.reviewImage} source={source} />
            ))}
          </View>
        );
      case 'description':
        return (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{item.text}</Text>
          </View>
        );
      case 'video':
        return (
          <View style={styles.videoContainer}>
            <YoutubePlayer height={164} width={292} play={false} videoId={item.videoId} />
          </View>
        );
      case 'info':
        // Hanya lokasi yang bisa diklik
        if (item.label === 'Lokasi') {
          return (
            <TouchableOpacity onPress={item.onPress} style={styles.infoContainer}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>: {item.value}</Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>: {item.value}</Text>
            </View>
          );
        }
      case 'reviews':
        return (
          <View style={styles.reviewsContainer}>
            <View style={{
              flexDirection:"row",
              justifyContent:"flex-start",
              alignItems:"center"
            }}>
              <Text style={styles.reviewsTitle}>Ulasan</Text>
              <View style={{ padding:0.5, backgroundColor:colors.black, width:'100%', top:-5, left:10}}/>
            </View>
            {item.reviews.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <Image source={require('../../assets/profile_nizam.png')} style={styles.profilePic} />
                <View style={styles.reviewContent}>
                  <Text style={styles.reviewName}>{review.user}</Text>
                  {renderStars(review.rating)}
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              </View>
            ))}
            <TouchableOpacity onPress={() => navigation.navigate('UlasanOleholeh', { 
            title,  
            reviews: item?.reviews
           })} style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
              <Icon style={{top:2}} type='ionicon' name='chevron-forward-outline'/>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  titleText: { fontFamily: fonts.primary[600], color: colors.primary, fontSize: 20, textAlign: 'center', padding: 10 },
  image: { width: 340, height: 191, alignSelf: 'center', marginTop: 10 },
  reviewContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 10 },
  reviewImage: { width: 100, height: 59, borderRadius: 5 },
  descriptionContainer: { marginTop: 10, padding: 10 },
  descriptionText: { fontFamily: fonts.primary[400], color: colors.black, fontSize: 12, textAlign: 'justify' },
  videoContainer: { padding: 10, marginTop: 10, alignItems: 'center', marginBottom:20 },
  infoContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, paddingHorizontal: 10 },
  infoLabel: { fontFamily: fonts.primary[40], fontSize: 12, width: 120 },
  infoValue: { fontFamily: fonts.primary[400], fontSize: 12, flex: 1, left:0 },
  reviewsContainer: { padding: 10, marginTop: 10 },
  reviewsTitle: { fontFamily: fonts.primary[600], fontSize: 18, color: colors.black, marginBottom: 10 },
  reviewItem: { flexDirection: 'row', marginBottom: 10, padding: 10, backgroundColor: colors.lightGray, borderRadius: 5 },
  profilePic: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  reviewContent: { flex: 1 },
  starContainer: { flexDirection: 'row', marginVertical: 5 },
  reviewComment: { fontFamily: fonts.primary[400], fontSize: 12, textAlign: 'justify' },
  reviewName: { fontFamily: fonts.primary[600], fontSize: 14, color:colors.primary },
  seeAllButton: {alignItems:"center", flexDirection:"row",justifyContent:"center"}
});

export default OleholehUMKMDetail;