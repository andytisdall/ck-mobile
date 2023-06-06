import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from 'react';

import styles from './styles';

const EnterCount = ({
  mealCount,
  setMealCount,
}: {
  mealCount: string;
  setMealCount: (text: string) => void;
}) => {
  return (
    <View style={styles.sendTextVariablesItem}>
      <Text>Number of Meals:</Text>
      <TextInput
        style={styles.sendTextInput}
        value={mealCount}
        onChangeText={setMealCount}
        keyboardType="numeric"
        textColor="black"
      />
    </View>
  );
};

export default EnterCount;
