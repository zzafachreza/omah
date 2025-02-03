import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating, onRatingPress }) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  const handleRatingPress = (newRating) => {
    setSelectedRating(newRating);
    if (onRatingPress) {
      onRatingPress(newRating);
    }
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => handleRatingPress(star)}>
          <Icon
            name={star <= selectedRating ? 'star' : 'star-o'}
            size={30}
            color={star <= selectedRating ? '#FFD700' : '#ccc'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;