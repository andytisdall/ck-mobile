import {connect} from 'react-redux';
import React, {useMemo, useCallback} from 'react';
import {format, utcToZonedTime, zonedTimeToUtc} from 'date-fns-tz';
import {addDays, subDays} from 'date-fns';
import {Text, Pressable, View, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './styles';
import Calendar from '../reusable/calendar/Calendar';
import Loading from '../reusable/Loading';
import {Shift, Job} from './VolunteerJobsList';
import {RootState} from '../../state/Root';
import {SignupStackParamsList} from './Signup';

type ScreenProps = NativeStackScreenProps<SignupStackParamsList, 'ShiftSignup'>;

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
        const formattedTime = format(
          utcToZonedTime(sh.startTime, 'America/Los_Angeles'),
          'yyyy-MM-dd',
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
      const timezoneDate = zonedTimeToUtc(d, 'America/Los_Angeles');
      const numShifts = orderedShifts[d] ? orderedShifts[d].length : 0;
      const inactiveStyle = !numShifts ? styles.calendarLinkInactive : null;
      if (
        timezoneDate < subDays(new Date(), 1) ||
        timezoneDate > addDays(new Date(), 60)
      ) {
        return <View />;
      }
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
              dateBtnStyle.push(styles.calendarLinkPressed);
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

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.calendarContainer}>
        <Calendar renderItems={getShifts} />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    jobs: state.homeChef.jobs,
    shifts: state.homeChef.shifts,
  };
};

export default connect(mapStateToProps)(HomeChefCalendar);
