import {StyleSheet} from 'react-native';
export const colors = {
  beige: 'rgb(231, 206, 166)',
  dark: 'rgb(10, 110, 189)',
  med: 'rgb(90, 150, 227)',
  light: 'rgb(161, 194, 241)',
  green: 'rgba(20, 200, 50, .5)',
  lightGreen: 'rgba(70, 250, 100, .5)',

  red: 'rgba(200, 70, 70, .5)',
  grey: 'rgba(100,100,100,.5)',
  highlight: 'rgba(250,250,250, .5)',
  white: 'white',
};

export default StyleSheet.create({
  scrollView: {
    minHeight: '100%',
  },
  homeChef: {
    backgroundColor: colors.light,
    flex: 1,
    paddingVertical: 25,
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  signupHeader: {
    alignItems: 'center',
  },
  signupTitle: {fontSize: 25, textAlign: 'center'},
  switch: {marginVertical: 15, width: '80%'},
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
  switchBtn: {flex: 1, paddingHorizontal: 20},
  switchText: {textAlign: 'center'},
  navBtn: {
    backgroundColor: colors.dark,
    marginBottom: 30,
  },
  navBtnText: {
    padding: 20,
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
  },
  viewActive: {
    transform: [{scale: 1.1}],
  },
  jobList: {paddingHorizontal: 10},

  jobContainer: {
    borderBottomColor: colors.grey,
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
  },
  shiftSignupBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
  },
  shiftList: {
    padding: 20,
  },
  location: {
    marginBottom: 20,
  },
  signupBtn: {
    backgroundColor: colors.dark,
  },
  signupBtnText: {
    color: 'white',
  },
  jobDate: {
    fontSize: 20,
    width: '30%',
  },

  jobInactiveText: {
    color: 'rgb(100,100,100)',
  },
  arrowRotated: {
    transform: [{rotate: '90deg'}],
  },
  calendarDate: {flex: 1},
  calendarLink: {
    padding: 2,
    backgroundColor: colors.green,
    flex: 1,
    paddingTop: 15,
  },
  calendarLinkNumber: {fontSize: 20, textAlign: 'center'},
  calendarLinkText: {fontSize: 12, textAlign: 'center'},
  calendarLinkInactive: {backgroundColor: colors.red},
  calendarLinkPressed: {backgroundColor: colors.lightGreen},
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
    marginHorizontal: 30,
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
  submitContainer: {
    marginTop: 40,
    height: 100,
  },
  submitBtn: {
    backgroundColor: colors.dark,
  },
  disabled: {
    backgroundColor: colors.grey,
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
  highlight: {backgroundColor: colors.highlight},
  invalidDate: {
    backgroundColor: 'rgb(150,150,150)',
  },
});
