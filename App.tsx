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
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Signup from './src/components/shiftSignup/Signup';
import Home from './src/components/Home';
import Popup from './src/components/reusable/Popup';
import SignIn from './src/components/auth/Signin';
import Root from './src/state/Root';
import styles from './src/baseStyles';
import {RootState} from './src/state/Root';
import {navigationRef} from './src/RootNavigation';
import Chef from './src/components/chef/Chef';
import Text from './src/components/text/Text';

const mapStateToProps = (state: RootState) => {
  return {user: state.auth.user};
};

// 385802469502-io10rqtrh1lqh4vanoppuevn0abqnc0a.apps.googleusercontent.com

GoogleSignin.configure({
  iosClientId:
    '385802469502-ahjvbdemirgu21ur31n80og3c67k1i7f.apps.googleusercontent.com',
});

export type RootStackParamList = {
  SignIn: undefined;
  Main: undefined;
};

export type RootTabParamsList = {
  Signup: undefined;
  Home: undefined;
  Text: undefined;
  Chef: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamsList>();

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      detachInactiveScreens={false}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerStyle: {height: 50},
        }}
      />
      <Tab.Screen name="Text" component={Text} />
      <Tab.Screen name="Signup" component={Signup} />
      <Tab.Screen name="Chef" component={Chef} />
    </Tab.Navigator>
  );
};

const AppContainer = ({user}: {user: {username: string}}) => {
  return (
    <SafeAreaView style={styles.app}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!user ? (
            <Stack.Screen name="SignIn" component={SignIn} />
          ) : (
            <Stack.Screen name="Main" component={Main} />
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
