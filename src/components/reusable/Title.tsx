import {View, Text} from 'react-native';
import React from 'react';

import styles from './styles';

const Title = () => {
  return (
    <View style={styles.appTitleContainer}>
      <Text style={styles.appTitle}>Community Kitchens</Text>
      <Text style={styles.appSubTitle}>Home Chef App</Text>
    </View>
  );
};

export default Title;
