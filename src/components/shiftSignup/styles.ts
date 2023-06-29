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
  },
  signupTitle: {fontSize: 25, textAlign: 'center'},
  signupLinks: {
    flexDirection: 'row',
    marginVertical: 40,
    justifyContent: 'space-around',
  },
  navBtn: {
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: 'blue',
    width: 130,
    height: 60,
    justifyContent: 'center',
  },
  navBtnText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  jobContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  jobHeader: {
    flexDirection: 'row',
  },
  jobName: {
    fontSize: 20,
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
  shiftList: {
    margin: 25,
  },
  location: {
    marginBottom: 20,
  },
  signupBtn: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
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
  calendarJob: {
    borderWidth: 1,
    marginVertical: 2,
  },
  calendarJobName: {
    fontSize: 8,
    padding: 3,
  },
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
