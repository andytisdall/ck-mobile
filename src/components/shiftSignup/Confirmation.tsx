import {connect} from 'react-redux';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, ScrollView} from 'react-native';
import {format, utcToZonedTime} from 'date-fns-tz';

import Btn from '../reusable/Btn';
import styles from './styles';
import {
  getHours as getHoursAction,
  signUpForShift as signUpForShiftAction,
  getShifts as getShiftsAction,
} from '../../actions';
import {RootTabParamsList} from '../../../App';
import {SignupStackParamsList} from './Signup';
import {RootState} from '../../state/Root';
import Loading from '../reusable/Loading';
import {Job} from './VolunteerJobsList';

type ScreenProps = NativeStackScreenProps<
  SignupStackParamsList & RootTabParamsList,
  'SignupConfirm'
>;

export interface Hours {
  id: string;
  mealCount: string;
  time: string;
  job: string;
  status: string;
  shift: string;
  campaign?: string;
}

interface ConfirmationProps {
  hours: Record<string, Hours>;
  jobs: Job[];
  getHours: () => void;
  getShifts: () => void;
}

const Confirmation = ({
  hours,
  jobs,
  getHours,
  getShifts,
  navigation,
  route,
}: ConfirmationProps & ScreenProps) => {
  const {hoursId} = route.params;
  const hour = hours && hoursId ? hours[hoursId] : null;

  useEffect(() => {
    if (!hour) {
      getHours();
    }
  }, [hour, getHours]);

  useEffect(() => {
    if (!jobs) {
      getShifts();
    }
  }, [jobs, getShifts]);

  const renderShiftDetails = () => {
    const job = jobs?.find(j => j.id === hour?.job);
    if (hour && job) {
      return (
        <View style={[styles.confirmDetail]}>
          <Text style={styles.confirmText}>
            You have successfully signed up for this shift:
          </Text>
          <View style={[styles.signupDetailInfo, styles.signupFields]}>
            <View style={styles.confirmLine}>
              <Text style={styles.confirmLabel}>Date:</Text>
              <Text style={styles.confirmText}>
                {format(
                  utcToZonedTime(new Date(hour.time), 'America/Los_Angeles'),
                  'eeee, M/d/yy',
                )}
              </Text>
            </View>
            <View style={styles.confirmLine}>
              <Text style={styles.confirmLabel}>Fridge:</Text>
              <Text style={styles.confirmText}>{job.name}</Text>
            </View>
            <View style={styles.confirmLine}>
              <Text style={styles.confirmLabel}>Location:</Text>
              <Text style={styles.confirmText}>{job.location}</Text>
            </View>
            <View style={styles.confirmLine}>
              <Text style={styles.confirmLabel}>Number of Meals:</Text>
              <Text style={styles.confirmText}>{hour.mealCount}</Text>
            </View>
          </View>
          <Text style={styles.confirmText}>
            You have been sent an email with this information.
          </Text>
        </View>
      );
    } else {
      return (
        <Text style={styles.confirmText}>
          Could not find the details of this shift.
        </Text>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.homeChef}>
        <Text style={[styles.signupTitle, styles.signupMain]}>
          Home Chef Sign Up Confirmation
        </Text>

        {!jobs || !hours ? <Loading /> : renderShiftDetails()}
        <View style={styles.confirmNav}>
          <Btn
            onPress={() => navigation.navigate('ShiftSignup')}
            style={styles.navBtn}>
            <Text style={styles.signupBtnText}>Sign Up for More Shifts</Text>
          </Btn>
          <Btn
            onPress={() => navigation.navigate('Deliveries')}
            style={styles.navBtn}>
            <Text style={styles.signupBtnText}>
              See your future and past shifts
            </Text>
          </Btn>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    hours: state.homeChef.hours,
    jobs: state.homeChef.jobs,
  };
};

export default connect(mapStateToProps, {
  signUpForShift: signUpForShiftAction,
  getHours: getHoursAction,
  getShifts: getShiftsAction,
})(Confirmation);
