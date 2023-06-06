import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  sendText: {
    height: '100%',
    justifyContent: 'flex-start',
  },

  sendTextPage: {
    height: '40%',
  },

  sentSuccess: {
    backgroundColor: 'rgb(111, 255, 111)',
    marginTop: 30,
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
    border: '1px solid black',
  },

  sendTextVariablesItem: {
    marginBottom: 10,
    flexDirection: 'column',
  },

  sendTextLabel: {
    fontSize: 30,
  },

  sendTextInput: {
    height: 20,
    padding: 20,
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 5,
    fontSize: 25,
  },

  fridgeButton: {
    backgroundColor: 'yellow',
    padding: 5,
    marginTop: 5,
    borderWidth: 1,
  },

  fridgeOption: {
    backgroundColor: 'green',
    borderWidth: 1,
  },

  fridgeInfo: {
    marginLeft: 15,
    marginRight: 5,
    color: 'yellow',
    fontWeight: '600',
  },

  fridgeName: {
    color: 'white',
  },

  sendTextNav: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },

  btn: {
    backgroundColor: 'blue',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 50,
  },

  btnText: {
    color: 'white',
    fontSize: 25,
  },

  sendBtn: {
    marginTop: 15,
  },

  btnInactive: {
    backgroundColor: 'grey',
  },

  textPreview: {
    fontSize: 15,
    marginBottom: 20,
    width: '70%',
    lineHeight: 15,
    backgroundColor: 'black',
    padding: 10,
    color: 'white',
  },

  photoPreview: {
    marginBottom: 10,
    height: 200,
  },
});
