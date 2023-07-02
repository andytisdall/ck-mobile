import {format} from 'date-fns';
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Pressable, Platform, UIManager} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../../App';
import styles from './styles';
import {Job, Shift} from './VolunteerJobsList';
import {RootState} from '../../state/Root';
import Loading from '../reusable/Loading';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Fridge'>;

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
                <Pressable
                  style={styles.signupBtn}
                  onPress={() =>
                    navigation.navigate('ShiftDetail', {shiftId: shift.id})
                  }>
                  <Text style={styles.signupBtnText}>Sign Up</Text>
                </Pressable>
              ) : (
                <Text>full</Text>
              )}
              <Text style={styles.jobDate}>
                {format(new Date(shift.startTime), 'M/d/yy')}
              </Text>
              <Text>{format(new Date(shift.startTime), 'eeee')}</Text>
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
    <View style={styles.jobContainer}>
      <View style={styles.jobHeader}>
        <Text style={[styles.jobName]}>{job.name}</Text>
        {!job.active && <Text>Out of Service</Text>}
      </View>
      <View style={styles.shiftList}>
        <Text style={styles.location}>Location: {job.location}</Text>

        <View>{renderShifts()}</View>
      </View>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {shifts: state.homeChef.shifts, jobs: state.homeChef.jobs};
};

export default connect(mapStateToProps)(VolunteerJob);
