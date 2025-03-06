import { Alert, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, colors, fonts, windowWidth } from '../../utils';
import { MyButton, MyGap, MyHeader, MyLoading } from '../../components';
import { apiURL, getData, MYAPP, webURL } from '../../utils/localStorage';
import moment from 'moment';
import Share from 'react-native-share';
import YoutubePlayer from "react-native-youtube-iframe";
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import RenderHTML from 'react-native-render-html';
import Modal from 'react-native-modal';
import 'intl';
import 'intl/locale-data/jsonp/id';
import { Icon } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { useToast } from 'react-native-toast-notifications';
import ImageViewer from 'react-native-image-zoom-viewer';
import StarRating from 'react-native-star-rating-widget';
import { TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
export default function Detail({ navigation, route }) {

    const [isModalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const systemFonts = [fonts.body3.fontFamily, fonts.headline4.fontFamily];

    const ITEM = route.params;
    const item = route.params.data;
    const HARGA = ITEM.modul == 'destinasi' ? `Rp ${new Intl.NumberFormat().format(item.tiket)} (Tiket Masuk)` : item.harga;
    const [user, setUser] = useState({});
    const [kirim, setKirim] = useState({
        modul: ITEM?.modul || '', // Pastikan ITEM.modul ada, jika tidak gunakan string kosong
        fid_modul: ITEM ? item[`id_${ITEM.modul}`] : '', // Hindari error jika ITEM undefined
        keterangan: '', // Default string kosong
        nilai: 1, // Default nilai 1

    });


    const __getRatingStar = async () => {
        setLoading(true);
        getData('user').then(u => {
            axios.post(apiURL + 'rating', {
                fid_modul: item[`id_${ITEM.modul}`],
                modul: ITEM.modul,
                fid_pengguna: u.id_pengguna,
            }).then(res => {

                setData(res.data);

                let totalNilai = res.data.reduce((acc, item) => acc + parseFloat(item.nilai), 0);
                let rataRata = res.data.length > 0 ? totalNilai / res.data.length : 0;

                // Bulatkan ke 1 angka di belakang koma
                rataRata = parseFloat(rataRata.toFixed(1));

                setRATING({
                    nilai: rataRata,
                    ulasan: res.data.length
                });

                setTimeout(() => {
                    setLoading(false)
                }, 1000)

            })
        })
    }
    const [RATING, setRATING] = useState({
        nilai: 0,
        ulasan: 0
    });


    const [data, setData] = useState([
        {
            nama_lengkap: webURL + item.cover,
            nilai: 3,
            nama: 'Hasan Al Latif',
            keterangan: 'Tempatnya bagus, edukatif, petugas ramah. Tempat wisata yang cocok dikunjungi jika ke Bengkulu. '
        },
        {
            nama_lengkap: webURL + item.cover,
            nilai: 2,
            nama: 'Hasan Al Latif',
            keterangan: 'Tempatnya bagus, edukatif, petugas ramah. Tempat wisata yang cocok dikunjungi jika ke Bengkulu. '
        }
    ]);


    const __renderItem = ({ item, index }) => {
        return (
            <View style={{
                marginVertical: 8,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Image style={{
                        width: 40,
                        height: 40,
                        borderRadius: 25,
                    }} source={{
                        uri: item.file_pengguna,

                    }} />
                    <View style={{
                        paddingLeft: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                            color: colors.primary
                        }}>{item.nama_lengkap}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* Bintang emas berdasarkan item.nilai */}
                            {Array.from({ length: item.nilai }, (_, i) => (
                                <Icon key={`gold-${i}`} type="ionicon" name="star" size={15} color="gold" />
                            ))}

                            {/* Bintang abu-abu (sisa dari 5) */}
                            {Array.from({ length: 5 - item.nilai }, (_, i) => (
                                <Icon key={`grey-${i}`} type="ionicon" name="star" size={15} color="grey" />
                            ))}

                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 10,
                                color: Color.blueGray[400],
                                left: 10,
                            }}> {moment(item.tanggal + ' ' + item.jam, 'YYYY-MM-DD HH:mm:ss').fromNow()}</Text>
                        </View>
                    </View>
                </View>
                <Text style={{
                    marginTop: 4,
                    fontFamily: fonts.secondary[400],
                    fontSize: 12,
                    color: colors.black
                }}>{item.keterangan}</Text>
                {item.id_pengguna == user.id_pengguna &&
                    <TouchableOpacity onPress={() => {
                        Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                            {
                                text: 'Tidak',
                            },
                            {
                                text: 'Ya, Hapus',
                                onPress: () => {
                                    console.log(item.id_rating);
                                    axios.post(apiURL + 'rating_delete', {
                                        id_rating: item.id_rating
                                    }).then(res => {
                                        console.log(res.data)
                                        if (res.data.status == 200) {
                                            toast.show(res.data.message, {
                                                type: 'success'
                                            });
                                            __getRatingStar();
                                        }

                                    })
                                }
                            }
                        ])
                    }}>
                        <Text style={{
                            textAlign: 'right',
                            fontFamily: fonts.secondary[400],
                            fontSize: 12,
                            color: Color.blueGray[400],
                        }}>Hapus</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    useEffect(() => {
        __getRatingStar();
        getData('user').then(u => {
            setUser(u);
            setKirim({
                ...kirim,
                fid_pengguna: u.id_pengguna
            })
        })
    }, []);

    const toast = useToast();

    const sendServer = () => {
        setLoading2(true);
        axios.post(apiURL + 'rating_add', {
            ...kirim,
            fid_pengguna: user.id_pengguna
        }).then(res => {
            console.log(res.data)
            if (res.data.status == 200) {
                toast.show(res.data.message, {
                    type: 'success'
                });
                setKirim({
                    ...kirim,
                    keterangan: '',
                    nilai: 1
                })
                __getRatingStar();
                setTimeout(() => {
                    setLoading2(false);
                }, 1000)
            }
        })
    }


    const images = [
        {
            url: webURL + item.cover,
        },
        {
            url: webURL + item.gambar1,
        },
        {
            url: webURL + item.gambar2,
        },
        {
            url: webURL + item.gambar3,
        },
    ]

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader title={ITEM.judul} />
            <ScrollView
                removeClippedSubviews={true} // Hapus elemen yang tidak terlihat dari memori
                showsVerticalScrollIndicator={false}
            >
                <View style={{
                    flex: 1,
                    padding: 10,
                }}>
                    <Text style={{
                        ...fonts.headline4,
                        textAlign: 'center',
                        color: colors.primary,
                        marginBottom: 10,
                    }}>{item.nama}</Text>

                    <TouchableWithoutFeedback onPress={toggleModal}>
                        <Image source={{
                            uri: webURL + item.cover
                        }} style={{
                            width: '100%',
                            height: 200,
                            borderRadius: 10,
                        }} />
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={toggleModal}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 10,
                        }}>
                            <Image source={{
                                uri: webURL + item.gambar1
                            }} style={{
                                width: '30%',
                                height: 100,
                                borderRadius: 10,
                            }} />
                            <Image source={{
                                uri: webURL + item.gambar2
                            }} style={{
                                width: '30%',
                                height: 100,
                                borderRadius: 10,
                            }} />
                            <Image source={{
                                uri: webURL + item.gambar3
                            }} style={{
                                width: '30%',
                                height: 100,
                                borderRadius: 10,
                            }} />
                        </View>
                    </TouchableWithoutFeedback>
                    {/* DESKRIPSI */}
                    <RenderHTML

                        tagsStyles={{
                            p: {
                                fontFamily: fonts.body3.fontFamily,
                                fontSize: 12,
                                textAlign: 'justify',
                                lineHeight: 20,
                            },
                        }}
                        systemFonts={systemFonts}
                        contentWidth={windowWidth}
                        source={{
                            html: item.deskripsi
                        }}
                    />
                    {/* YOUTUBE */}
                    <MyGap jarak={10} />
                    <YoutubePlayer
                        height={223}
                        width={'100%'}
                        play={false}
                        videoId={item.link_youtube}
                    />
                    <MyGap jarak={10} />
                    <View style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    }}>
                        <Text style={{
                            flex: 0.3,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>Lokasi</Text>
                        <Text style={{ flex: 0.03 }}>:</Text>
                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{

                                fontFamily: fonts.secondary[600],
                                fontSize: 12,
                            }}>{item.lokasi}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL(item.link_maps)} style={{
                                marginVertical: 10,
                                borderWidth: 1,
                                borderRadius: 30,
                                borderColor: Color.blueGray[300],
                                padding: 4,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image style={{
                                    width: '50%',
                                    height: 30,
                                    resizeMode: 'contain'
                                }} source={require('../../assets/maps.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    }}>
                        <Text style={{
                            flex: 0.3,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>Jam Buka</Text>
                        <Text style={{ flex: 0.03 }}>:</Text>
                        <View style={{
                            flex: 1
                        }}>
                            <RenderHTML

                                tagsStyles={{
                                    table: {
                                        fontFamily: fonts.body3.fontFamily,
                                        fontSize: 12,
                                        textAlign: 'justify',
                                        lineHeight: 20,
                                    },
                                }}
                                systemFonts={systemFonts}
                                contentWidth={windowWidth}
                                source={{
                                    html: item.jam_buka
                                }}
                            />
                        </View>
                    </View>
                    <View style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    }}>
                        <Text style={{
                            flex: 0.7,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>Harga</Text>
                        <Text style={{ flex: 0.03 }}>:</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>{HARGA}</Text>
                    </View>
                    <View style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    }}>
                        <Text style={{
                            flex: 0.7,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>Kontak Darurat</Text>
                        <Text style={{ flex: 0.03 }}>:</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>{item.kontak_darurat}</Text>
                    </View>
                    <View style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    }}>
                        <Text style={{
                            flex: 0.7,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>Informasi Kesehatan</Text>
                        <Text style={{ flex: 0.03 }}>:</Text>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>{item.informasi_kesehatan}</Text>
                    </View>

                    {/* DIVIDER */}
                    <View style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: 20,
                        }}>Ulasan</Text>
                        <View style={{
                            marginLeft: 10,
                            marginTop: 4,
                            height: 2,
                            flex: 1,
                            backgroundColor: Color.blueGray[300]
                        }} />
                    </View>
                    {/* ULASAN */}
                    <View style={{
                        marginVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                            marginRight: 4,
                            color: colors.black
                        }}>{RATING.nilai}</Text>
                        <Icon type='ionicon' name='star' size={15} color="gold" />
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: Color.blueGray[400],
                            fontSize: 12,
                            marginLeft: 4,
                        }}>({RATING.ulasan})</Text>
                    </View>

                    <View style={{
                        borderWidth: 1,
                        paddingVertical: 20,
                        paddingHorizontal: 10,
                        borderRadius: 8,
                        borderColor: Color.blueGray[300]
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                            marginBottom: 10,
                        }}>Beri rating dan ulasan</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}>
                            <Image source={{
                                uri: user.file_pengguna
                            }} style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                            }} />
                            <View style={{
                                flex: 1,
                                paddingLeft: 8,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 12,
                                    color: colors.primary,
                                    marginBottom: 4,
                                }}>{user.nama_lengkap}</Text>
                                {/* <Rating
                                    minValue={1}
                                    type="custom"

                                    onFinishRating={x => setKirim({
                                        ...kirim,
                                        nilai: x
                                    })}
                                    style={{

                                        // width: 200,
                                        alignSelf: 'flex-start'
                                    }}
                                /> */}
                                <StarRating

                                    enableSwiping
                                    enableHalfStar={false}
                                    rating={kirim.nilai}
                                    onChange={x => setKirim({
                                        ...kirim,
                                        nilai: x
                                    })}
                                />



                            </View>

                        </View>
                        <TextInput
                            textAlignVertical="top"
                            placeholderTextColor={Color.blueGray[400]}
                            onChangeText={x => setKirim({
                                ...kirim,
                                keterangan: x
                            })}
                            value={kirim.keterangan}
                            multiline
                            placeholder='Silahkan masukan deskripsi ulasan'
                            autoCapitalize="none"
                            style={{
                                ...fonts.body3,
                                flex: 1, // Flex untuk mengisi ruang yang ada
                                paddingLeft: 10,
                                borderWidth: 1,
                                fontSize: 12,
                                borderColor: Color.blueGray[300],
                                borderRadius: 10,
                                height: 100,
                                color: Color.blueGray[900],
                            }}
                        />
                        {!loading2 && <MyButton onPress={sendServer} title="Posting" />}

                    </View>

                    {/* CARD REVIEW */}
                    {!loading && <FlatList legacyImplementation={false} data={data} renderItem={__renderItem} />}
                    {loading && <View style={{ marginTop: 10, }}><ActivityIndicator color={colors.primary} size="large" /></View>}
                </View>
            </ScrollView>

            <Modal transparent={true} style={{

            }} isVisible={isModalVisible}>
                <View style={{

                    flex: 0.5,
                }}>
                    <View style={{
                        height: 300,
                    }}>
                        <ImageViewer style={{}} imageUrls={images} />
                    </View>
                    <MyButton title="Tutup" onPress={toggleModal} />
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})