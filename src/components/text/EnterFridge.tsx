import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {townFridgeList} from './SendText';

import styles from './styles';

const EnterFridge = ({
  fridge,
  setFridge,
  region,
  townFridges,
}: {
  fridge: number | undefined;
  setFridge: (fridgeIndex: number) => void;
  region: string;
  townFridges: townFridgeList;
}) => {
  const [fridgeMenuOpen, setFridgeMenuOpen] = useState(false);

  return (
    <View style={styles.sendTextVariablesItem}>
      <Text>Town Fridge Location:</Text>
      <View>
        <Pressable
          style={styles.fridgeButton}
          onPress={() => setFridgeMenuOpen(current => !current)}>
          <Text>
            {fridge && townFridges
              ? townFridges[fridge].name
              : 'Select a Town Fridge'}
          </Text>
        </Pressable>
        {fridgeMenuOpen &&
          townFridges?.map((f, i) => (
            <Pressable
              style={styles.fridgeOption}
              key={f.name}
              onPress={() => {
                setFridge(i);
                setFridgeMenuOpen(false);
              }}>
              <Text style={styles.fridgeName}>{f.name}</Text>
            </Pressable>
          ))}

        {fridge && townFridges && (
          <View>
            <Text style={styles.fridgeInfo}>Address: </Text>
            <Text> {townFridges[fridge].address}</Text>
          </View>
        )}

        {fridge && (
          <View>
            <Text style={styles.fridgeInfo}>Region: </Text>
            <Text>{region}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default EnterFridge;
