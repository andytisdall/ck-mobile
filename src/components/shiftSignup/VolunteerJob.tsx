import {format, utcToZonedTime} from 'date-fns-tz';
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Platform, UIManager, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {SignupStackParamsList} from './Signup';
import styles from './styles';
import {Job, Shift} from './VolunteerJobsList';
import {RootState} from '../../state/Root';
import Loading from '../reusable/Loading';
import Btn from '../reusable/Btn';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ScreenProps = NativeStackScreenProps<SignupStackParamsList, 'Fridge'>;

const VolunteerJob = ({
  jobs,
  shifts,
  route,
  navigation,
}: {
  jobs: Job[];
  shifts: Record<string, Shift>;
} & ScreenProps) => {
  const {jobId} = route.params;

  const job = jobs?.find(j => j.id === jobId);

  const renderShifts = () => {
    if (!job) {
      return;
    }
    const jobShifts = job.shifts.map(id => shifts[id]);
    // /{`job-date ${shift.open ? '' : 'job-date-full'}`}
    return jobShifts
      .sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
      .map(shift => {
        return (
          <View style={styles.shift} key={shift.id}>
            <View style={styles.shiftLeft}>
              {shift.open ? (
                <Btn
                  style={styles.signupBtn}
                  onPress={() =>
                    navigation.navigate('ShiftDetail', {shiftId: shift.id})
                  }>
                  <Text style={styles.signupBtnText}>Sign Up</Text>
                </Btn>
              ) : (
                <Text style={styles.fullShift}>full</Text>
              )}
              <Text style={styles.jobDate}>
                {format(
                  utcToZonedTime(shift.startTime, 'America/Los_Angeles'),
                  'M/d/yy',
                )}
              </Text>
              <Text>
                {format(
                  utcToZonedTime(shift.startTime, 'America/Los_Angeles'),
                  'eeee',
                )}
              </Text>
            </View>
            <Text style={styles.jobNameSmall}>{job.name}</Text>
          </View>
        );
      });
  };

  if (!job) {
    return <Loading />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.homeChef}>
        <View style={styles.jobHeader}>
          <Text style={[styles.jobName]}>{job.name}</Text>
          {!job.active && <Text>Out of Service</Text>}
        </View>
        <View style={styles.shiftList}>
          <Text style={styles.location}>Location: {job.location}</Text>

          <View>{renderShifts()}</View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: RootState) => {
  return {shifts: state.homeChef.shifts, jobs: state.homeChef.jobs};
};

export default connect(mapStateToProps)(VolunteerJob);
