import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader } from '../../components'
import DestinasiCard from '../../components/DestinationCard'


export default function DestinasiWisata({navigation}) {
  const sejarah = [
    {
    id:1,
    image:require('../../assets/museum_bengkulu.png'),
    title:"Museum Bengkulu",
    rating:4.8,
    riviews:389,
    time:"08.00 - 15.00 WIB"
  },
  {
    id:2,
    image:require('../../assets/fort_malborough.png'),
    title:"Fort Malborough",
    rating:4.8,
    riviews:389,
    time:"08.00 - 15.00 WIB"
  },
  {
    id:3,
    image:require('../../assets/rumahtua_seokarno.png'),
    title:"Rumah Tua Soekarno",
    rating:4.8,
    riviews:389,
    time:"08.00 - 15.00 WIB"
  },
  {
    id:4,
    image:require('../../assets/rumah_pengasingan.png'),
    title:"Rumah Pengasingan Bung Karno",
    rating:4.8,
    riviews:389,
    time:"08.00 - 15.00 WIB"
  }
];

const alam = [
  {
  id:1,
  image:require('../../assets/pantai_panjang.png'),
  title:"Pantai Panjang",
  rating:4.8,
  riviews:389,
  time:"08.00 - 15.00 WIB"
},
{
  id:2,
  image:require('../../assets/taman_wisata.png'),
  title:"Taman Wisata Wahana Surya",
  rating:4.8,
  riviews:389,
  time:"08.00 - 15.00 WIB"
},
{
  id:3,
  image:require('../../assets/bukit_kandis.png'),
  title:"Bukit Kandis",
  rating:4.8,
  riviews:389,
  time:"08.00 - 15.00 WIB"
},
{
  id:4,
  image:require('../../assets/gunung_kaba.png'),
  title:"Gunung Kaba",
  rating:4.8,
  riviews:389,
  time:"08.00 - 15.00 WIB"
}
];

const rekreasi = [
  {
  id:1,
  image:require('../../assets/suban_hot_springs.png'),
  title:"Suban Hot Springs",
  rating:4.8,
  riviews:389,
  time:"08.00 - 15.00 WIB"
},
{
  id:2,
  image:require('../../assets/waterpark_bim.png'),
  title:"Water Park BIM",
  rating:4.8,
  riviews:389,
  time:"08.00 - 15.00 WIB"
},
{
  id:3,
  image:require('../../assets/kids_funland_bengkulu.png'),
  title:"Kidz Funland Bengkulu",
  rating:4.8,
  riviews:389,
  time:"08.00 - 15.00 WIB"
},
{
  id:4,
  image:require('../../assets/kuliner_pantai_panjang.png'),
  title:"Kuliner Pantai Panjang",
  rating:4.8,
  riviews:389,
  time:"08.00 - 15.00 WIB"
}
];


const handleWisata = (title) => {
  console.log("Kamu pindah ke halaman", `${title}`);

}



  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white,
    }}>
    {/*  */}
    <MyHeader title="Destinasi Wisata"/>
      <ScrollView >
    <View style={{
        padding:10,
    }}>
    

    {/* Wisata Sejarah */}

    <View style={{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center'
    }}>
    <View>
        <Text style={{
            fontFamily:fonts.primary[600],
            color:colors.primary,
            fontSize:20,

        }}>Wisata Sejarah</Text>
    </View>

    <View style={{padding:0.3, backgroundColor:colors.black, width:'100%', left:10}}/>

    </View>

    <View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {sejarah.map((destinasi) => (
      <DestinasiCard
        key={destinasi.id}
        image={destinasi.image}
        title={destinasi.title}
        rating={destinasi.rating}
        reviews={destinasi.riviews}
        time={destinasi.time}
        onPress={() => navigation.navigate('DetailDestinasiWisata', {
  id: destinasi.id,
  type: "sejarah",
  namaWisata: destinasi.title, // Kirim nama wisata
})}

      />
    ))}
    </ScrollView>
    </View>

    {/* Wisata Alam */}

    <View style={{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:20,
    }}>

    <View>
        <Text style={{
            fontFamily:fonts.primary[600],
            color:colors.primary,
            fontSize:20,

        }}>Wisata Alam</Text>
    </View>

    <View style={{padding:0.3, backgroundColor:colors.black, width:'100%', left:10}}/>

    </View>
    <View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {alam.map((destinasi) => (
      <DestinasiCard
        key={destinasi.id}
        image={destinasi.image}
        title={destinasi.title}
        rating={destinasi.rating}
        reviews={destinasi.riviews}
        time={destinasi.time}
      />
    ))}
    </ScrollView>
    </View>

    {/* Wisata Rekreasi */}
    <View style={{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:20,
    }}>

    <View>
        <Text style={{
            fontFamily:fonts.primary[600],
            color:colors.primary,
            fontSize:20,

        }}>Wisata Rekreasi</Text>
    </View>

    <View style={{padding:0.3, backgroundColor:colors.black, width:'100%', left:10}}/>

    </View>
    <View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {rekreasi.map((destinasi) => (
      <DestinasiCard
        key={destinasi.id}
        image={destinasi.image}
        title={destinasi.title}
        rating={destinasi.rating}
        reviews={destinasi.riviews}
        time={destinasi.time}
      />
    ))}
    </ScrollView>
    </View>


    </View>
      </ScrollView>
    </View>
  )
}