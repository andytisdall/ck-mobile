import {format, utcToZonedTime} from 'date-fns-tz';
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Platform, UIManager, FlatList} from 'react-native';
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
    const jobShifts = job.shifts
      .map(id => shifts[id])
      .sort((a, b) => (a.startTime > b.startTime ? 1 : -1));

    const renderShift = ({item}: {item: Shift}) => {
      return (
        <View style={styles.shift} key={item.id}>
          <View style={styles.shiftSignupBtnContainer}>
            {item.open ? (
              <Btn
                style={styles.signupBtn}
                onPress={() =>
                  navigation.navigate('ShiftDetail', {shiftId: item.id})
                }>
                <Text style={styles.signupBtnText}>Sign Up</Text>
              </Btn>
            ) : (
              <Text style={styles.fullShift}>full</Text>
            )}
          </View>

          <Text style={styles.jobDate}>
            {format(
              utcToZonedTime(item.startTime, 'America/Los_Angeles'),
              'M/d/yy',
            )}
          </Text>
          <Text>
            {format(
              utcToZonedTime(item.startTime, 'America/Los_Angeles'),
              'eeee',
            )}
          </Text>
        </View>
      );
    };
    return (
      <FlatList
        style={styles.shiftList}
        data={jobShifts}
        renderItem={renderShift}
      />
    );
  };

  if (!job) {
    return <Loading />;
  }

  return (
    <View style={styles.scrollView}>
      <View style={styles.homeChef}>
        <View style={styles.jobHeader}>
          <Text style={[styles.jobName]}>{job.name}</Text>
          {!job.active && <Text>Out of Service</Text>}
        </View>
        <View>
          <Text style={styles.location}>Location: {job.location}</Text>

          {renderShifts()}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {shifts: state.homeChef.shifts, jobs: state.homeChef.jobs};
};

export default connect(mapStateToProps)(VolunteerJob);
