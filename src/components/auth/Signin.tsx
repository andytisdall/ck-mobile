import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text, Pressable} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import {signIn as signInAction, getUser as getUserAction} from '../../actions';
import useLoading from '../../hooks/useLoading';
import Loading from '../reusable/Loading';
import {RootState} from '../../state/Root';

const SignIn = ({
  signIn,
  user,
  navigation,
  getUser,
}: {
  signIn: (username: string, password: string) => void;
  user: {username: string};
  navigation: {push: (name: string) => void};
  getUser: () => Promise<void>;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useLoading(true);

  useEffect(() => {
    const checkForUser = async () => {
      const token = await AsyncStorage.getItem('ck-token');
      if (token) {
        getUser();
      } else {
        setLoading(false);
      }
    };
    checkForUser();
  }, [getUser, setLoading]);

  useEffect(() => {
    if (user) {
      navigation.push('Text');
    }
  }, [user, navigation]);

  const handleSubmit = () => {
    setLoading(true);
    signIn(username, password);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <View style={styles.signinFields}>
        <TextInput
          style={styles.authInput}
          value={username}
          onChangeText={setUsername}
          textColor="black"
          placeholder="Username"
          blurOnSubmit
          returnKeyType="next"
        />
        <TextInput
          style={styles.authInput}
          value={password}
          onChangeText={setPassword}
          textColor="black"
          placeholder="Password"
          blurOnSubmit
          returnKeyType="next"
        />
        <Text>{!!user && user.username}</Text>
        <Pressable style={styles.signinButton} onPress={handleSubmit}>
          <Text style={styles.signinTitle}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {user: state.auth.user};
};

export default connect(mapStateToProps, {
  signIn: signInAction,
  getUser: getUserAction,
})(SignIn);
