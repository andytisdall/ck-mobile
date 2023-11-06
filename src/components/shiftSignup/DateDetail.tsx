import {View, Text, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {zonedTimeToUtc, format} from 'date-fns-tz';

import styles from './styles';
import {Shift, Job} from './VolunteerJobsList';
import {SignupStackParamsList} from './Signup';
import {RootState} from '../../state/Root';
import Loading from '../reusable/Loading';

type ScreenProps = NativeStackScreenProps<SignupStackParamsList, 'DateDetail'>;

const DateDetail = ({
  route,
  shifts,
  jobs,
  navigation,
}: {shifts: Record<string, Shift>; jobs: Job[]} & ScreenProps) => {
  const {shiftIds, date} = route.params;
  if (!shifts) {
    return <Loading />;
  }
  const dateShifts = shiftIds.map(id => shifts[id]);
  if (shifts && !dateShifts.length) {
    return <View>Shift Not Found</View>;
  }

  const renderShifts = () => {
    return dateShifts.map(shift => {
      const job = jobs.find(j => j.id === shift.job);
      return (
        <Pressable
          key={shift.id}
          onPress={() =>
            navigation.navigate('ShiftDetail', {shiftId: shift.id})
          }>
          {({pressed}) => {
            const btnStyle: any[] = [styles.jobContainer];
            if (pressed) {
              btnStyle.push(styles.highlight);
            }
            return (
              <View style={btnStyle}>
                <Text style={styles.jobName}>{job?.name}</Text>
                <Text>{job?.location}</Text>
              </View>
            );
          }}
        </Pressable>
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.homeChef}>
        <Text style={[styles.jobContainer, styles.signupTitle]}>
          {format(zonedTimeToUtc(date, 'America/Los_Angeles'), 'eeee, M/d/yy')}
        </Text>
        <Text style={styles.signupTitle}>Available Fridges</Text>
        {renderShifts()}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    shifts: state.homeChef.shifts,
    jobs: state.homeChef.jobs,
  };
};

export default connect(mapStateToProps)(DateDetail);
