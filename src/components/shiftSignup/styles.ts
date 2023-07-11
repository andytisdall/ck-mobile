import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  scrollView: {
    minHeight: '100%',
  },
  homeChef: {
    backgroundColor: 'rgb(177, 221, 240)',
    flex: 1,
    padding: 10,
    paddingBottom: 80,
    borderWidth: 1,
  },
  signupHeader: {
    alignItems: 'center',
  },
  signupTitle: {fontSize: 25, textAlign: 'center'},
  switch: {marginTop: 20, width: '80%'},
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'grey',
  },
  switchBtn: {flex: 1, padding: 20},
  switchText: {textAlign: 'center'},
  navBtn: {
    backgroundColor: 'rgba(100,100,200, .5)',
    marginBottom: 30,
  },
  navBtnText: {
    padding: 20,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  viewActive: {
    transform: [{scale: 1.1}],
  },
  jobList: {paddingHorizontal: 10},
  jobContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  jobHeader: {
    flexDirection: 'row',
  },
  jobName: {
    fontSize: 20,
  },
  jobNameSmall: {
    fontSize: 10,
  },
  arrow: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  shift: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shiftLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shiftList: {
    margin: 25,
  },
  location: {
    marginBottom: 20,
  },
  signupBtn: {
    backgroundColor: 'rgb(150, 80,120)',
    marginRight: 15,
  },
  signupBtnText: {
    color: 'white',
  },
  jobDate: {
    fontSize: 20,
    marginRight: 15,
  },
  jobInactive: {
    color: 'grey',
  },
  arrowRotated: {
    transform: [{rotate: '90deg'}],
  },
  calendarDate: {flex: 1},
  calendarLink: {
    padding: 2,
    backgroundColor: 'rgba(20, 200, 50, .5)',
    flex: 1,
    paddingTop: 15,
  },
  calendarLinkNumber: {fontSize: 20, textAlign: 'center'},
  calendarLinkText: {fontSize: 12, textAlign: 'center'},
  calendarLinkInactive: {backgroundColor: 'rgba(200, 70, 70, .5)'},
  signupDetail: {alignItems: 'center', paddingHorizontal: 5},
  signupDetailInfo: {
    paddingHorizontal: 5,
    marginBottom: 25,
  },
  signupDetailAddress: {
    paddingLeft: 55,
  },
  signupField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  signupFields: {borderBottomWidth: 1, borderTopWidth: 1, marginTop: 20},
  signupFieldText: {paddingLeft: 10},
  fullShift: {
    marginHorizontal: 25,
    paddingRight: 15,
  },
  signupSubmitText: {
    textAlign: 'center',
  },
  mealCountInput: {width: 75, backgroundColor: 'white'},
  checkbox: {
    paddingLeft: 15,
  },
  shiftDetailHeader: {fontSize: 20, marginLeft: 10},
  submitBtn: {
    backgroundColor: 'rgb(100,100,250)',
    marginTop: 40,
  },
  disabled: {
    backgroundColor: 'rgba(100,100,100,.5)',
  },
  confirmNav: {
    marginTop: 25,
    alignItems: 'center',
  },
  confirmDetail: {
    marginVertical: 20,
  },
  confirmLabel: {
    fontWeight: '600',
    marginRight: 20,
  },
  confirmLine: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  highlight: {backgroundColor: 'rgba(250,250,250, .5)', flex: 1},
});

const colorStyles = [
  {calendarJobColor: {backgroundColor: 'orange'}},
  {
    calendarJobColor: {backgroundColor: 'brown'},
    calendarJobNameColor: {color: 'white'},
  },
  {
    calendarJobColor: {backgroundColor: 'green'},
    calendarJobNameColor: {color: 'white'},
  },
  {calendarJobColor: {backgroundColor: 'pink'}},
  {calendarJobColor: {backgroundColor: 'yellow'}},
  {
    calendarJobColor: {backgroundColor: 'blue'},
    calendarJobNameColor: {color: 'white'},
  },
  {calendarJobColor: {backgroundColor: 'purple'}},
  {calendarJobColor: {backgroundColor: 'magenta'}},
];

export const colors = colorStyles.map(s => StyleSheet.create(s));
