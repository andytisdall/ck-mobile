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

import ShiftSignup from './src/components/shiftSignup/ShiftSignup';
import Home from './src/components/Home';
import SendText from './src/components/text/SendText';
import TextSuccess from './src/components/text/TextSuccess';
import Popup from './src/components/reusable/Popup';
import SignIn from './src/components/auth/Signin';
import Root from './src/state/Root';
import styles from './src/baseStyles';
import {RootState} from './src/state/Root';
import VolunteerJob from './src/components/shiftSignup/VolunteerJob';
import DateDetail from './src/components/shiftSignup/DateDetail';
import ShiftDetail from './src/components/shiftSignup/ShiftDetail';
import {navigationRef} from './src/RootNavigation';
import Confirmation from './src/components/shiftSignup/Confirmation';

const mapStateToProps = (state: RootState) => {
  return {user: state.auth.user};
};

const placeHolderBackBtn = () => <></>;

GoogleSignin.configure({
  iosClientId:
    '385802469502-ahjvbdemirgu21ur31n80og3c67k1i7f.apps.googleusercontent.com',
});

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  Text: undefined;
  Fridge: {jobId: string};
  Signup: undefined;
  TextSuccess: undefined;
  DateDetail: {shiftIds: string[]; date: string};
  ShiftDetail: {shiftId: string};
  SignupConfirm: {hoursId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = ({user}: {user: {username: string}}) => {
  return (
    <SafeAreaView style={styles.app}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {!user ? (
            <Stack.Screen name="SignIn" component={SignIn} />
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Text" component={SendText} />
              <Stack.Screen
                name="TextSuccess"
                component={TextSuccess}
                options={{
                  headerLeft: placeHolderBackBtn,
                }}
              />
              <Stack.Screen name="Signup" component={ShiftSignup} />
              <Stack.Screen name="Fridge" component={VolunteerJob} />
              <Stack.Screen name="DateDetail" component={DateDetail} />
              <Stack.Screen name="ShiftDetail" component={ShiftDetail} />
              <Stack.Screen name="SignupConfirm" component={Confirmation} />
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
