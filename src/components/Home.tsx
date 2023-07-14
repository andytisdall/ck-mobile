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

        {/* <Btn style={styles.btnColor} onPress={() => navigation.push('Signup')}>
          <Text style={styles.btnText}>Sign Up for a Town Fridge Delivery</Text>
        </Btn>
        <Btn style={styles.btnColor} onPress={() => navigation.push('Chef')}>
          <Text style={styles.btnText}>
            See Your Past and Upcoming Deliveries
          </Text>
        </Btn>
        <Btn onPress={() => navigation.push('Text')} style={styles.btnColor}>
          <Text style={styles.btnText}>Send a Text Alert</Text>
        </Btn> */}

        <View style={styles.homeContent}>
          <Text style={styles.homeText}>Signed in as</Text>
          <Text style={styles.homeText}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Pressable style={styles.signOutBtn} onPress={signOut}>
            <Text style={styles.signOutBtnText}>Sign Out</Text>
          </Pressable>
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
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  homeContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  homeText: {
    fontSize: 25,
    textAlign: 'center',
    padding: 10,
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
});

const mapStateToProps = (state: RootState) => {
  return {user: state.auth.user};
};

export default connect(mapStateToProps, {
  signOut: signOutAction,
  getUserInfo: getUserInfoAction,
})(Home);
