import {connect} from 'react-redux';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, Pressable} from 'react-native';
import {format} from 'date-fns';

import {
  getHours as getHoursAction,
  signUpForShift as signUpForShiftAction,
  getShifts as getShiftsAction,
} from '../../actions';
import {RootStackParamList} from '../../../App';
import {RootState} from '../../state/Root';
import Loading from '../reusable/Loading';
import {Job} from './VolunteerJobsList';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'SignupConfirm'>;

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
        <View>
          <Text>You have successfully signed up for this shift:</Text>
          <View>
            <View>
              <Text>Date:</Text>
              <Text>{format(new Date(hour.time), 'eeee, M/d/yy')}</Text>
            </View>
            <View>
              <Text>Fridge:</Text>
              <Text>{job.name}</Text>
            </View>
            <View>
              <Text>Location:</Text>
              <Text>{job.location}</Text>
            </View>
            <View>
              <Text>Number of Meals:</Text>
              <Text>{hour.mealCount}</Text>
            </View>
          </View>
          <Text>You have been sent an email with this information.</Text>
        </View>
      );
    } else {
      return <Text>Could not find the details of this shift.</Text>;
    }
  };

  return (
    <View>
      <Text>Home Chef Sign Up Confirmation</Text>
      {!jobs || !hours ? <Loading /> : renderShiftDetails()}
      <Pressable>
        <Text onPress={() => navigation.navigate('Signup')}>
          Sign Up for More Shifts
        </Text>
      </Pressable>
      <Pressable>
        <Text>See your future and past shifts</Text>
      </Pressable>
    </View>
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
