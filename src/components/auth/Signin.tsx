import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Pressable,
  TextInput as NativeTextInput,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  GoogleSigninButton,
  User,
} from '@react-native-google-signin/google-signin';

import styles from './styles';
import {
  signIn as signInAction,
  getUser as getUserAction,
  googleSignIn as googleSignInAction,
} from '../../actions';
import useLoading from '../../hooks/useLoading';
import Loading from '../reusable/Loading';
import {RootState} from '../../state/Root';
import Title from '../reusable/Title';

const SignIn = ({
  signIn,
  user,
  navigation,
  getUser,
  googleSignIn,
}: {
  signIn: (username: string, password: string) => Promise<void>;
  googleSignIn: (userInfo: User) => Promise<void>;
  user: {username: string};
  navigation: {push: (name: string) => void};
  getUser: () => Promise<void>;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useLoading(true);

  const passwordFieldRef = useRef<NativeTextInput | null>(null);

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

  const submitGoogleSignIn = async () => {
    setLoading(true);
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    googleSignIn(userInfo);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.signin}>
      <Title />
      <View style={styles.CKSignin}>
        <Text style={styles.signinText}>Sign in with your CK username</Text>

        <View style={styles.signinFields}>
          <TextInput
            style={styles.authInput}
            value={username}
            onChangeText={setUsername}
            textColor="black"
            placeholder="Username"
            blurOnSubmit
            returnKeyType="next"
            onSubmitEditing={() => {
              if (passwordFieldRef.current) {
                passwordFieldRef.current.focus();
              }
            }}
          />
          <TextInput
            style={styles.authInput}
            value={password}
            onChangeText={setPassword}
            textColor="black"
            placeholder="Password"
            blurOnSubmit
            returnKeyType="next"
            ref={passwordFieldRef}
            onSubmitEditing={handleSubmit}
            secureTextEntry
          />
          <Text>{!!user && user.username}</Text>
          <Pressable style={styles.signinBtn} onPress={handleSubmit}>
            <Text style={styles.signinBtnText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.signinText}>Or</Text>
      <View style={styles.googleSignIn}>
        <Text style={styles.signinText}>Sign in with your Google account</Text>
        <GoogleSigninButton
          onPress={submitGoogleSignIn}
          style={styles.googleSignInBtn}
        />
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
  googleSignIn: googleSignInAction,
})(SignIn);
