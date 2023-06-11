/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';
import {ScrollView, View} from 'react-native';

import SendText from './src/components/text/SendText';
import TextSuccess from './src/components/text/Text-Success';
import Popup from './src/components/reusable/Popup';
import Root from './src/state/Root';
import styles from './src/baseStyles';

// import { NavigationContainer } from '@react-navigation/native';
// import { navigationRef } from './RootNavigation';

const Stack = createNativeStackNavigator();

export const BaseComponent = ({children}: {children: React.ReactNode}) => {
  return (
    <View style={styles.app}>
      <ScrollView style={styles.scrollView}>
        <Popup />
        {children}
      </ScrollView>
    </View>
  );
};

function App(): JSX.Element {
  return (
    <Root initialState={{}}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Text" component={SendText} />
            <Stack.Screen name="Text-Success" component={TextSuccess} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Root>
  );
}

export default App;
