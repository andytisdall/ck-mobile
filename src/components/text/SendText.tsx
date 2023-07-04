import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import {Text, View, ScrollView, Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../../App';
import styles from './styles';
import {
  sendText as sendTextAction,
  getFridges as getFridgesAction,
  setError as setErrorAction,
} from '../../actions';
import Arrow from '../../assets/right-arrow.svg';
import TextPreview from './TextPreview';
import EnterName from './EnterName';
import EnterCount from './EnterCount';
import EnterFridge from './EnterFridge';
import EnterPhoto from './EnterPhoto';
import {RootState} from '../../state/Root';
import useLoading from '../../hooks/useLoading';
import Loading from '../reusable/Loading';
import {SentMessage} from './TextSuccess';
import {PhotoFile} from '../reusable/AddPhoto';
import Btn from '../reusable/Btn';

export type townFridgeList =
  | {
      name: string;
      address: string | undefined;
      region: string;
    }[]
  | null;

interface SendTextProps {
  sendText: (message: string, region: string, photo: any) => Promise<void>;
  setError: (message: string) => void;
  townFridges: townFridgeList;
  sent: SentMessage | null;
}
type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Text'>;

const SendText = ({
  townFridges,
  sendText,
  setError,
}: // sent,
// navigation,
SendTextProps & ScreenProps) => {
  const [page, setPage] = useState(1);
  const [fridge, setFridge] = useState<number | undefined>();
  const [mealCount, setMealCount] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<PhotoFile | undefined>();
  const [fieldValid, setFieldValid] = useState(false);

  const [loading, setLoading] = useLoading();

  const scrollRef = useRef<ScrollView | null>(null);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const clearState = () => {
    setPage(1);
    setFridge(undefined);
    setMealCount('');
    setName('');
    setPhoto(undefined);
    setFieldValid(false);
  };

  // useEffect(() => {
  //   if (sent) {
  //     navigation.navigate('TextSuccess');
  //   }
  // }, [sent, navigation, setLoading]);

  const getAddress = () => {
    if (fridge !== undefined && townFridges && townFridges[fridge].address) {
      return `, at ${townFridges[fridge].address},`;
    } else {
      return '';
    }
  };

  const getRegion = () => {
    if (fridge !== undefined && townFridges) {
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
    fridge !== undefined && townFridges
      ? `Hello! ${
          townFridges[fridge].name
        } Town Fridge${getAddress()} has been stocked with ${mealCount} meals, made with love by CK Home Chef volunteers! Please take only what you need, and leave the rest to share. The meal today is ${name}. Please respond to this message with any feedback. Enjoy!`
      : '';

  const prevPage = () => {
    setPage(p => p - 1);
  };

  const nextPage = () => {
    if (fieldValid) {
      setPage(p => p + 1);
    }
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
        return (
          <EnterCount
            next={nextPage}
            setMealCount={setMealCount}
            mealCount={mealCount}
          />
        );
      case 3:
        validateField(
          fridge !== undefined && !!townFridges && !!townFridges[fridge],
        );
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
        scrollToTop();
        return (
          <TextPreview
            message={message}
            region={getRegion()}
            photo={photo}
            onSubmit={() => {
              if (fridge !== undefined && townFridges) {
                const photoToSend = {...photo};
                if (photo && Platform.OS === 'ios') {
                  photoToSend.uri = photo.uri?.replace('file://', '');
                }
                setLoading(true);
                sendText(message, townFridges[fridge].region, photoToSend);
              }
            }}
            onCancel={clearState}
          />
        );
      default:
        return <Text>Oops</Text>;
    }
  };

  const renderNav = () => {
    // const invalidStyle = !fieldValid && styles.btnInactive;

    const nextBtn = (
      // <Pressable
      //   style={[styles.sendTextNavBtn, invalidStyle]}
      //   onPress={() => {
      //     if (fieldValid) {
      //       nextPage();
      //     } else {
      //       setError('You must enter a value to proceed');
      //     }
      //   }}>
      // <View style={styles.sendTextNavBtn}>
      <Btn
        onPress={nextPage}
        onError={() => {
          setError('You must enter a value to proceed');
        }}
        style={styles.sendTextNavBtn}
        disabled={!fieldValid}>
        <Arrow />
      </Btn>
      // </View>
      // </Pressable>
    );

    const backBtn = (
      <Btn style={styles.sendTextNavBtn} onPress={prevPage}>
        <Arrow style={[styles.leftArrow]} />
      </Btn>
    );

    const firstPageStyle = page === 1 ? styles.sendTextNavEnd : {};

    return (
      <View style={[styles.sendTextNav, firstPageStyle]}>
        {page !== 1 && backBtn}
        {page !== 5 && nextBtn}
      </View>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView} ref={scrollRef}>
      <View style={styles.sendText}>
        {renderPage()}
        {renderNav()}
      </View>
    </ScrollView>
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
