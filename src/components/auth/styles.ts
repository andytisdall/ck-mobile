import {StyleSheet} from 'react-native';

import {colors} from '../shiftSignup/styles';

export default StyleSheet.create({
  signin: {
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: colors.beige,
    flex: 1,
    borderWidth: 1,
  },
  CKSignin: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 30,
  },
  signinBtnText: {
    color: 'white',
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  signinBtn: {
    marginTop: 10,
    backgroundColor: 'rgba(120,60,170,.5)',
    borderWidth: 1,
    borderRadius: 50,
    padding: 20,
    alignSelf: 'center',
  },
  signinText: {fontSize: 20, textAlign: 'center'},
  authInput: {
    backgroundColor: 'white',
  },
  signinFields: {
    marginTop: 20,
    width: '80%',
  },
  googleSignIn: {
    alignItems: 'center',
    marginTop: 20,
    height: 70,
  },
  googleSignInBtn: {
    flex: 1,
    resizeMode: 'contain',
  },
});
