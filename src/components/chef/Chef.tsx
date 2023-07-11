import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import ChefShifts from './ChefShifts';
import EditShift from './EditShift';

export type ChefStackParamsList = {
  ChefShifts: undefined;
  EditShift: {
    hoursId: string;
  };
};

const Stack = createNativeStackNavigator<ChefStackParamsList>();

const Chef = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChefShifts" component={ChefShifts} />
      <Stack.Screen name="EditShift" component={EditShift} />
    </Stack.Navigator>
  );
};

export default Chef;
