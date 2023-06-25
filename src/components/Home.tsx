import {Text, View, Pressable, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import React from 'react';

import Title from './reusable/Title';
import reusableStyles from './reusable/styles';
import {RootState} from '../state/Root';
import {signOut as signOutAction} from '../actions';

const Home = ({
  navigation,
  user,
  signOut,
}: {
  navigation: {push: (name: string) => void};
  user: {username: string};
  signOut: () => void;
}) => {
  return (
    <View style={styles.home}>
      <Title />
      <Pressable
        style={reusableStyles.btn}
        onPress={() => navigation.push('Text')}>
        <Text style={reusableStyles.btnText}>Send a Text Alert</Text>
      </Pressable>
      <View>
        <Text style={styles.homeText}>Signed in as {user?.username}</Text>
        <Pressable style={styles.signOutBtn} onPress={signOut}>
          <Text style={styles.signOutBtnText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: 'rgb(200, 150, 110)',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 50,
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
});

const mapStateToProps = (state: RootState) => {
  return {user: state.auth.user};
};

export default connect(mapStateToProps, {signOut: signOutAction})(Home);
