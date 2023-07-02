import {connect} from 'react-redux';
import {format} from 'date-fns';
import React, {useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text, Pressable} from 'react-native';
import {TextInput} from 'react-native-paper';

import {RootState} from '../../state/Root';
import {RootStackParamList} from '../../../App';
import {Hours} from '../shiftSignup/Confirmation';
import * as actions from '../../actions';
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
      <div className="chef-cancel">
        <label htmlFor="cancel">{text}</label>
        <input
          type="checkbox"
          id="cancel"
          value={cancel}
          onChange={e => setCancel(e.target.checked)}
        />
      </div>
    );
  };

  const meals = cancel ? 0 : mealCount;

  if (!hour) {
    return <div>This shift cannot be edited.</div>;
  }

  return (
    <View>
      <Text>Edit Home Chef Delivery Details</Text>
      <Text>Date: {format(new Date(hour.time), 'M/d/yy')}</Text>

      <Text>Number of Meals:</Text>
      <TextInput
        keyboardType="numeric"
        value={meals}
        onChange={e => setMealCount(e.target.value)}
      />
      {renderCancel()}
      {loading ? <Loading /> : <button onClick={onSubmit}>Submit</button>}
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {hours: state.homeChef.hours};
};

export default connect(mapStateToProps, actions)(EditShift);
