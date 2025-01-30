import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors, Icon } from "react-native-elements";
import { fonts } from "../../utils";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


export default function DestinasiCard({ image, title, rating, reviews, time, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.card}>
      {/* Gambar */}
      <Image source={image} style={styles.image} />

      {/* Informasi */}
      <View style={styles.info}>
        {/* Judul */}
        <Text style={styles.title}>{title}</Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{rating}</Text>
          <Icon type="ionicon" name="star" size={10} color="gold" />
          <Text style={styles.reviews}>({reviews})</Text>
        </View>

        {/* Jam Operasional */}
        <View style={{
            flexDirection:'row',
            justifyContent:"flex-start",
            alignItems:"center",

        }}>
           <Icon type="ionicon" size={10} name="time"  color={colors.success} style={{top:-1, marginRight:5}}/> 
           <Text style={styles.time}>{time}</Text>
        </View> 

        {/* Ikon Lokasi */}
        <Icon type="ionicon" name="location" size={12} color="red" style={styles.locationIcon} />
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 20,
    width:167,
    height:240,
    margin:10
  },
  image: {
    width: "100%",
    height: 150,
  },
  info: {
    padding: 10,
    
  },
  title: {
    fontSize: 12,
    color: "#B03A2E",
    marginBottom: 5,
    fontFamily:fonts.primary[600],
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  rating: {
    fontSize: 10,
    color: "black",
    marginRight: 5,
    fontFamily:fonts.primary[400],
  },
  reviews: {
    fontSize: 10,
    color: "gray",
    marginLeft: 5,
    fontFamily:fonts.primary[400],
  },
  time: {
    fontSize: 10,
    color: "green",
    marginBottom: 0,
    fontFamily:fonts.primary[400],
  },
  locationIcon: {
    alignSelf: "flex-end",
    marginTop:-1
  },
});

