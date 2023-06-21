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
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

import Home from './src/components/Home';
import SendText from './src/components/text/SendText';
import TextSuccess from './src/components/text/TextSuccess';
import Popup from './src/components/reusable/Popup';
import SignIn from './src/components/auth/Signin';
import Root from './src/state/Root';
import styles from './src/baseStyles';
import {RootState} from './src/state/Root';

// import { NavigationContainer } from '@react-navigation/native';
// import { navigationRef } from './RootNavigation';

const Stack = createNativeStackNavigator();

const mapStateToProps = (state: RootState) => {
  return {user: state.auth.user};
};

const placeHolderBackBtn = () => <></>;

const AppContainer = ({user}: {user: {username: string}}) => {
  return (
    <SafeAreaView style={styles.app}>
      <NavigationContainer>
        <Stack.Navigator>
          {!user ? (
            <Stack.Screen name="SignIn" component={SignIn} />
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Text" component={SendText} />
              <Stack.Screen
                name="Text-Success"
                component={TextSuccess}
                options={{
                  headerLeft: placeHolderBackBtn,
                }}
              />
            </>
          )}
        </Stack.Navigator>
        <Popup />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const ConnectedAppContainer = connect(mapStateToProps)(AppContainer);

function App(): JSX.Element {
  return (
    <Root initialState={{}}>
      <PaperProvider>
        <ConnectedAppContainer />
      </PaperProvider>
    </Root>
  );
}

export default App;
