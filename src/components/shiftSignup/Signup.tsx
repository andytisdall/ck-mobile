import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BlankHeaderLeft from '../reusable/BlankHeaderLeft';
import ShiftSignup from './ShiftSignup';
import VolunteerJob from './VolunteerJob';
import DateDetail from './DateDetail';
import ShiftDetail from './ShiftDetail';
import Confirmation from './Confirmation';

export type SignupStackParamsList = {
  Fridge: {jobId: string};
  ShiftSignup: undefined;
  DateDetail: {shiftIds: string[]; date: string};
  ShiftDetail: {shiftId: string};
  SignupConfirm: {hoursId: string};
};

const Stack = createNativeStackNavigator<SignupStackParamsList>();

const Signup = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ShiftSignup" component={ShiftSignup} />
      <Stack.Screen name="Fridge" component={VolunteerJob} />
      <Stack.Screen name="DateDetail" component={DateDetail} />
      <Stack.Screen
        name="ShiftDetail"
        component={ShiftDetail}
        options={{headerTitle: 'Sign Up for a Delivery'}}
      />
      <Stack.Screen
        name="SignupConfirm"
        component={Confirmation}
        options={{
          headerLeft: BlankHeaderLeft,
        }}
      />
    </Stack.Navigator>
  );
};

export default Signup;
