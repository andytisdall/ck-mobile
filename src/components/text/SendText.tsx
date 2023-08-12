import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {Text, View, ScrollView, Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {format} from 'date-fns';

import Disabled from './Disabled';
import {TextStackParamList} from './Text';
import styles from './styles';
import {
  sendText as sendTextAction,
  getFridges as getFridgesAction,
  setError as setErrorAction,
  getStoredText as getStoredTextAction,
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
import EnterRestaurants from './EnterRestaurants';
import UseStoredText from './UseStoredText';

export type townFridgeList =
  | {
      name: string;
      address: string | undefined;
      region: string;
    }[]
  | null;

interface SendTextProps {
  sendText: (
    message: string,
    region: string,
    photo?: any,
    name?: string,
    restaurants?: string,
  ) => Promise<void>;
  setError: (message: string) => void;
  townFridges: townFridgeList;
  sent: SentMessage | null;
  user: {busDriver: boolean};
  getStoredText: () => void;
  storedText: {name: string; restaurants: string; photoUrl: string};
}
type ScreenProps = NativeStackScreenProps<TextStackParamList, 'SendText'>;

const SendText = ({
  townFridges,
  sendText,
  setError,
  user,
  sent,
  getStoredText,
  storedText,
}: SendTextProps & ScreenProps) => {
  const [page, setPage] = useState(0);
  const [fridge, setFridge] = useState<number | undefined>();
  const [mealCount, setMealCount] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<PhotoFile | undefined>();
  const [restaurants, setRestaurants] = useState('');
  const [usingStoredText, setUsingStoredText] = useState(false);

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
    setPage(0);
    setRestaurants('');
    setFridge(undefined);
    setMealCount('');
    setName('');
    setPhoto(undefined);
    setFieldValid(false);
    setUsingStoredText(false);
  };

  useEffect(() => {
    if (user.busDriver) {
      if (storedText === undefined) {
        setLoading(true);
        getStoredText();
      } else {
        setLoading(false);
      }
    }
  }, [getStoredText, storedText, user, setLoading]);

  useEffect(() => {
    if (sent) {
      setLoading(false);
    }
  }, [sent, setLoading]);

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

  const getChef = () => {
    if (!user.busDriver) {
      return 'CK Home Chef volunteers';
    }
    return restaurants;
  };

  const message =
    fridge !== undefined && townFridges
      ? `Hello! ${
          townFridges[fridge].name
        } Town Fridge${getAddress()} has been stocked with ${mealCount} meals, made with love by ${getChef()}! Please take only what you need, and leave the rest to share. The meal today is ${name}. Please respond to this message with any feedback. Enjoy!`
      : '';

  const prevPage = () => {
    // fix this
    if (storedText?.photoUrl && page === 5) {
      return setPage(3);
    }
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
      case 0:
        if (!user.busDriver) {
          setPage(1);
        }
        if (usingStoredText) {
          setRestaurants(storedText.restaurants);
          setName(storedText.name);
          setPage(2);
        }
        if (storedText) {
          return <UseStoredText setUsingStoredText={setUsingStoredText} />;
        }
        validateField(!!restaurants);
        return (
          <EnterRestaurants
            next={nextPage}
            restaurants={restaurants}
            setRestaurants={setRestaurants}
          />
        );
      case 1:
        if (usingStoredText) {
          setUsingStoredText(false);
          setPage(0);
        }
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
        if (storedText?.photoUrl) {
          nextPage();
        }
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
                sendText(
                  message,
                  townFridges[fridge].region,
                  photoToSend,
                  name,
                  restaurants,
                );
                clearState();
              }
            }}
            onCancel={clearState}
          />
        );
      default:
        return <Text>An Error Occurred. Restart the App.</Text>;
    }
  };

  const renderNav = () => {
    const nextBtn = (
      <Btn
        onPress={nextPage}
        onError={() => {
          setError('You must enter a value to proceed');
        }}
        style={styles.sendTextNavBtn}
        disabled={!fieldValid}>
        <Arrow />
      </Btn>
    );

    const backBtn = (
      <Btn style={styles.sendTextNavBtn} onPress={prevPage}>
        <Arrow style={[styles.leftArrow]} />
      </Btn>
    );

    const isFirstPage =
      (user.busDriver && page === 0) || (!user.busDriver && page === 1);
    const isLastPage = page === 5;
    const firstPageStyle = isFirstPage ? styles.sendTextNavEnd : {};

    return (
      <View style={[styles.sendTextNav, firstPageStyle]}>
        {!isFirstPage && backBtn}
        {!isLastPage && nextBtn}
      </View>
    );
  };

  const outsideAllowableHours =
    parseInt(format(new Date(), 'H'), 10) > 19 ||
    parseInt(format(new Date(), 'H'), 10) < 8;

  if (loading) {
    return <Loading />;
  }

  if (outsideAllowableHours) {
    return (
      <View style={styles.sendText}>
        <Disabled />
      </View>
    );
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
  return {
    townFridges: state.text.townFridges,
    sent: state.text.sent,
    user: state.auth.user,
    storedText: state.text.stored,
  };
};

export default connect(mapStateToProps, {
  sendText: sendTextAction,
  getFridges: getFridgesAction,
  setError: setErrorAction,
  getStoredText: getStoredTextAction,
})(SendText);
