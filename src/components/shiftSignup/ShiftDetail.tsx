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

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'ShiftDetail'>;

interface ShiftDetailProps {
  jobs: Job[];
  shifts: Record<string, Shift>;
  signUpForShift: () => void;
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

  const onSubmit = () => {
    //shiftId, mealCount, job.id, shift.startTime, soup
    setLoading(true);
    signUpForShift();
  };

  if (!shifts || !jobs) {
    return <Loading />;
  }

  const shift = shifts[shiftId];
  const job = jobs.find(j => j.id === shift.job);

  if (!shift.open) {
    return <p>This shift is not available for signup</p>;
  }
  if (!job) {
    return (
      <View>
        <Text>Job Not Found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <Text>Signing up for:</Text>
        <Text>{format(new Date(shift.startTime), 'eeee, M/d/yy')}</Text>
        <Text>{job.name}</Text>
        <Text>{job.location}</Text>

        <View>
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
            <View>
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
            <Pressable onPress={onSubmit}>
              <Text>Submit</Text>
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
