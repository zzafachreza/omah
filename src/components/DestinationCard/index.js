import React from "react";
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";
import { colors, fonts } from "../../utils";



export default function DestinasiCard({ image, title, rating, reviews, lokasi, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {/* Gambar */}
        <Image source={{
          uri: image
        }} style={styles.image} />

        {/* Informasi */}
        <View style={styles.info}>
          {/* Judul */}
          <Text style={styles.title}>{title}</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{rating}</Text>
            <View style={{
              marginTop: -4
            }}>
              <Icon type="ionicon" name="star" size={12} color="gold" />
            </View>
            <Text style={styles.reviews}>({reviews})</Text>
          </View>

          {/* Jam Operasional */}
          <View style={{
            flexDirection: 'row',
            // justifyContent: "flex-start",
            alignItems: "flex-start",

          }}>
            <Icon type="ionicon" size={10} name="location" color={colors.primary} style={{ top: -1, marginRight: 5 }} />
            <Text style={styles.time}>{lokasi}</Text>
          </View>

          {/* Ikon Lokasi */}

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
    width: 167,
    height: 240,
    margin: 10
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
    fontFamily: fonts.primary[600],
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
    fontFamily: fonts.primary[400],
  },
  reviews: {
    fontSize: 10,
    color: "gray",
    marginLeft: 5,
    fontFamily: fonts.primary[400],
  },
  time: {
    fontSize: 8,
    color: "green",
    fontFamily: fonts.primary[400],
  },
});

