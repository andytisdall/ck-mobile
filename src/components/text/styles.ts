import {StyleSheet} from 'react-native/types';

export default StyleSheet.create({
  sendText: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginTop: '1rem',
  },

  sentSuccess: {
    backgroundColor: 'rgb(111, 255, 111)',
    marginTop: '3rem',
    fontSize: 20,
    padding: '1rem',
    textAlign: 'center',
    border: '1px solid black',
  },

  sendTextVariables: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'flex-start',
  },

  sendTextVariablesItem: {
    marginBottom: '1rem',
    flexDirection: 'column',
  },

  fridgeInfo: {
    marginLeft: 15,
    marginRight: 5,
    color: 'yellow',
    fontWeight: '600',
  },

  sendBtn: {
    marginTop: 15,
  },

  btnInactive: {
    backgroundColor: 'grey',
  },
});
