import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarWeekdays: {
    flexDirection: 'row',
  },
  calendarWeekday: {
    flex: 1,
  },
  calendarWeekdayText: {
    textAlign: 'center',
  },
  calendarDate: {
    flexBasis: '14.285%',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.291)',
    minHeight: 70,
  },
  calendarDateNumberContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'flex-start',
    position: 'absolute',
    top: 0,
  },
  calendarDateBackground: {flex: 1, flexDirection: 'row'},
  calendarDateNumber: {
    fontSize: 12,
    textAlign: 'center',
    padding: 3,
  },
});
