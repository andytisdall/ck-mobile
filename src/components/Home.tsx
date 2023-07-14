import {Text, View, Pressable, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import React, {useEffect} from 'react';

import {colors} from './shiftSignup/styles';
import {
  getUserInfo as getUserInfoAction,
  signOut as signOutAction,
} from '../actions';
import Title from './reusable/Title';
import {RootState} from '../state/Root';

const Home = ({
  user,
  signOut,
  getUserInfo,
}: {
  navigation: {push: (name: string) => void};
  user: {username: string; firstName?: string; lastName?: string};
  signOut: () => void;
  getUserInfo: () => void;
}) => {
  useEffect(() => {
    if (!user.firstName) {
      getUserInfo();
    }
  }, [user, getUserInfo]);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.home}>
        <Title />
        <View style={styles.homeContent}>
          <View style={styles.homeInfo}>
            <Text style={styles.homeTitleText}>
              Use the navigation buttons at the bottom of the screen to:
            </Text>
            <Text style={styles.homeInfoText}>
              Send a Text Alert about your Town Fridge delivery
            </Text>
            <Text style={styles.homeInfoText}>
              Sign Up for Town Fridge Deliveries
            </Text>
            <Text style={styles.homeInfoText}>
              See and edit your upcoming and past deliveries
            </Text>
          </View>
          <View>
            <Text style={styles.homeTitleText}>Signed in as</Text>
            <Text style={styles.homeTitleText}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Pressable style={styles.signOutBtn} onPress={signOut}>
              <Text style={styles.signOutBtnText}>Sign Out</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: colors.beige,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  homeContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  homeTitleText: {
    fontSize: 20,
    textAlign: 'center',
  },
  signOutBtn: {
    backgroundColor: 'purple',
    borderRadius: 50,
    borderWidth: 1,
    padding: 15,
    marginTop: 10,
    alignSelf: 'center',
  },
  signOutBtnText: {
    color: 'white',
    textAlign: 'center',
  },
  scrollView: {
    minHeight: '100%',
  },
  homeInfo: {
    flex: 1,
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  homeInfoText: {
    fontSize: 15,
    textAlign: 'center',
  },
});

const mapStateToProps = (state: RootState) => {
  return {user: state.auth.user};
};

export default connect(mapStateToProps, {
  signOut: signOutAction,
  getUserInfo: getUserInfoAction,
})(Home);
