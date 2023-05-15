import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Pressable, Text, TextInput, View} from 'react-native';

import styles from './styles';
import * as actions from '../../actions';
import './SendText.css';
import {townFridges} from './townFridges';
// import Loading from '../reusable/Loading';
import AddPhoto from '../reusable/AddPhoto';
// import useLoading from '../../hooks/useLoading';
// import TextPreview from './TextPreview';

// {
//   sendText,
// }: {
//   sendText: (
//     message: any,
//     region: any,
//     photo: any,
//     feedbackId: any,
//     number: any,
//   ) => (dispatch: any) => Promise<void>;
// }

const SendText = () => {
  const [fridgeMenuOpen, setFridgeMenuOpen] = useState(false);
  const [fridge, setFridge] = useState<number | undefined>();
  const [mealCount, setMealCount] = useState<string | undefined>();
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<string | undefined>();
  const [dietary, setDietary] = useState('');
  const [preview, setPreview] = useState(false);

  // const [loading, setLoading] = useLoading();

  console.log(photo);

  const getAddress = () => {
    if (fridge && townFridges[fridge].address) {
      return `, at ${townFridges[fridge].address},`;
    } else {
      return '';
    }
  };

  const getDietaryInfo = () => {
    if (dietary) {
      return `This meal is ${dietary}. `;
    } else {
      return '';
    }
  };

  const message =
    fridge &&
    `Hello! ${
      townFridges[fridge].name
    } Town Fridge${getAddress()} has been stocked with ${mealCount} meals, made with love by CK Home Chef volunteers! The meal today is ${name}. ${getDietaryInfo()}Please respond to this message with any feedback. Enjoy!`;

  const getRegion = () => {
    if (fridge) {
      const {region} = townFridges[fridge];
      if (region === 'EAST_OAKLAND') {
        return 'East Oakland';
      }
      if (region === 'WEST_OAKLAND') {
        return 'West Oakland';
      }
    }
  };

  const composeText = () => {
    const btnActive =
      fridge && message && name && mealCount && parseInt(mealCount, 10) > 0;
    const sendButton: Record<string, string | number>[] = [styles.sendBtn];
    if (!btnActive) {
      sendButton.push(styles.btnInactive);
    }

    return (
      <View style={styles.sendText}>
        <View style={styles.sendTextVariables}>
          <View style={styles.sendTextVariablesItem}>
            <Text>Name of Meal:</Text>
            <TextInput value={name} onChangeText={setName} />
          </View>

          <View style={styles.sendTextVariablesItem}>
            <Text>Number of Meals:</Text>
            <TextInput value={mealCount} onChangeText={setMealCount} />
          </View>

          <View style={styles.sendTextVariablesItem}>
            <Text>Dietary Information (optional):</Text>
            <TextInput value={dietary} onChangeText={setDietary} />
          </View>

          <View style={styles.sendTextVariablesItem}>
            <Text>Town Fridge Location:</Text>
            <View>
              <Pressable onPress={() => setFridgeMenuOpen(current => !current)}>
                {fridge ? townFridges[fridge].name : 'Select a Town Fridge'}
              </Pressable>
              {fridgeMenuOpen &&
                townFridges.map((f, i) => (
                  <Pressable key={f.name} onPress={() => setFridge(i)}>
                    {f.name}
                  </Pressable>
                ))}

              {fridge && (
                <View>
                  <Text style={styles.fridgeInfo}>Address: </Text>
                  <Text> {townFridges[fridge].address}</Text>
                </View>
              )}

              {fridge && (
                <View>
                  <Text style={styles.fridgeInfo}>Region: </Text>
                  <Text>{getRegion()}</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.sendTextVariablesItem}>
            <Text>Photo (optional):</Text>
            <AddPhoto setPhoto={setPhoto} />
          </View>

          <Pressable
            style={sendButton}
            onPress={() => {
              if (btnActive) {
                setPreview(true);
              }
            }}>
            Preview Message
          </Pressable>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    // if (loading) {
    //   return <Loading />;
    // }
    if (!preview) {
      return composeText();
    }
    return (
      <Text>Preview</Text>
      // <TextPreview
      //   message={message}
      //   region={getRegion()}
      //   photo={photo}
      //   onSubmit={() => {
      //     console.log(photo);
      //   }}
      //   onCancel={() => setPreview(false)}
      // />
    );
  };

  return (
    <div>
      <h2>Send a Text</h2>
      {renderContent()}
    </div>
  );
};

export default connect(null, actions)(SendText);
