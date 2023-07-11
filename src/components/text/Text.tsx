import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import SendText from './SendText';
import TextSuccess from './TextSuccess';
import BlankHeaderLeft from '../reusable/BlankHeaderLeft';

export type TextStackParamList = {
  SendText: undefined;
  TextSuccess: undefined;
};

const Stack = createNativeStackNavigator<TextStackParamList>();

const Text = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SendText"
        component={SendText}
        options={{
          headerLeft: BlankHeaderLeft,
        }}
      />
      <Stack.Screen
        name="TextSuccess"
        component={TextSuccess}
        options={{
          headerLeft: BlankHeaderLeft,
        }}
      />
    </Stack.Navigator>
  );
};

export default Text;
