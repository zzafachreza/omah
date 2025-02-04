import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { Icon } from 'react-native-elements';

export default function TambahKomentarKuliner({ route, navigation })  {
  const { title } = route.params; // Ambil judul toko dari route.params
  const [rating, setRating] = useState(0); // State untuk menyimpan rating
  const [comment, setComment] = useState(''); // State untuk menyimpan komentar

  // Fungsi untuk menangani klik bintang
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  // Fungsi untuk menangani tombol tambah ulasan
  const handleTambahUlasan = () => {
    if (rating === 0 || comment.trim() === '') {
      alert('Harap berikan rating dan komentar terlebih dahulu.');
      return;
    }
    // Simpan ulasan (bisa disimpan ke state global, database, atau API)
    const newReview = {
      user: 'Pengguna Baru', // Ganti dengan nama pengguna yang login
      profilePic: require('../../assets/profile_default.png'), // Foto profil default
      comment: comment,
      rating: rating,
    };
    console.log('Ulasan Baru:', newReview); // Contoh: Tampilkan di console
    navigation.goBack(); // Kembali ke halaman sebelumnya
  };

  return (
    <View style={styles.container}>
      <MyHeader title="Tambah Ulasan" />
      <ScrollView>
        <View style={styles.contentContainer}>
          {/* JUDUL TOKO */}
          <Text style={styles.tokoTitle}>{title}</Text>

          {/* KASIH RATING */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Berikan Rating:</Text>
            <View style={styles.starContainer}>
              {[...Array(5)].map((_, index) => (
                <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
                  <Icon
                    name={index < rating ? 'star' : 'star-border'}
                    size={30}
                    color={index < rating ? 'gold' : colors.gray}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* TAMBAH KOMENTAR */}
          <Text style={styles.commentLabel}>Tambah Komentar:</Text>
          <TextInput
            style={styles.commentInput}
            multiline
            placeholder="Tulis komentar Anda di sini..."
            value={comment}
            onChangeText={setComment}
          />

          {/* TOMBOL TAMBAH ULASAN */}
          <TouchableOpacity style={styles.tambahUlasanButton} onPress={handleTambahUlasan}>
            <Text style={styles.tambahUlasanText}>Tambah Ulasan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    padding: 10,
  },
  tokoTitle: {
    fontFamily: fonts.primary[600],
    fontSize: 20,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  ratingContainer: {
    marginBottom: 20,
  },
  ratingText: {
    fontFamily: fonts.primary[500],
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  commentLabel: {
    fontFamily: fonts.primary[500],
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },
  commentInput: {
    fontFamily: fonts.primary[400],
    fontSize: 14,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    padding: 10,
    height: 150,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  tambahUlasanButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  tambahUlasanText: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.white,
  },
});

