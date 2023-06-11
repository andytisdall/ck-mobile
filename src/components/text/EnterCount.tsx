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
      <Text style={styles.sendTextLabel}>Number of Meals:</Text>
      <TextInput
        style={[styles.sendTextInput, styles.sendTextNumberInput]}
        value={mealCount}
        onChangeText={setMealCount}
        inputMode="tel"
        textColor="black"
        placeholder="25"
      />
    </View>
  );
};

export default EnterCount;
