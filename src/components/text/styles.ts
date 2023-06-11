import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  sendText: {},

  sendTextPage: {},

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
    justifyContent: 'center',
  },

  sendTextLabel: {
    fontSize: 40,
    color: 'rgb(70,70,70)',
    marginHorizontal: 25,
    letterSpacing: 1.5,
  },

  sendTextInput: {
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 20,
    fontSize: 25,
  },

  sendTextNumberInput: {
    width: 100,
  },

  fridgeSelect: {
    margin: 20,
  },

  fridgeButton: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 5,
    borderWidth: 1,
    width: '100%',
  },

  fridgeOptionsContainer: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    width: '100%',
  },

  fridgeOption: {
    backgroundColor: 'rgb(200,200,200)',
    borderBottomWidth: 1,
    padding: 10,
  },

  fridgeText: {
    fontSize: 30,
    color: 'black',
  },

  fridgeInfo: {
    marginTop: 50,
    padding: 20,
    borderColor: 'rgb(150, 100, 50)',
    borderWidth: 3,
  },

  fridgeInfoLabel: {
    color: 'rgb(60,60,60)',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },

  fridgeInfoValue: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 40,
  },

  sendTextNav: {
    flexDirection: 'row',
    width: '100%',
  },

  sendTextNavRight: {
    marginLeft: 'auto',
  },

  sendTextNavBtn: {
    backgroundColor: 'rgb(50, 100, 200)',
    paddingVertical: 20,
    borderRadius: 50,
    width: 100,
    borderWidth: 1,
  },

  sendTextNavBtnText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
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
    height: 300,
    // width: '80%',
    marginVertical: 20,
  },
  photoPreviewPhoto: {flex: 1, resizeMode: 'contain'},
});
