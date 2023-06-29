import {connect} from 'react-redux';
import React, {useMemo, useCallback} from 'react';
import moment from 'moment';
// import {useNavigate} from 'react-router-dom';
import {Text, Pressable} from 'react-native';

import styles, {colors} from './styles';
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
        return job?.ongoing && job.active;
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
      let dayShifts = [];

      if (orderedShifts[d]) {
        dayShifts = orderedShifts[d].map(sh => {
          const jobIndex = jobs.findIndex(j => j.id === sh.job);
          const job = jobs[jobIndex];
          // const available = sh.open;
          // const status = available ? '' : 'calendar-shift-disabled';
          // const link = () => navigate('../shift/' + sh.id);
          const color = colors[jobIndex];
          return (
            <Pressable
              style={[styles.calendarJob, color.calendarJobColor]}
              onPress={() => {}}
              key={sh.id}>
              <Text
                style={[styles.calendarJobName, color.calendarJobNameColor]}>
                {job.name}
              </Text>
            </Pressable>
          );
        });
        return dayShifts;
      }
    },
    [jobs, orderedShifts],
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
