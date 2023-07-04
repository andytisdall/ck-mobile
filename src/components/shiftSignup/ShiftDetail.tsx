import {useState} from 'react';
import {connect} from 'react-redux';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, ScrollView, Pressable} from 'react-native';
import {format} from 'date-fns';
import {TextInput} from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {RootState} from '../../state/Root';
import {signUpForShift as signUpForShiftAction} from '../../actions';
import Loading from '../reusable/Loading';
import useLoading from '../../hooks/useLoading';
import {RootStackParamList} from '../../../App';
import {Job, Shift} from './VolunteerJobsList';
import styles from './styles';
import reusableStyles from '../reusable/styles';
import {placeholderColor} from '../text/styles';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'ShiftDetail'>;

interface ShiftDetailProps {
  jobs: Job[];
  shifts: Record<string, Shift>;
  signUpForShift: (
    shiftId: string,
    mealCount: string,
    jobId: string,
    date: string,
    soup: boolean,
  ) => void;
}

const ShiftDetail = ({
  jobs,
  shifts,
  signUpForShift,
  route,
}: ShiftDetailProps & ScreenProps) => {
  const [mealCount, setMealCount] = useState('');
  const [soup, setSoup] = useState(false);
  const [loading, setLoading] = useLoading();

  const {shiftId} = route.params;

  if (!shifts || !jobs) {
    return <Loading />;
  }

  const shift = shifts[shiftId];
  const job = jobs.find(j => j.id === shift.job);

  const disabled = !mealCount || parseInt(mealCount, 10) < 1;

  const onSubmit = () => {
    if (!disabled) {
      setLoading(true);
      signUpForShift(shiftId, mealCount, job!.id, shift.startTime, soup);
    }
  };

  const disabledStyle = disabled ? styles.disabled : undefined;

  if (!shift.open) {
    return <Text>This shift is not available for signup</Text>;
  }
  if (!job) {
    return (
      <View>
        <Text>Job Not Found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.homeChef}>
        <View style={styles.signupDetail}>
          <View style={styles.signupDetailInfo}>
            <View style={styles.signupField}>
              <Text>Date:</Text>
              <Text style={styles.shiftDetailHeader}>
                {format(new Date(shift.startTime), 'eeee, M/d/yy')}
              </Text>
            </View>

            <View style={styles.signupField}>
              <Text>Fridge:</Text>
              <Text style={styles.shiftDetailHeader}>{job.name}</Text>
            </View>
            <Text>{job.location}</Text>

            <View style={styles.signupFields}>
              <View style={styles.signupField}>
                <TextInput
                  keyboardType="numeric"
                  placeholder="25"
                  placeholderTextColor={placeholderColor}
                  value={mealCount}
                  onChangeText={setMealCount}
                  style={styles.mealCountInput}
                />
                <View style={styles.signupFieldText}>
                  <Text>Number of Meals You Plan to Deliver</Text>
                  <Text>(You can change this later)</Text>
                </View>
              </View>
              <View style={styles.signupField}>
                <BouncyCheckbox
                  onPress={(isChecked: boolean) => setSoup(isChecked)}
                  fillColor="rgb(100,100,250)"
                  unfillColor="white"
                  style={styles.checkbox}
                />
                <Text>This meal is soup</Text>
              </View>
            </View>
          </View>

          <Text style={styles.signupSubmitText}>
            Click submit to sign up for this slot
          </Text>

          {loading ? (
            <Loading />
          ) : (
            <Pressable
              style={[styles.submitBtn, disabledStyle]}
              onPress={onSubmit}>
              <Text style={reusableStyles.btnText}>Submit</Text>
            </Pressable>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    jobs: state.homeChef.jobs,
    shifts: state.homeChef.shifts,
  };
};

export default connect(mapStateToProps, {signUpForShift: signUpForShiftAction})(
  ShiftDetail,
);
