import {connect} from 'react-redux';
import React from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {SignupStackParamsList} from './Signup';
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

type ScreenProps = NativeStackScreenProps<SignupStackParamsList, 'ShiftSignup'>;

const VolunteerJobsList = ({
  jobs,
  navigation,
}: {jobs: Job[] | null} & ScreenProps) => {
  const renderJobs = () => {
    if (!jobs?.length) {
      return <Text>No jobs could be found.</Text>;
    }
    const sortedJobs = jobs
      .filter(job => job.ongoing)
      .sort(a => (a.active ? -1 : 1));

    const renderJob = ({item}: {item: Job}) => {
      const nameStyle: any[] = [styles.jobName];
      if (!item.active) {
        nameStyle.push(styles.jobInactiveText);
      }
      return (
        <Pressable
          onPress={() => navigation.navigate('Fridge', {jobId: item.id})}
          key={item.id}
          disabled={!item.active}>
          {({pressed}) => {
            const btnStyle: any[] = [styles.jobContainer];
            if (pressed) {
              btnStyle.push(styles.highlight);
            }
            return (
              <View style={btnStyle}>
                <Text style={nameStyle}>{item.name}</Text>
                {item.active ? (
                  <Text>{item.location}</Text>
                ) : (
                  <Text style={styles.jobInactiveText}>Out of Service</Text>
                )}
              </View>
            );
          }}
        </Pressable>
      );
    };

    return <FlatList data={sortedJobs} renderItem={renderJob} />;
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
