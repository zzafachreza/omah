import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader, MyImageUpload, MyInput, MyInputSecond } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TambahPengalaman({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* Header */}
      <MyHeader title="Tambah Pengalaman" />

      {/* Konten utama */}
      <ScrollView>
        <View style={{ padding: 20 }}>
          {/* Upload Gambar */}
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>
            Upload Gambar :
          </Text>
          <MyImageUpload style={{ marginTop: 10 }} />

          {/* Link Video */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>
              Link Video :
            </Text>
            <MyInput placeholder="Isi link video" />
          </View>

          {/* Deskripsi */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.black }}>
              Deskripsi :
            </Text>
            <TextInput
              placeholder="Isi deskripsi pengalaman"
              multiline
              style={{
                height: 150,
                borderWidth: 1,
                borderColor: colors.gray,
                borderRadius: 10,
                textAlignVertical: 'top', // Biar teks mulai dari atas
                padding: 15,
                fontSize: 14,
                backgroundColor: colors.lightGray, // Warna latar biar mirip textarea
              }}
            />
          </View>

          {/* Tombol Simpan */}
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 15,
              borderRadius: 25,
              alignItems: 'center',
              marginTop: 30,
            }}
          >
            <Text style={{ color: colors.white, fontSize: 16, fontWeight: 'bold' }}>
              Simpan
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
