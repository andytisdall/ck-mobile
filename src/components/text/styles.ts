import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  scrollView: {
    minHeight: '100%',
  },

  sendText: {
    paddingBottom: 75,
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

  fridgeInfo: {
    marginTop: 50,
    padding: 20,
    borderColor: 'rgb(150, 100, 50)',
    borderWidth: 3,
  },

  fridgeInfoLabel: {
    color: 'rgb(160,160,260)',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },

  fridgeInfoValue: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 40,
    color: 'rgb(200, 200, 250)',
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
    borderColor: 'rgb(150,150,200)',
    paddingVertical: 10,
    marginVertical: 25,
    color: 'rgb(200,200,250)',
  },

  textConfirmTitle: {
    fontSize: 30,
    marginBottom: 30,
    textDecorationLine: 'underline',
    color: 'white',
  },
  textConfirmRegion: {
    fontSize: 20,
    color: 'white',
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
  backBtn: {
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: 'rgb(220,220,250)',
    width: '50%',
    alignSelf: 'center',
    marginTop: 20,
    padding: 20,
  },
  backBtnText: {
    textAlign: 'center',
    fontSize: 15,
  },
});

export const placeholderColor = 'rgba(80,120,200, .6)';
