import {useState} from 'react';
import {connect} from 'react-redux';
import {Pressable, Text, TextInput, View} from 'react-native';

import styles from './styles';
import * as actions from '../../actions';
import './SendText.css';
import {townFridges} from './townFridges';
import Loading from '../reusable/Loading';
import FileInput from '../reusable/FileInput';
import useLoading from '../../hooks/useLoading';
import TextPreview from './TextPreview';

const SendText = ({
  sendText,
}: {
  sendText: (
    message: any,
    region: any,
    photo: any,
    feedbackId: any,
    number: any,
  ) => (dispatch: any) => Promise<void>;
}) => {
  const [fridgeMenuOpen, setFridgeMenuOpen] = useState(false);
  const [fridge, setFridge] = useState<number | undefined>();
  const [mealCount, setMealCount] = useState<string | undefined>();
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [dietary, setDietary] = useState('');
  const [preview, setPreview] = useState(false);

  const [loading, setLoading] = useLoading();

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
    const btnActive = fridge && message && name && mealCount && parseInt(mealCount) > 0;

    return (
      <View style={styles.sendText}>
        <View style={styles.sendTextVariables}>
          <View style={styles.sendTextVariablesItem}>
            <Text>Name of Meal:</Text>
            <TextInput value={name} onChangeText={setName} />
          </View>

          <View style={styles.sendTextVariablesItem}>
            <Text>Number of Meals:</Text>
            <TextInput
              value={mealCount}
              onChangeText={setMealCount}
            />
          </View>


          <View style={styles.sendTextVariablesItem}>
            <Text>Dietary Information (optional):</Text>
            <TextInput
              value={dietary}
              onChangeText={setDietary}
            />
          </View>

          <View style={styles.sendTextVariablesItem}>
            <Text>Town Fridge Location:</Text>
            <View>
              <Pressable>{fridge ? townFridges[fridge].name : 'Select a Town Fridge'}</Pressable>
                {townFridges.map((f, i) => (
                  <Pressable key={f.name} onPress={() => setFridge(i)}>
                    {f.name}
                  </Pressable>
                ))}

              {fridge && <View>
                  <Text style={styles.fridgeInfo}>Address: </Text>
                  <Text> {townFridges[fridge].address}</Text>
                  </View>
                }

              {fridge && <View>
                  <Text style={styles.fridgeInfo}>Region: </Text><Text>
                  {getRegion()}
                  </Text>
                  </View>
              }
            </View>
          </View>

          <View style={styles.sendTextVariablesItem}>
            <FileInput
              file={photo}
              setFile={setPhoto}
              label="Photo (optional):"
            />
          </View>

          <button
            className={`send-btn ${btnActive ? '' : 'btn-inactive'}`}
            onClick={() => {
              if (btnActive) {
                setPreview(true);
              }
            }}>
            Preview Message
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }
    if (!preview) {
      return composeText();
    }
    return (
      <TextPreview
        message={message}
        region={getRegion()}
        photo={photo}
        onSubmit={() => {
          sendText(message, townFridges[fridge].region, photo);
          setLoading(true);
        }}
        onCancel={() => setPreview(false)}
      />
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
