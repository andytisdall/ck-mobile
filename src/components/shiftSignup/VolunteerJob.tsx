import {format} from 'date-fns';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

import Arrow from '../../assets/right-arrow.svg';
import styles from './styles';
import {Job, Shift} from './VolunteerJobsList';
import {RootState} from '../../state/Root';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const VolunteerJob = ({
  job,
  shifts,
}: {
  job: Job;
  shifts: Record<string, Shift>;
}) => {
  const [expand, setExpand] = useState(false);

  const renderShifts = () => {
    const jobShifts = job.shifts.map(id => shifts[id]);
    // /{`job-date ${shift.open ? '' : 'job-date-full'}`}
    return jobShifts
      .sort((a, b) => (a.startTime > b.startTime ? 1 : -1))
      .map(shift => {
        return (
          <View style={styles.shift} key={shift.id}>
            {shift.open ? (
              <Pressable style={styles.signupBtn}>
                <Text style={styles.signupBtnText}>Sign Up</Text>
              </Pressable>
            ) : (
              <Text>full</Text>
            )}
            <Text style={styles.jobDate}>
              {format(new Date(shift.startTime), 'M/d/yy')}
            </Text>
            <Text>{format(new Date(shift.startTime), 'eeee')}</Text>
          </View>
        );
      });
  };

  const expandStyle = expand && styles.arrowRotated;
  const inactive = !job.active && styles.jobInactive;

  return (
    <View style={styles.jobContainer}>
      <View style={styles.jobHeader}>
        {job.active && (
          <Pressable
            onPress={() => {
              setExpand(!expand);
              LayoutAnimation.configureNext(
                LayoutAnimation.create(
                  200,
                  LayoutAnimation.Types.linear,
                  LayoutAnimation.Properties.scaleXY,
                ),
              );
            }}
            style={[styles.arrow, expandStyle]}>
            <Arrow />
          </Pressable>
        )}
        <Pressable
          onPress={() => {
            if (job.active) {
              setExpand(!expand);
            }
          }}>
          <Text style={[styles.jobName, inactive]}>{job.name}</Text>
        </Pressable>
        {!job.active && <Text>Out of Service</Text>}
      </View>
      <View style={styles.shiftList}>
        {expand && (
          <Text style={styles.location}>Location: {job.location}</Text>
        )}
        <View>{expand && renderShifts()}</View>
      </View>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {shifts: state.homeChef.shifts};
};

export default connect(mapStateToProps)(VolunteerJob);
