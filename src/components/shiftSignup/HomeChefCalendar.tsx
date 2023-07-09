import {connect} from 'react-redux';
import React, {useMemo, useCallback} from 'react';
import moment from 'moment';
import {Text, Pressable, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './styles';
import TestCal from '../reusable/calendar/TestCal';
import Loading from '../reusable/Loading';
import {Shift, Job} from './VolunteerJobsList';
import {RootState} from '../../state/Root';
import {RootStackParamList} from '../../../App';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const HomeChefCalendar = ({
  jobs,
  shifts,
  navigation,
}: {
  jobs: Job[];
  shifts: Record<string, Shift>;
} & ScreenProps) => {
  const orderedShifts = useMemo(() => {
    if (!shifts) {
      return {};
    }
    const orderedByDate: Record<string, Shift[]> = {};
    Object.values(shifts)
      .filter(sh => {
        const jobIndex = jobs.findIndex(j => j.id === sh.job);
        const job = jobs[jobIndex];
        return job?.ongoing && job.active && sh.open;
      })
      .forEach(sh => {
        const formattedTime = moment(sh.startTime, 'YYYY-MM-DD').format(
          'YYYY-MM-DD',
        );
        if (orderedByDate[formattedTime]) {
          orderedByDate[formattedTime].push(sh);
        } else {
          orderedByDate[formattedTime] = [sh];
        }
      });
    return orderedByDate;
  }, [shifts, jobs]);

  const getShifts = useCallback(
    (d: string) => {
      const numShifts = orderedShifts[d] ? orderedShifts[d].length : 0;
      const inactiveStyle = !numShifts ? styles.calendarLinkInactive : null;
      return (
        <Pressable
          onPress={() => {
            if (numShifts) {
              navigation.navigate('DateDetail', {
                shiftIds: orderedShifts[d].map(sh => sh.id),
                date: d,
              });
            }
          }}
          style={styles.calendarDate}>
          {({pressed}) => {
            const dateBtnStyle: any[] = [styles.calendarLink, inactiveStyle];
            if (numShifts && pressed) {
              dateBtnStyle.push({backgroundColor: 'rgb(100, 150, 200)'});
            }
            return (
              <View style={dateBtnStyle}>
                <Text style={styles.calendarLinkNumber}>{numShifts}</Text>
                <Text style={styles.calendarLinkText}>Shifts</Text>
              </View>
            );
          }}
        </Pressable>
      );
    },
    [orderedShifts, navigation],
  );

  if (!jobs || !shifts) {
    return <Loading />;
  }

  return <TestCal renderItems={getShifts} />;
};

const mapStateToProps = (state: RootState) => {
  return {
    jobs: state.homeChef.jobs,
    shifts: state.homeChef.shifts,
  };
};

export default connect(mapStateToProps)(HomeChefCalendar);
