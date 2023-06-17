import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text, Pressable} from 'react-native';
import {TextInput} from 'react-native-paper';

import styles from './styles';
import './SignIn.css';
import * as actions from '../../actions';
import useLoading from '../../hooks/useLoading';
import Loading from '../reusable/Loading';
import {RootState} from '../../state/Root';

const SignIn = ({
  signIn,
  user,
}: {
  signIn: (username: string, password: string) => void;
  user: {username: string};
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useLoading();

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user, setLoading]);

  const handleSubmit = () => {
    setLoading(true);
    signIn(username, password);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <Pressable style={styles.signinButton} onPress={handleSubmit}>
        <Text style={styles.signinTitle}>Sign In</Text>
      </Pressable>
      <View style={styles.signinFields}>
        <TextInput
          style={styles.authInput}
          value={username}
          onChangeText={setUsername}
          textColor="black"
          placeholder="Username"
          blurOnSubmit
          returnKeyType="next"
        />{' '}
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
      </View>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {user: state.auth.user};
};

export default connect(mapStateToProps, actions)(SignIn);
