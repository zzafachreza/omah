import { View, Text, SafeAreaView, FlatList, Animated, TouchableNativeFeedback, TouchableOpacity, Alert, TouchableWithoutFeedback, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { MyHeader } from '../../components';
import { colors, fonts } from '../../utils';
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { apiURL, getData, MYAPP, storeData, webURL } from '../../utils/localStorage';
import moment from 'moment';
import Share from 'react-native-share';
import { useToast } from 'react-native-toast-notifications';

export default function DetailSharing({
    navigation,
    route
}) {

    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View style={{ padding: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 10, paddingLeft: 5 }}>
                    <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={{ uri: item.file_pengguna }} />
                    <View style={{
                        flex: 1
                    }}>
                        <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, color: colors.primary, marginLeft: 10 }}>
                            {item.nama_lengkap}
                        </Text>
                        <Text style={{ fontFamily: fonts.primary[400], fontSize: 12, color: colors.black, marginLeft: 10 }}>
                            {moment(item.tanggal).format('DD MMMM YYYY')}
                        </Text>

                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>

                    <YoutubePlayer height={223} width={380} play={false} videoId={item.link_youtube} />

                    {item.gambar.length > 0 && <Image style={{ width: 414, height: 243, borderRadius: 10 }} source={{ uri: item.gambar }} />}

                </View>
                <View style={{ padding: 5 }}>
                    <Text style={{ fontFamily: fonts.primary[400], fontSize: 12, textAlign: 'left' }}>{item.deskripsi}</Text>
                </View>
            </View>

        </SafeAreaView>
    )
}

