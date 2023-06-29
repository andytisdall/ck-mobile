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
    padding: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.291)',
    minHeight: 70,
  },
  calendarDateNumberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  calendarDateNumber: {
    fontSize: 10,
    textAlign: 'center',
    padding: 3,
  },
});
