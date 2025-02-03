import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components'
import { Image } from 'react-native'
import { add } from 'react-native-reanimated'
import YoutubePlayer from "react-native-youtube-iframe";

export default function OleholehUMKMDetail({}) {
  return (
    <View style={{
        flex: 1,
        backgroundColor:colors.white,

    }}>
      <MyHeader title="Oleh-oleh UMKM"/>
      <ScrollView>
        <View style={{
            padding:10,
        }}>

        {/* JUDUL TOKO */}
        <Text style={{
            fontFamily:fonts.primary[600],
            color:colors.primary,
            fontSize:20,
            textAlign:"center"
        }}>Toko Kue Ende</Text>

        {/* Image Toko */}
        <Image style={{
            width:340,
            height:191,
            alignItems:"center",
            alignSelf:"center",
        }} source={require('../../assets/toko_kue_ende.png')}/>

        {/* image riview */}
        <View style={{
            flexDirection:"row",
            justifyContent:'space-between',
            alignItems:"center",
            marginTop:10
        }}>
        {/* IMAGE RIVIEW 1 */}
        <Image style={{width:100, height:59, borderRadius:5}} source={require('../../assets/riview_tokokueende_1.png')}/>
        <Image style={{width:100, height:59, borderRadius:5}} source={require('../../assets/riview_tokokueende_2.png')}/>
        <Image style={{width:100, height:59, borderRadius:5}} source={require('../../assets/riview_tokokueende_3.png')}/>
        
        </View>

        {/* DEKRIPSI TOKO */}
        <View style={{
               marginTop:10,
               padding:10,
        }}>
            <Text style={{
                fontFamily:fonts.primary[400],
                color:colors.black,
                fontSize:12,
                textAlign:"justify",
                
            }}>  Toko Kue Ende merupakan salah satu toko oleh-oleh yang dikelola oleh UMKM di Kota Bengkulu. Ada berbagai pilihan oleh-oleh makanan yang dapat pengunjung beli.</Text>
        </View>

        {/* VIDEO TOKO */}
        <View style={{
            padding:10,
            marginTop:10,
            alignItems:"center",
            alignContent:"center"
        }}>
        <YoutubePlayer
              height={164}
              width={292}
              play={false}
              videoId='QBAEZP2GFHA'
              onChangeState={(event) => {
                if (event === "ended") setIsPlaying(false);
              }}
            />
        </View>

        {/* LOKASI, DLL */}
        <View>
            
        </View>
    
        </View>
      </ScrollView>
    </View>
  )
}