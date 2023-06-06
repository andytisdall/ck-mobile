import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Pressable, Text, View} from 'react-native';

import styles from './styles';
import {
  sendText as sendTextAction,
  getFridges as getFridgesAction,
} from '../../actions';
// import './SendText.css';
// import Loading from '../reusable/Loading';
// import AddPhoto from '../reusable/AddPhoto';
// import useLoading from '../../hooks/useLoading';
import TextPreview from './TextPreview';
import EnterName from './EnterName';
import EnterCount from './EnterCount';
import EnterFridge from './EnterFridge';
import EnterPhoto from './EnterPhoto';
import {RootState} from '../../state/Root';

export type townFridgeList =
  | {
      name: string;
      address: string | undefined;
      region: string;
    }[]
  | null;

interface sendTextProps {
  sendText: (message: string, region: string, photo: any) => Promise<void>;
  getFridges: () => Promise<void>;
  townFridges: townFridgeList;
}

const SendText = ({townFridges, sendText, getFridges}: sendTextProps) => {
  const [page, setPage] = useState(1);
  const [fridge, setFridge] = useState<number | undefined>();
  const [mealCount, setMealCount] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<string | undefined>();
  const [fieldValid, setFieldValid] = useState(false);
  // const [dietary, setDietary] = useState('');
  // const [preview, setPreview] = useState(false);

  // const [loading, setLoading] = useLoading();

  useEffect(() => {
    getFridges();
  }, [getFridges]);

  const getAddress = () => {
    if (fridge && townFridges && townFridges[fridge].address) {
      return `, at ${townFridges[fridge].address},`;
    } else {
      return '';
    }
  };

  const getRegion = () => {
    if (fridge && townFridges) {
      const {region} = townFridges[fridge];
      if (region === 'EAST_OAKLAND') {
        return 'East Oakland';
      }
      if (region === 'WEST_OAKLAND') {
        return 'West Oakland';
      }
    }
    return '';
  };

  const message =
    fridge && townFridges
      ? `Hello! ${
          townFridges[fridge].name
        } Town Fridge${getAddress()} has been stocked with ${mealCount} meals, made with love by CK Home Chef volunteers! The meal today is ${name}. Please respond to this message with any feedback. Enjoy!`
      : '';

  const prevPage = () => {
    setPage(p => p - 1);
  };

  const nextPage = () => {
    setFieldValid(false);
    setPage(p => p + 1);
  };

  const validateName = (text: string) => {
    setName(text);
    if (text) {
      setFieldValid(true);
    }
  };

  const validateCount = (text: string) => {
    setMealCount(text);
    if (parseInt(text, 10) > 0) {
      setFieldValid(true);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return <EnterName setName={validateName} name={name} />;
      case 2:
        return (
          <EnterCount setMealCount={validateCount} mealCount={mealCount} />
        );
      case 3:
        return (
          <EnterFridge
            setFridge={setFridge}
            fridge={fridge}
            region={getRegion()}
            townFridges={townFridges}
          />
        );
      case 4:
        return <EnterPhoto photo={photo} setPhoto={setPhoto} />;
      case 5:
        return (
          <TextPreview
            message={message}
            region={getRegion()}
            photo={photo}
            onSubmit={() => {
              if (fridge && townFridges) {
                sendText(message, townFridges[fridge].region, photo);
              }
            }}
            onCancel={() => setPage(1)}
          />
        );
      default:
        // setFieldValid(true);
        return <Text>Oops</Text>;
    }
  };

  const renderNav = () => {
    const invalidStyle = !fieldValid && styles.btnInactive;
    return (
      <View style={styles.sendTextNav}>
        <Pressable style={styles.btn} onPress={prevPage}>
          <Text style={styles.btnText}>Back</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, invalidStyle]}
          onPress={() => fieldValid && nextPage()}>
          <Text style={[styles.btnText]}>Next</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.sendText}>
      <View style={styles.sendTextPage}>{renderPage()}</View>
      {renderNav()}
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {townFridges: state.text.townFridges};
};

export default connect(mapStateToProps, {
  sendText: sendTextAction,
  getFridges: getFridgesAction,
})(SendText);
