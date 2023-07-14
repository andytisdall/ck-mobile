import {View, Text} from 'react-native';
import React from 'react';

import styles from './styles';

const Disabled = () => {
  return (
    <View style={styles.fridgeSelect}>
      <Text style={styles.textPreviewText}>
        The CK Text Alert Service is active from 8am - 8pm
      </Text>
    </View>
  );
};

export default Disabled;
