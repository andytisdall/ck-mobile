import {Text, View, Pressable, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import React, {useEffect} from 'react';

import {
  getUserInfo as getUserInfoAction,
  signOut as signOutAction,
} from '../actions';
import Title from './reusable/Title';
import Btn from './reusable/Btn';
import {RootState} from '../state/Root';

const Home = ({
  navigation,
  user,
  signOut,
  getUserInfo,
}: {
  navigation: {push: (name: string) => void};
  user: {username: string; firstName?: string};
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
        {/* <Pressable onPress={() => navigation.push('Signup')}>
          {({pressed}) => {
            const btnStyle: any[] = [styles.btn];
            if (pressed) {
              btnStyle.push(styles.btnPressed);
            }
            return (
              <View style={btnStyle}>
                <Text style={styles.btnText}>
                  Sign Up for a Town Fridge Delivery
                </Text>
              </View>
            );
          }}
        </Pressable> */}
        <Btn style={styles.btnColor} onPress={() => navigation.push('Signup')}>
          <Text style={styles.btnText}>Sign Up for a Town Fridge Delivery</Text>
        </Btn>
        {/* <Pressable style={styles.btn} onPress={() => navigation.push('Chef')}> */}
        <Btn style={styles.btnColor} onPress={() => navigation.push('Chef')}>
          <Text style={styles.btnText}>
            See Your Past and Upcoming Deliveries
          </Text>
        </Btn>
        {/* </Pressable> */}
        {/* <Pressable style={styles.btn} onPress={() => navigation.push('Text')}> */}
        <Btn onPress={() => navigation.push('Text')} style={styles.btnColor}>
          <Text style={styles.btnText}>Send a Text Alert</Text>
        </Btn>
        {/* </Pressable> */}

        <View>
          <Text style={styles.homeText}>Signed in as {user?.username}</Text>
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
    backgroundColor: 'rgb(200, 150, 110)',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  homeText: {
    fontSize: 15,
    textAlign: 'center',
  },
  signOutBtn: {
    backgroundColor: 'purple',
    borderRadius: 50,
    borderWidth: 1,
    padding: 5,
    marginTop: 10,
  },
  signOutBtnText: {
    color: 'white',
    textAlign: 'center',
  },
  scrollView: {
    minHeight: '100%',
  },
  btnColor: {backgroundColor: 'rgba(100, 70, 130, 1)'},

  btnText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  btnPressed: {
    backgroundColor: 'rgba(150, 130, 180, 1)',
  },
});

const mapStateToProps = (state: RootState) => {
  return {user: state.auth.user};
};

export default connect(mapStateToProps, {
  signOut: signOutAction,
  getUserInfo: getUserInfoAction,
})(Home);
