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

  const renderFridgeOptions = () => {
    return (
      <View style={styles.fridgeOptionsContainer}>
        {townFridges?.sort().map((f, i) => (
          <Pressable
            style={styles.fridgeOption}
            key={f.name}
            onPress={() => {
              setFridge(i);
              setFridgeMenuOpen(false);
            }}>
            <Text style={styles.fridgeText}>{f.name}</Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.sendTextVariablesItem}>
      <Text style={styles.sendTextLabel}>Town Fridge Location:</Text>
      <View style={styles.fridgeSelect}>
        <Pressable
          style={styles.fridgeButton}
          onPress={() => setFridgeMenuOpen(current => !current)}>
          <Text style={styles.fridgeText}>
            {fridge !== undefined && townFridges
              ? townFridges[fridge].name
              : 'Select a Town Fridge'}
          </Text>
        </Pressable>
        {fridgeMenuOpen && renderFridgeOptions()}

        {fridge !== undefined && townFridges && !fridgeMenuOpen && (
          <View style={styles.fridgeInfo}>
            <View>
              {!!townFridges[fridge].address && (
                <>
                  <Text style={styles.fridgeInfoLabel}>Address: </Text>

                  <Text style={styles.fridgeInfoValue}>
                    {townFridges[fridge].address}
                  </Text>
                </>
              )}
            </View>
            <View>
              <Text style={styles.fridgeInfoLabel}>Region: </Text>
              <Text style={styles.fridgeInfoValue}>{region}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default EnterFridge;
