import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MyHeader, StarRating } from '../../components';

export default function UlasanDestinasi({ route }) {
  // let namaWisata = 'Nama tidak ditemukan';
  // try {
  //   const namaWisata = route?.params?.namaWisata || 'Nama tidak ditemukan';
  //   console.log("Nama Wisata:", namaWisata); 
  // } catch (error) {
  //   console.error("Error mendapatkan nama wisata:", error);
  // };

  // if (!namaWisata || namaWisata === 'Nama tidak ditemukan') {
  //   return <Text>Error: Nama wisata tidak ditemukan!</Text>;
  // };


  
  // useEffect(() => {
  //   console.log("Route Params:", route.params);
  // }, [route.params]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const onRatingPress = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    if (!rating || !comment.trim()) {
      Alert.alert("Peringatan", "Harap isi rating dan komentar sebelum mengirim ulasan.");
      return;
    }

    Alert.alert("Sukses", "Ulasan telah disimpan!");
  };

  return (
    <View style={styles.container}>
      <MyHeader title="Tambah Ulasan" />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.destinasiTitle}>Tambah Ulasan untuk </Text>

          <Text style={styles.label}>Rating :</Text>
          <StarRating rating={rating} onRatingPress={onRatingPress} />

          <Text style={styles.label}>Komentar :</Text>
          <TextInput
            style={styles.commentInput}
            multiline
            placeholder="Berikan komentar Anda"
            value={comment}
            onChangeText={setComment}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Simpan Ulasan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
  },
  destinasiTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#C2171D',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    height: 120,
    backgroundColor: '#F5F5F5',
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#C2171D',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
