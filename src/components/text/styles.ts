import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  sendText: {
    paddingBottom: 75,
    paddingTop: 40,
    paddingHorizontal: 30,
    backgroundColor: 'rgb(50, 40, 156)',
    flex: 1,
  },

  sendTextPage: {
    paddingTop: 30,
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
    justifyContent: 'center',
  },

  sendTextLabel: {
    fontSize: 40,
    color: 'rgb(270,270,270)',
    marginHorizontal: 25,
    letterSpacing: 1.5,
  },

  sendTextInput: {
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 20,
    fontSize: 25,
    padding: 5,
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
    // width: '100%',
    justifyContent: 'space-between',
  },

  sendTextNavEnd: {
    justifyContent: 'flex-end',
  },

  sendTextNavBtn: {
    backgroundColor: 'rgb(247, 233, 109)',
    // paddingVertical: 20,
    borderRadius: 50,
    width: 100,
    borderWidth: 1,
  },

  sendTextNavBtnText: {
    color: 'black',
    fontSize: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: '10',
  },

  sendBtn: {
    alignItems: 'center',
    margin: 15,
    backgroundColor: 'yellow',
    padding: 30,
    borderRadius: 50,
    borderWidth: 1,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 3},
    shadowOpacity: 0.3,
  },

  sendBtnText: {
    fontSize: 30,
    fontWeight: '600',
  },

  btnInactive: {
    backgroundColor: 'grey',
  },

  textPreview: {
    fontSize: 20,
    padding: 5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 10,
    marginVertical: 25,
  },

  textConfirmTitle: {
    fontSize: 30,
    marginBottom: 30,
    textDecorationLine: 'underline',
  },
  textConfirmRegion: {
    fontSize: 20,
  },
  textConfirmBtns: {
    alignItems: 'center',
    marginVertical: 10,
  },
  cancel: {
    backgroundColor: 'rgb(200, 100, 100)',
  },
  picker: {
    borderWidth: 1,
    height: 400,
    backgroundColor: 'white',
  },
});

export const placeholderColor = 'rgba(80,120,200, .6)';
