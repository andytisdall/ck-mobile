import {connect} from 'react-redux';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../../App';
import styles from './styles';
import {RootState} from '../../state/Root';
import Loading from '../reusable/Loading';

export interface Job {
  id: string;
  name: string;
  location: string;
  shifts: string[];
  active: boolean;
  ongoing: boolean;
  description: string;
  campaign: string;
}

export interface Shift {
  id: string;
  startTime: string;
  open: boolean;
  job: string;
  restaurantMeals: boolean;
  duration: number;
}

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const VolunteerJobsList = ({
  jobs,
  navigation,
}: {jobs: Job[] | null} & ScreenProps) => {
  const renderJobs = () => {
    if (!jobs?.length) {
      return <Text>No jobs could be found.</Text>;
    }
    return jobs
      .filter(job => job.ongoing)
      .sort(a => (a.active ? -1 : 1))
      .map(job => {
        const style: any[] = [styles.jobContainer];
        if (!job.active) {
          style.push(styles.jobInactive);
        }
        return (
          <Pressable
            onPress={() => navigation.navigate('Fridge', {jobId: job.id})}
            style={style}
            key={job.id}>
            <Text style={styles.jobName}>{job.name}</Text>
            <Text>{job.location}</Text>
          </Pressable>
        );
      });
  };

  return (
    <View style={styles.jobList}>{jobs ? renderJobs() : <Loading />}</View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    jobs: state.homeChef.jobs,
  };
};

export default connect(mapStateToProps)(VolunteerJobsList);
