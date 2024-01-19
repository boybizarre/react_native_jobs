import React from 'react';
import { View, Text, TouchableOpacity, Linking, Image } from 'react-native';

// constants
import { icons } from '../../../constants';

import styles from './footer.style';

const Footer = ({ url }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn}>
        <Image
          source={icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
