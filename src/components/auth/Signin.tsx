import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Pressable,
  TextInput as NativeTextInput,
  Image,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GoogleSignin, User} from '@react-native-google-signin/google-signin';
import {RootTabParamsList} from '../../../App';

import reusableStyles from '../reusable/styles';
import {RootStackParamList} from '../../../App';
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

interface SignInProps {
  signIn: (username: string, password: string) => Promise<void>;
  googleSignIn: (userInfo: User) => () => Promise<void>;
  user: {username: string};
  getUser: () => Promise<void>;
}

type ScreenProps = NativeStackScreenProps<
  RootStackParamList & RootTabParamsList,
  'SignIn'
>;

const SignIn = ({
  signIn,
  user,
  navigation,
  getUser,
  googleSignIn,
}: SignInProps & ScreenProps) => {
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
      navigation.push('Home');
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
    <ScrollView contentContainerStyle={reusableStyles.scrollView}>
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
          {/* <Text style={styles.signinText}>Sign in with your Google account</Text> */}
          {/* <GoogleSigninButton
          onPress={submitGoogleSignIn}
          style={styles.googleSignInBtn}
        /> */}
          <Pressable onPress={submitGoogleSignIn}>
            {({pressed}) => {
              const googleImg = pressed
                ? require('../../assets/google-pressed.png')
                : require('../../assets/google.png');
              return (
                <Image
                  source={googleImg}
                  alt="Google Sign In"
                  style={styles.googleSignInBtn}
                />
              );
            }}
          </Pressable>
        </View>
      </View>
    </ScrollView>
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
