import {useState} from 'react';
import {connect} from 'react-redux';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, ScrollView, Pressable} from 'react-native';
import {format} from 'date-fns';
import {TextInput, Checkbox} from 'react-native-paper';

import {RootState} from '../../state/Root';
import {signUpForShift as signUpForShiftAction} from '../../actions';
import Loading from '../reusable/Loading';
import useLoading from '../../hooks/useLoading';
import {RootStackParamList} from '../../../App';
import {Job, Shift} from './VolunteerJobsList';
import styles from './styles';
import reusableStyles from '../reusable/styles';

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

  const onSubmit = () => {
    setLoading(true);
    signUpForShift(shiftId, mealCount, job!.id, shift.startTime, soup);
  };

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
        <View style={styles.signupField}>
          <Text>Signing up for:</Text>
          <Text>{format(new Date(shift.startTime), 'eeee, M/d/yy')}</Text>
        </View>
        <Text style={styles.jobName}>{job.name}</Text>
        <Text>{job.location}</Text>

        <View style={styles.signUpDetail}>
          <View>
            <View>
              <View>
                <Text>Number of Meals You Plan to Deliver:</Text>
                <Text>(You can change this later)</Text>
              </View>
              <TextInput
                keyboardType="numeric"
                placeholder="25"
                value={mealCount}
                onChangeText={setMealCount}
              />
            </View>
            <View style={styles.signupField}>
              <Checkbox
                onPress={() => setSoup(!soup)}
                status={soup ? 'checked' : 'unchecked'}
              />
              <Text>This meal is soup</Text>
            </View>
          </View>
          <Text>Click submit to sign up for this slot</Text>
          {loading ? (
            <Loading />
          ) : (
            <Pressable style={reusableStyles.btn} onPress={onSubmit}>
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
