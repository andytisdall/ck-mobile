import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from 'react';

import styles from './styles';

const EnterName = ({
  name,
  setName,
}: {
  name: string;
  setName: (text: string) => void;
}) => {
  return (
    <View style={styles.sendTextVariablesItem}>
      <Text style={styles.sendTextLabel}>Name of Meal:</Text>
      <TextInput
        style={styles.sendTextInput}
        value={name}
        onChangeText={setName}
        textColor="black"
        multiline
        placeholder="Meatloaf with Couscous and Broccoli"
      />
    </View>
  );
};

export default EnterName;
