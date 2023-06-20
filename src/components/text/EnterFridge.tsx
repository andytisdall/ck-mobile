import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {townFridgeList} from './SendText';
// import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {connect} from 'react-redux';

import styles from './styles';
import {getFridges as getFridgesAction} from '../../actions';

const EnterFridge = ({
  fridge,
  setFridge,
  region,
  townFridges,
  getFridges,
}: {
  fridge: number | undefined;
  setFridge: React.Dispatch<React.SetStateAction<number | undefined>>;
  region: string;
  townFridges: townFridgeList;
  getFridges: () => Promise<void>;
}) => {
  const [fridgeMenuOpen, setFridgeMenuOpen] = useState(false);
  useEffect(() => {
    getFridges();
  }, [getFridges]);

  // useEffect(() => {
  //   menuRef.current?.focus();
  // });

  const renderFridgeOptions = () => {
    if (townFridges) {
      const options = townFridges.sort().map((f, i) => {
        return {
          label: f.name,
          value: i,
        };
      });
      return [...options];
    }
    return [];
  };

  return (
    <View style={styles.sendTextVariablesItem}>
      <Text style={styles.sendTextLabel}>Town Fridge Location:</Text>
      <View style={styles.fridgeSelect}>
        {/*   <Pressable
          style={styles.fridgeButton}
          onPress={() => setFridgeMenuOpen(current => !current)}>
          <Text style={styles.fridgeText}>
            {fridge !== undefined && townFridges
              ? townFridges[fridge].name
              : 'Select a Town Fridge'}
          </Text>
        </Pressable>
        {fridgeMenuOpen && renderFridgeOptions()} */}
        <DropDownPicker
          open={fridgeMenuOpen}
          value={fridge === undefined ? null : fridge}
          items={renderFridgeOptions()}
          setOpen={setFridgeMenuOpen}
          setValue={setFridge}
          listMode="SCROLLVIEW"
          placeholder="Select a Town Fridge"
        />

        {fridge !== undefined && townFridges && (
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

export default connect(null, {getFridges: getFridgesAction})(EnterFridge);
