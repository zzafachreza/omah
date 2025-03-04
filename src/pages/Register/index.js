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
        nama_lengkap: '',
        username: '',
        telepon: '',
        username: '',
        password: '',
        repassword: ''
    });

    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        const requiredFields = [
            { field: kirim.nama_lengkap, message: "Mohon isi Nama Lengkap!" },
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

        } else if (kirim.telepon.length < 2) {
            showMessage({
                type: "default",
                color: 'white',
                backgroundColor: colors.danger,
                message: 'Nomor telepon harus memiliki 9 hingga 14 digit.'
            });
        } else {
            console.log(kirim);
            setLoading(true)
            axios
                .post(apiURL + 'register', kirim)
                .then(response => {
                    console.log(response.data)
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
                flexGrow: 1,
            }}>
                <View style={{
                    height: "100%",
                    alignContent: 'center',
                    justifyContent: "center",
                }}>
                    <View style={{
                        padding: 10,
                        marginTop: 20,
                        top: 10
                    }}>
                        <Image style={{
                            alignSelf: "center",
                            width: 198,
                            height: 209
                        }} source={require('../../assets/logologin.png')} />
                    </View>


                    <View style={{
                        padding: 10,
                        marginTop: 20

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
                            marginTop: -20
                        }}>


                            {/*  nama lengkap dan gelar */}
                            <View>
                                <MyInput

                                    placeholder="Nama Lengkap"
                                    value={kirim.nama_lengkap}
                                    onChangeText={(x) => setKirim({ ...kirim, 'nama_lengkap': x })}
                                />
                            </View>


                            {/* nama apotek */}
                            <View style={{
                                marginTop: 0
                            }}>
                                <MyInput

                                    placeholder="Username"
                                    value={kirim.username}
                                    onChangeText={(x) => setKirim({ ...kirim, 'username': x })}
                                />
                            </View>


                            {/* alamat apotek */}
                            <View style={{
                                marginTop: 0
                            }}>
                                <MyInput
                                    keyboardType='phone-pad'
                                    placeholder="Nomor Telepon"
                                    value={kirim.telepon}
                                    onChangeText={(x) => setKirim({ ...kirim, 'telepon': x })}
                                />
                            </View>


                            {/*Link Google Maps Apotek */}
                            <View style={{
                                marginTop: 0
                            }}>
                                <MyInput

                                    placeholder="Kata Sandi"
                                    value={kirim.password}
                                    onChangeText={(x) => setKirim({ ...kirim, 'password': x })}
                                    secureTextEntry={true}
                                />
                            </View>


                            {/* Nomor SIA */}
                            <View style={{
                                marginTop: 0
                            }}>
                                <MyInput
                                    placeholder="Konfirmasi Kata Sandi"
                                    value={kirim.repassword}
                                    onChangeText={(x) => setKirim({ ...kirim, 'repassword': x })}
                                    secureTextEntry={true}
                                />
                            </View>




                            {/* button */}
                            <View style={{
                                marginTop: 10
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