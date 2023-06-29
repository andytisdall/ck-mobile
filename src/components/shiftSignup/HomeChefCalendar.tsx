import {connect} from 'react-redux';
import React, {useMemo, useCallback} from 'react';
import moment from 'moment';
// import {useNavigate} from 'react-router-dom';
import {Text, Pressable} from 'react-native';

import styles from './styles';
import TestCal from '../reusable/calendar/TestCal';
import Loading from '../reusable/Loading';
import {Shift, Job} from './VolunteerJobsList';
import {RootState} from '../../state/Root';

const HomeChefCalendar = ({
  jobs,
  shifts,
}: {
  jobs: Job[];
  shifts: Record<string, Shift>;
}) => {
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
          style={[styles.calendarLink, inactiveStyle]}
          onPress={() => {}}>
          <Text style={styles.calendarLinkNumber}>{numShifts}</Text>
          <Text style={styles.calendarLinkText}>Shifts</Text>
        </Pressable>
      );
    },
    [orderedShifts],
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
