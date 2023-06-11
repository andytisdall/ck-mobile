import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Pressable, Text, View} from 'react-native';

import styles from './styles';
import {
  sendText as sendTextAction,
  getFridges as getFridgesAction,
  setError as setErrorAction,
} from '../../actions';

import TextPreview from './TextPreview';
import EnterName from './EnterName';
import EnterCount from './EnterCount';
import EnterFridge from './EnterFridge';
import EnterPhoto from './EnterPhoto';
import {RootState} from '../../state/Root';
import useLoading from '../../hooks/useLoading';
import Loading from '../reusable/Loading';
import {SentMessage} from './Text-Success';
import {BaseComponent} from '../../../App';

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
  setError: (message: string) => void;
  townFridges: townFridgeList;
  sent: SentMessage | null;
  navigation: {navigate: (name: string) => void};
}

const SendText = ({
  townFridges,
  sendText,
  getFridges,
  setError,
  sent,
  navigation,
}: sendTextProps) => {
  const [page, setPage] = useState(1);
  const [fridge, setFridge] = useState<number | undefined>();
  const [mealCount, setMealCount] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<string | undefined>();
  const [fieldValid, setFieldValid] = useState(false);

  const [loading, setLoading] = useLoading();

  useEffect(() => {
    getFridges();
  }, [getFridges]);

  useEffect(() => {
    if (sent) {
      navigation.navigate('Text-Success');
    }
  }, [sent, navigation]);

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
    setPage(p => p + 1);
  };

  const validateField = (criteria: boolean) => {
    if (!fieldValid && criteria) {
      setFieldValid(true);
    } else if (fieldValid && !criteria) {
      setFieldValid(false);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        validateField(!!name);
        return <EnterName setName={setName} name={name} next={nextPage} />;
      case 2:
        validateField(parseInt(mealCount, 10) > 0);
        return <EnterCount setMealCount={setMealCount} mealCount={mealCount} />;
      case 3:
        validateField(!!fridge && !!townFridges && !!townFridges[fridge]);
        return (
          <EnterFridge
            setFridge={setFridge}
            fridge={fridge}
            region={getRegion()}
            townFridges={townFridges}
          />
        );
      case 4:
        validateField(true);
        return <EnterPhoto photo={photo} setPhoto={setPhoto} />;
      case 5:
        return (
          <TextPreview
            message={message}
            region={getRegion()}
            photo={photo}
            onSubmit={() => {
              if (fridge && townFridges) {
                if (setLoading !== true && setLoading !== false) {
                  setLoading(true);
                }
                sendText(message, townFridges[fridge].region, photo);
              }
            }}
            onCancel={() => setPage(1)}
          />
        );
      default:
        return <Text>Oops</Text>;
    }
  };

  const renderNav = () => {
    const invalidStyle = !fieldValid && styles.btnInactive;

    const nextBtn = (
      <View style={styles.sendTextNavRight}>
        <Pressable
          style={[styles.sendTextNavBtn, invalidStyle]}
          onPress={() => {
            if (fieldValid) {
              nextPage();
            } else {
              setError('You must enter a value to proceed');
            }
          }}>
          <Text style={[styles.sendTextNavBtnText]}>&rarr;</Text>
        </Pressable>
      </View>
    );

    const backBtn = (
      <Pressable style={styles.sendTextNavBtn} onPress={prevPage}>
        <Text style={styles.sendTextNavBtnText}>&larr;</Text>
      </Pressable>
    );

    return (
      <View style={styles.sendTextNav}>
        {page !== 1 && backBtn}
        {page !== 5 && nextBtn}
      </View>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <BaseComponent>
      <View style={styles.sendTextPage}>{renderPage()}</View>
      {renderNav()}
    </BaseComponent>
  );
};

const mapStateToProps = (state: RootState) => {
  return {townFridges: state.text.townFridges, sent: state.text.sent};
};

export default connect(mapStateToProps, {
  sendText: sendTextAction,
  getFridges: getFridgesAction,
  setError: setErrorAction,
})(SendText);
