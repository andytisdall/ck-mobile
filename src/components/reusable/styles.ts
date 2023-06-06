import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  popup: {
    padding: 10,
    borderWidth: 2,
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  error: {
    backgroundColor: 'red',
  },
  alert: {
    backgroundColor: 'green',
  },
  btn: {
    backgroundColor: 'blue',
    borderRadius: 25,
    borderWidth: 1,
    padding: 5,
  },

  btnText: {
    fontSize: 20,
  },
});
