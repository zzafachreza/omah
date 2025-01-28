import { View, Text, ScrollView, ImageBackground, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { Image } from 'react-native'
import { MyButton, MyGap, MyInput, MyLoading } from '../../components'
import { showMessage } from 'react-native-flash-message'
import axios from 'axios'
import { api_token, apiURL, MYAPP, storeData } from '../../utils/localStorage'
export default function Register({ navigation }) {

    const [kirim, setKirim] = useState({
        api_token: api_token,
        namaLengkap: '',
        namaApotek: '',
        alamatApotek: '',
        linkApotek: '',
        nomorSIA: '',
        nomorSIPA: '',
        nomorWA: '',
        username: '',
        password: '',
        repassword: ''
    });

    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        const requiredFields = [
            { field: kirim.namaLengkap, message: "Mohon isi Nama Lengkap!" },
            { field: kirim.namaApotek, message: "Mohon isi Nama Apotek!" },
            { field: kirim.alamatApotek, message: "Mohon isi Alamat Apotek!" },
            { field: kirim.linkApotek, message: "Mohon isi Link Apotek!" },
            { field: kirim.nomorSIA, message: "Mohon isi Nomor SIA!" },
            { field: kirim.nomorSIPA, message: "Mohon isi Nomor SIPA!" },
            { field: kirim.nomorWA, message: "Mohon isi Nomor WhatsApps!" },
            { field: kirim.username, message: "Mohon isi Username!" },
            { field: kirim.password, message: "Mohon isi Password!" },
            { field: kirim.repassword, message: "Mohon isi Konfirmasi Password!" },
        ];

        for (let i = 0; i < requiredFields.length; i++) {
            if (requiredFields[i].field.length === 0) {
                showMessage({
                    type: "default",
                    color: 'white',
                    backgroundColor: colors.danger,
                    message: requiredFields[i].message
                });
                return;
            }
        }

        if (kirim.password != kirim.repassword) {
            showMessage({
                type: "default",
                color: 'white',
                backgroundColor: colors.danger,
                message: 'Password & Konfirmasi Password tidak sama!'
            })

        } else if (kirim.nomorWA.length > 13) {
            showMessage({
                type: "default",
                color: 'white',
                backgroundColor: colors.danger,
                message: 'Nomor WhatsApp terlalu panjang. Mohon periksa kembali nomor Anda.'
            });
        } else if (kirim.nomorWA.length < 12) {
            showMessage({
                type: "default",
                color: 'white',
                backgroundColor: colors.danger,
                message: 'Nomor WhatsApp harus memiliki 9 hingga 14 digit.'
            });
        } else {
            console.log(kirim);
            setLoading(true)
            axios
                .post(apiURL + 'register', kirim)
                .then(response => {
                    if (response.data.status === 200) {
                        setLoading(true);
                        console.log(response.data);
                        storeData('user', kirim);
                        navigation.replace("Login");
                        Alert.alert(MYAPP, "Selamat!, Anda berhasil daftar!");
                    } else if (response.data.status === 404) {
                        setLoading(false);
                        showMessage({
                            type: 'default',
                            color: 'white',
                            backgroundColor: colors.danger,
                            message: "Username sudah ada!"
                        })
                    } else {
                        setLoading(false);
                        showMessage({
                            type: 'default',
                            color: 'white',
                            backgroundColor: colors.danger,
                            message: "Kesalahan Jaringan"
                        });
                    }

                })
                .catch(error => {
                    setLoading(false);
                    console.error("Terjadi kesalahan dari server!", error);
                    showMessage({
                        type: "default",
                        color: "white",
                        backgroundColor: colors.danger,
                        message: "Terjadi kesalahan di server, coba lagi nanti."
                    });
                })
        }

    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            {loading && <MyLoading />}

            <ScrollView contentContainerStyle={{
                flexGrow:1,
            }}>
              <View style={{
                height:"100%",
                alignContent:'center',
                justifyContent:"center",
              }}>
              <View style={{
                padding:10,
                marginTop:20,
                top:10
              }}>
                <Image style={{
                    alignSelf:"center",
                    width:198,
                    height:209
                }} source={require('../../assets/logologin.png')}/>
              </View>


                <View style={{
                    padding: 10,
                    marginTop:20

                }}>

                    <Text style={{
                        fontFamily: fonts.primary[700],
                        fontSize: 30,
                        textAlign: "center",
                        color: colors.primary,
                    }}>Daftar</Text>



                    {/* form */}

                    <View style={{
                        padding: 10,
                        marginTop:-20
                    }}>


                        {/*  nama lengkap dan gelar */}
                        <View>
                            <MyInput
                               
                                placeholder="Nama Lengkap"
                                value={kirim.namaLengkap}
                                onChangeText={(x) => setKirim({ ...kirim, 'namaLengkap': x })}
                            />
                        </View>


                        {/* nama apotek */}
                        <View style={{
                            marginTop: 0
                        }}>
                            <MyInput
                                
                                placeholder="Username"
                                value={kirim.namaApotek}
                                onChangeText={(x) => setKirim({ ...kirim, 'namaApotek': x })}
                            />
                        </View>


                        {/* alamat apotek */}
                        <View style={{
                            marginTop: 0
                        }}>
                            <MyInput
                               
                                placeholder="Nomor Telepon"
                                value={kirim.alamatApotek}
                                onChangeText={(x) => setKirim({ ...kirim, 'alamatApotek': x })}
                            />
                        </View>


                        {/*Link Google Maps Apotek */}
                        <View style={{
                            marginTop: 0
                        }}>
                            <MyInput
                               
                                placeholder="Kata Sandi"
                                value={kirim.linkApotek}
                                onChangeText={(x) => setKirim({ ...kirim, 'linkApotek': x })}
                                secureTextEntry={true}
                            />
                        </View>


                        {/* Nomor SIA */}
                        <View style={{
                            marginTop: 0
                        }}>
                            <MyInput
                                placeholder="Konfirmasi Kata Sandi"
                                value={kirim.nomorSIA}
                                onChangeText={(x) => setKirim({ ...kirim, 'nomorSIA': x })}
                                secureTextEntry={true}
                            />
                        </View>


                      

                        {/* button */}
                        <View style={{
                            marginTop:10
                        }}>
                            <MyButton onPress={handleRegister} title="Daftar" />
                        </View>

                    </View>


                    {/* register */}

                    <View style={{
                        padding: 10,
                        marginTop: "1%"
                    }}>

                        {/* register */}
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                            <View>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    textAlign: "center"
                                }}>
                                    Sudah memiliki akun? Silakan  <Text style={{
                                        color: colors.primary,
                                    }}>Masuk</Text>
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
              </View>
            </ScrollView>

        </View>
    )
}