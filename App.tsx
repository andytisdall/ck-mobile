/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
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
import Notifications from './src/NotificationService';
import CreateTabIcon from './src/components/tabs/TabIcon';
import CreateTabLabel from './src/components/tabs/TabLabel';

const mapStateToProps = (state: RootState) => {
  return {user: state.auth.user};
};

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
  Deliveries: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamsList>();

const header = () => {
  return <Popup />;
};

const Main = ({user}: {user: {homeChefStatus: string}}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        header,
        tabBarHideOnKeyboard: true,
      }}
      detachInactiveScreens={false}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: CreateTabIcon('home'),
          tabBarLabel: CreateTabLabel('Home'),
        }}
      />
      <Tab.Screen
        name="Text"
        component={Text}
        options={{
          tabBarIcon: CreateTabIcon('text'),
          tabBarLabel: CreateTabLabel('Text'),
        }}
      />
      {user.homeChefStatus === 'Active' && (
        <>
          <Tab.Screen
            name="Signup"
            component={Signup}
            options={{
              tabBarIcon: CreateTabIcon('signup'),
              tabBarLabel: CreateTabLabel('Signup'),
            }}
          />
          <Tab.Screen
            name="Deliveries"
            component={Chef}
            options={{
              tabBarIcon: CreateTabIcon('chef'),
              tabBarLabel: CreateTabLabel('Deliveries'),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

const ConnectedMain = connect(mapStateToProps)(Main);

const AppContainer = ({user}: {user: {username: string}}) => {
  return (
    <SafeAreaView style={styles.app}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            header,
          }}>
          {!user ? (
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{title: 'Sign in to the CK Home Chef App'}}
            />
          ) : (
            <Stack.Screen name="Main" component={ConnectedMain} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const ConnectedAppContainer = connect(mapStateToProps)(AppContainer);

function App(): JSX.Element {
  useEffect(() => {
    Notifications.listen((notification: string) => console.log(notification));
    return () => {
      try {
        Notifications.delete();
      } catch {}
    };
  });

  return (
    <Root initialState={{}}>
      <PaperProvider>
        <ConnectedAppContainer />
      </PaperProvider>
    </Root>
  );
}

Notifications.init();

export default App;
