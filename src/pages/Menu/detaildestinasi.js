import { Image, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import React, { useState, useRef } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import YoutubePlayer from "react-native-youtube-iframe";
import { Icon } from 'react-native-elements';

export default function DetailDestinasiWisata({ navigation, route }) {
    const { id, type } = route.params;

    const dataWisata = {
        sejarah: [
            {
                id: 1,
                image: require('../../assets/museum_bengkulu_full.png'),
                title: "Museum Bengkulu",
                description: `Museum Bengkulu atau Museum Negeri Bengkulu merupakan tempat penyimpanan koleksi benda-benda bersejarah dan adat budaya masing-masing suku yang terdapat di Bengkulu. Diantaranya adalah koleksi pakaian pengantin dan pakaian adat, alat-alat rumah tangga, senjata tradisional, bentuk-bentuk rumah adat, tulisan huruf Ka ga nga dan peninggalan-peninggalan masa prasejarah mulai dari masa peradaban batu sampai perunggu. Selain itu, ada peninggalan kerajinan kain tenun yang terdiri dari kain tenun masyarakat Enggano dan aneka jenis motif kain besurek.`,
                rating: 4.8,
                reviews: 389,
                imageriview: [
                    require('../../assets/riview_1.png'),
                    require('../../assets/riview_2.png'),
                    require('../../assets/riview_3.png'),
                ],
                sumber: `Sumber : https://id.wikipedia.org/wiki/Museum_Bengkulu`,
                ytId: 'OC-ehaljSwI',
                lokasi: 'Jl. Pembangunan No. 8 Gading Cempaka, Jemb. Kecil Bengkulu',
                jambuka: `
                •Senin : 08.00 - 15.00 WIB
                •Selasa : 08.00 - 15.00 WIB
                •Rabu : 08.00 - 15.00 WIB
                •Kamis : 08.00 - 15.00 WIB
                •Jumat : 08.00 - 15.00 WIB
                •Sabtu : 08.00 - 15.00 WIB
                •Minggu : Tutup
                `,
                hargaTiket: 'Rp5.000',
                kontakDarurat: '(0736) 22098',
                informasiKesehatan: '(0736) 27070',
                ulasan: [
                    {
                        nama: "Nizam Syahputra",
                        komentar: "Tempatnya bagus, edukatif, petugas ramah. Tempat wisata yang cocok dikunjungi jika ke Bengkulu."
                    },
                    {
                        nama: "Aldi Pratama",
                        komentar: "Tempatnya bagus, edukatif, petugas ramah. Tempat wisata yang cocok dikunjungi jika ke Bengkulu."
                    },
                    {
                        nama: "Nizam Syahputra",
                        komentar: "Tempatnya bagus, edukatif, petugas ramah. Tempat wisata yang cocok dikunjungi jika ke Bengkulu."
                    },
                    {
                        nama: "Aldi Pratama",
                        komentar: "Tempatnya bagus, edukatif, petugas ramah. Tempat wisata yang cocok dikunjungi jika ke Bengkulu."
                    }
                ]
            }
        ]
    };

    const wisata = dataWisata[type].find((item) => item.id === id);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const toggleReviews = () => {
        setShowAllReviews(!showAllReviews);
    };

    const navigateToAddReview = () => {
        navigation.navigate('TambahUlasan'); // Ganti dengan nama halaman tambah ulasan yang sesuai
    };

    // Data untuk FlatList
    const data = [
        { type: 'header', content: wisata }, // Header dengan informasi wisata
        { type: 'ulasan', content: showAllReviews ? wisata.ulasan : wisata.ulasan.slice(0, 2) } // Ulasan
    ];

    // Render item FlatList
    const renderItem = ({ item }) => {
        if (item.type === 'header') {
            const wisata = item.content;
            return (
                <View style={{ padding: 10 }}>
                    {/* IMAGE DAN JUDUL */}
                    <View style={{ alignItems: "center", justifyContent: "center", padding: 0 }}>
                        <Text style={{ fontFamily: fonts.primary[600], color: colors.primary, fontSize: 24, marginBottom: 10, textAlign: "center" }}>
                            {wisata.title}
                        </Text>
                        <Image style={{ width: 340, height: 191, alignSelf: "center", borderRadius: 10 }} source={wisata.image} />
                    </View>

                    {/* Riview */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 0, marginTop: 10 }}>
                        {wisata.imageriview.map((riview, index) => (
                            <Image
                                key={index}
                                source={riview}
                                style={{ width: 100, height: 59, borderRadius: 2, marginRight: 5, alignSelf: "center" }}
                            />
                        ))}
                    </View>

                    {/* Deskripsi */}
                    <View style={{ padding: 0, marginTop: 10 }}>
                        <Text style={{ fontFamily: fonts.primary[400], color: colors.black, fontSize: 15, marginBottom: 10, textAlign: "justify" }}>
                            {wisata.description}
                        </Text>
                        <Text style={{ fontFamily: fonts.primary[400], fontSize: 10, color: colors.black, textAlign: "left" }}>
                            {wisata.sumber}
                        </Text>
                    </View>

                    {/* VIDEO */}
                    <View style={{ marginTop: 20, alignItems: "center", justifyContent: "center" }}>
                        <YoutubePlayer
                            height={164}
                            width={292}
                            play={false}
                            videoId={wisata.ytId}
                            onChangeState={(event) => {
                                if (event === "ended") setIsPlaying(false);
                            }}
                        />
                    </View>

                    {/* LOKASI DAN JAM */}
                    <View style={{ padding: 5, marginTop: 20 }}>
                        {/* Lokasi */}
                        <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 10 }}>
                            <Text style={{ fontFamily: fonts.primary[500], fontSize: 15, width: 120 }}>Lokasi</Text>
                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 12, flex: 1 }}>: {wisata.lokasi}</Text>
                        </View>

                        {/* Jam Buka */}
                        <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 10 }}>
                            <Text style={{ fontFamily: fonts.primary[500], fontSize: 15, width: 120 }}>Jam Buka</Text>
                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 12, flex: 1 }}>: {wisata.jambuka}</Text>
                        </View>

                        {/* Harga Tiket */}
                        <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 10 }}>
                            <Text style={{ fontFamily: fonts.primary[500], fontSize: 15, width: 120 }}>Harga Tiket</Text>
                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 12, flex: 1 }}>: {wisata.hargaTiket}</Text>
                        </View>

                        {/* Kontak Darurat */}
                        <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 10 }}>
                            <Text style={{ fontFamily: fonts.primary[500], fontSize: 15, width: 120 }}>Kontak Darurat</Text>
                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 12, flex: 1 }}>: {wisata.kontakDarurat}</Text>
                        </View>

                        {/* Informasi Kesehatan */}
                        <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 10 }}>
                            <Text style={{ fontFamily: fonts.primary[500], fontSize: 15, width: 120 }}>Informasi Kesehatan</Text>
                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 12, flex: 1 }}>: {wisata.informasiKesehatan}</Text>
                        </View>
                    </View>

                    {/* Judul Ulasan */}
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontFamily: fonts.primary[600], fontSize: 20, color: colors.primary, marginBottom: 10 }}>
                            Ulasan
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                            <Text style={{ fontFamily: fonts.primary[500], fontSize: 16, color: colors.black, marginBottom: 10 }}>
                                {wisata.rating}
                            </Text>
                            <Icon type='ionicon' name='star' color='gold' />
                            <Text>({wisata.reviews})</Text>
                        </View>
                    </View>
                </View>
            );
        } else if (item.type === 'ulasan') {
            return (
                <View style={{ paddingHorizontal: 10 }}>
                    {item.content.map((ulasan, index) => (
                        <View key={index} style={{ marginBottom: 10 }}>
                            <Text style={{ fontFamily: fonts.primary[600], fontSize: 14, color: colors.black }}>
                                {ulasan.nama}
                            </Text>
                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 12, color: colors.black }}>
                                {ulasan.komentar}
                            </Text>
                        </View>
                    ))}
                </View>
            );
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <MyHeader title="Destinasi Wisata" />

                {/* FlatList sebagai pengganti ScrollView */}
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    ListFooterComponent={
                        <View style={{ padding: 10 }}>
                            {/* Tombol Lihat Semua */}
                            <TouchableOpacity onPress={toggleReviews}>
                                <Text style={{ fontFamily: fonts.primary[500], fontSize: 14, color: colors.primary, textAlign: "center", marginTop: 10 }}>
                                    {showAllReviews ? "Lihat Sedikit" : "Lihat Semua >"}
                                </Text>
                            </TouchableOpacity>

                            {/* Tombol Tambah Ulasan */}
                            <TouchableOpacity
                                style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 5, marginTop: 20, alignItems: "center" }}
                                onPress={navigateToAddReview}
                            >
                                <Text style={{ fontFamily: fonts.primary[600], fontSize: 16, color: colors.white }}>
                                    + Tambah Ulasan
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                    overScrollMode="never" // Nonaktifkan scroll bounce di Android
                />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({});