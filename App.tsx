/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SendText from './src/components/text/SendText';
import Root from './src/state/Root';

// import { NavigationContainer } from '@react-navigation/native';
// import { navigationRef } from './RootNavigation';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Root initialState={{}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Text" component={SendText} />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}

export default App;
