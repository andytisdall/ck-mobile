import {Text, View} from 'react-native';
import React, {useCallback} from 'react';
import moment from 'moment';

import styles from './styles';

const TestCal = ({
  renderItems,
}: {
  renderItems: (day: string) => React.JSX.Element;
}) => {
  // const [month, setMonth] = useState(moment());
  const month = moment();

  const getDays = useCallback(() => {
    const days = [];
    const firstDay = parseInt(
      moment(`${month.format('YYYY-M')}-1`, 'YYYY-M-D').format('d'),
      10,
    );
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i < 32; i++) {
      const date = `${month.format('YYYY-M')}-${i}`;
      if (moment(date, 'YYYY-M-D').format('M') === month.format('M')) {
        days.push(moment(date, 'YYYY-M-D').format('YYYY-MM-DD'));
      }
    }
    return days.map((d, i) => {
      if (!d) {
        return <View key={i} />;
      }
      const items = renderItems(d);

      return (
        <View style={styles.calendarDate} key={d}>
          <View style={styles.calendarDateBackground}>
            <View style={styles.calendarDateNumberContainer}>
              <Text style={styles.calendarDateNumber}>
                {moment(d, 'YYYY-MM-DD').format('D')}
              </Text>
            </View>
            {items}
          </View>
        </View>
      );
    });
  }, [month, renderItems]);

  const calendar = () => {
    return (
      <>
        <View style={styles.calendarWeekdays}>
          <View style={styles.calendarWeekday}>
            <Text style={styles.calendarWeekdayText}>Sun</Text>
          </View>
          <View style={styles.calendarWeekday}>
            <Text style={styles.calendarWeekdayText}>Mon</Text>
          </View>
          <View style={styles.calendarWeekday}>
            <Text style={styles.calendarWeekdayText}>Tue</Text>
          </View>
          <View style={styles.calendarWeekday}>
            <Text style={styles.calendarWeekdayText}>Wed</Text>
          </View>
          <View style={styles.calendarWeekday}>
            <Text style={styles.calendarWeekdayText}>Thu</Text>
          </View>
          <View style={styles.calendarWeekday}>
            <Text style={styles.calendarWeekdayText}>Fri</Text>
          </View>
          <View style={styles.calendarWeekday}>
            <Text style={styles.calendarWeekdayText}>Sat</Text>
          </View>
        </View>
        <View style={styles.calendar}>{getDays()}</View>
      </>
    );
  };

  return <View>{calendar()}</View>;
};

export default TestCal;
