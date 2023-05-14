import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Text, TextInput, View} from 'react-native';

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
  const [fridge, setFridge] = useState<number | undefined>();
  const [mealCount, setMealCount] = useState(25);
  const [source, setSource] = useState('CK Home Chef Volunteers');
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
    } Town Fridge${getAddress()} has been stocked with ${mealCount} meals, made with love by ${source}! The meal today is ${name}. ${getDietaryInfo()}Please respond to this message with any feedback. Enjoy!`;

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
    const btnActive = fridge && message && source && name && mealCount > 0;

    return (
      <View className="send-text">
        <View className="send-text-variables">
          <View className="send-text-variables-item">
            <Text>Name of Meal:</Text>
            <TextInput value={name} onChangeText={setName} />
          </View>

          <div className="send-text-variables-item">
            <label htmlFor="mealCount">Number of Meals:</label>
            <input
              type="number"
              value={mealCount}
              name="mealCount"
              onChange={e => setMealCount(e.target.value)}
              min={1}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="source">Prepared By:</label>
            <textarea
              value={source}
              name="source"
              onChange={e => setSource(e.target.value)}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="dietary">Dietary Information (optional):</label>
            <textarea
              value={dietary}
              name="dietary"
              onChange={e => setDietary(e.target.value)}
            />
          </div>

          <div className="send-text-variables-item">
            <label htmlFor="fridge">Town Fridge Location:</label>
            <div className="fridge">
              <select
                required
                name="fridge"
                value={fridge}
                onChange={e => setFridge(e.target.value)}>
                <option value="">Select a Town Fridge</option>
                {townFridges.map((f, i) => (
                  <option value={i} key={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>

              {fridge && (
                <div>
                  <span className="fridge-info">Address: </span>
                  {townFridges[fridge].address}
                </div>
              )}

              {fridge && (
                <div>
                  <span className="fridge-info">Region: </span>
                  {getRegion()}
                </div>
              )}
            </div>
          </div>

          <div className="send-text-variables-item">
            <FileInput
              file={photo}
              setFile={setPhoto}
              label="Photo (optional):"
            />
          </div>

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
