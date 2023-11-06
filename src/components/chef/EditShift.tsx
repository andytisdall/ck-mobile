import {connect} from 'react-redux';
import {format, utcToZonedTime} from 'date-fns-tz';
import React, {useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import Btn from '../reusable/Btn';
import {RootState} from '../../state/Root';
import {ChefStackParamsList} from './Chef';
import {Hours} from '../shiftSignup/Confirmation';
import {
  getHours as getHoursAction,
  editHours as editHoursAction,
  getShifts as getShiftsAction,
} from '../../actions';
import Loading from '../reusable/Loading';
import useLoading from '../../hooks/useLoading';
import styles from '../shiftSignup/styles';
import reusableStyles from '../reusable/styles';

type ScreenProps = NativeStackScreenProps<ChefStackParamsList, 'EditShift'>;

interface EditShiftProps {
  hours: Record<string, Hours>;
  getHours: () => void;
  editHours: (hoursId: string, mealCount: string, cancel: boolean) => void;
  getShifts: () => void;
}

const EditShift = ({
  hours,
  getHours,
  editHours,
  getShifts,
  route,
}: EditShiftProps & ScreenProps) => {
  const {hoursId} = route.params;
  const [mealCount, setMealCount] = useState('');
  const [cancel, setCancel] = useState(false);

  const [loading, setLoading] = useLoading();

  useEffect(() => {
    if (!hours) {
      getHours();
      getShifts();
    } else {
      setMealCount(hours[hoursId]?.mealCount);
    }
  }, [getHours, hours, hoursId, getShifts]);

  const onSubmit = () => {
    setLoading(true);
    editHours(hoursId, mealCount, cancel);
  };

  if (!hours) {
    return <Loading />;
  }

  const hour = hours[hoursId];

  const renderCancel = () => {
    let text;
    if (hour.status === 'Confirmed') {
      text = 'Check here to cancel this delivery';
    }
    if (hour.status === 'Completed') {
      text = 'Check here if you did not make this delivery';
    }
    return (
      <View style={styles.signupField}>
        <BouncyCheckbox
          onPress={(isChecked: boolean) => setCancel(isChecked)}
          fillColor="rgb(100,100,250)"
          unfillColor="white"
          style={styles.checkbox}
        />
        <View style={styles.signupFieldText}>
          <Text style={styles.confirmText}>{text}</Text>
        </View>
      </View>
    );
  };

  const meals = cancel ? 0 : mealCount;
  const disabled = (!mealCount || parseInt(mealCount, 10) < 1) && !cancel;

  if (!hour) {
    return <Text>This shift cannot be edited.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.homeChef}>
        <View style={[styles.signupDetail, styles.signupMain]}>
          <Text style={styles.signupTitle}>
            Edit Home Chef Delivery Details
          </Text>
          <View style={styles.signupFields}>
            <View style={styles.signupField}>
              <Text style={styles.confirmLabel}>Date:</Text>
              <Text style={styles.confirmText}>
                {format(
                  utcToZonedTime(new Date(hour.time), 'America/Los_Angeles'),
                  'M/d/yy',
                )}
              </Text>
            </View>
            <View style={styles.signupField}>
              <TextInput
                keyboardType="numeric"
                value={meals.toString()}
                onChangeText={setMealCount}
                style={styles.mealCountInput}
                textColor="black"
                autoFocus
              />
              <View style={styles.signupFieldText}>
                <Text style={styles.confirmText}>Number of Meals</Text>
              </View>
            </View>
            {renderCancel()}
          </View>
          <View style={styles.submitContainer}>
            {loading ? (
              <Loading />
            ) : (
              <Btn
                onPress={onSubmit}
                style={styles.submitBtn}
                disabled={disabled}>
                <Text style={reusableStyles.btnText}>Submit</Text>
              </Btn>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: RootState) => {
  return {hours: state.homeChef.hours};
};

export default connect(mapStateToProps, {
  getHours: getHoursAction,
  getShifts: getShiftsAction,
  editHours: editHoursAction,
})(EditShift);
