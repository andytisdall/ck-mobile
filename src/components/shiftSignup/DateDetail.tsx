import {View, Text, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './styles';
import {Shift, Job} from './VolunteerJobsList';
import {RootStackParamList} from '../../../App';
import {RootState} from '../../state/Root';
import Loading from '../reusable/Loading';
import {format} from 'date-fns';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'DateDetail'>;

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
          style={styles.jobContainer}
          onPress={() =>
            navigation.navigate('ShiftDetail', {shiftId: shift.id})
          }>
          <Text style={styles.jobName}>{job?.name}</Text>
          <Text>{job?.location}</Text>
        </Pressable>
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.homeChef}>
        <Text style={[styles.jobContainer, styles.signupTitle]}>
          {format(new Date(date), 'eeee, M/d/yy')}
        </Text>
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
