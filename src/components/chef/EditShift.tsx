import {connect} from 'react-redux';
import {format} from 'date-fns';
import React, {useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, Pressable} from 'react-native';
import {Checkbox, TextInput} from 'react-native-paper';

import {RootState} from '../../state/Root';
import {RootStackParamList} from '../../../App';
import {Hours} from '../shiftSignup/Confirmation';
import {
  getHours as getHoursAction,
  editHours as editHoursAction,
  getShifts as getShiftsAction,
} from '../../actions';
import Loading from '../reusable/Loading';
import useLoading from '../../hooks/useLoading';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'EditShift'>;

interface EditShiftProps {
  hours: Record<string, Hours>;
  getHours: () => void;
  editHours: (hoursId: string, mealCount: number, cancel: boolean) => void;
  getShifts: () => void;
}

const EditShift = ({
  hours,
  getHours,
  editHours,
  getShifts,
  route,
}: EditShiftProps & ScreenProps) => {
  const {hoursId} = route.params;
  const [mealCount, setMealCount] = useState(0);
  const [cancel, setCancel] = useState(false);

  const [loading, setLoading] = useLoading();

  useEffect(() => {
    if (!hours) {
      getHours();
      getShifts();
    } else {
      setMealCount(parseInt(hours[hoursId]?.mealCount, 10));
    }
  }, [getHours, hours, hoursId, getShifts]);

  const onSubmit = () => {
    setLoading(true);
    editHours(hoursId, mealCount, cancel);
  };

  if (!hours) {
    return <Loading />;
  }

  const hour = hours[hoursId];

  const renderCancel = () => {
    let text;
    if (hour.status === 'Confirmed') {
      text = 'Check here to cancel this delivery';
    }
    if (hour.status === 'Completed') {
      text = 'Check here if you did not make this delivery';
    }
    return (
      <View>
        <Text>{text}</Text>
        <Checkbox
          onPress={() => setCancel(!cancel)}
          status={cancel ? 'checked' : 'unchecked'}
        />
      </View>
    );
  };

  const meals = cancel ? 0 : mealCount;

  if (!hour) {
    return <Text>This shift cannot be edited.</Text>;
  }

  return (
    <View>
      <Text>Edit Home Chef Delivery Details</Text>
      <Text>Date: {format(new Date(hour.time), 'M/d/yy')}</Text>

      <Text>Number of Meals:</Text>
      <TextInput
        keyboardType="numeric"
        value={meals.toString()}
        onChangeText={text => setMealCount(parseInt(text, 10))}
      />
      {renderCancel()}
      {loading ? (
        <Loading />
      ) : (
        <Pressable onPress={onSubmit}>
          <Text>Submit</Text>
        </Pressable>
      )}
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {hours: state.homeChef.hours};
};

export default connect(mapStateToProps, {
  getHours: getHoursAction,
  getShifts: getShiftsAction,
  editHours: editHoursAction,
})(EditShift);
