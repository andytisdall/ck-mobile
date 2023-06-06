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
import {SafeAreaView} from 'react-native-safe-area-context';

import SendText from './src/components/text/SendText';
import Popup from './src/components/reusable/Popup';
import Root from './src/state/Root';
import styles from './src/baseStyles';

// import { NavigationContainer } from '@react-navigation/native';
// import { navigationRef } from './RootNavigation';

const Stack = createNativeStackNavigator();

const BaseComponent = ({children}: {children: React.ReactNode}) => {
  return (
    <SafeAreaView style={styles.app}>
      <Popup />
      {children}
    </SafeAreaView>
  );
};

const RenderBaseComponent = () => (
  <BaseComponent>
    <SendText />
  </BaseComponent>
);

function App(): JSX.Element {
  return (
    <Root initialState={{}}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Text" component={RenderBaseComponent} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Root>
  );
}

export default App;
