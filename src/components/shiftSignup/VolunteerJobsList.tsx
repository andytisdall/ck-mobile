import {connect} from 'react-redux';
import React from 'react';
import {View, Text} from 'react-native';

import {RootState} from '../../state/Root';
import VolunteerJob from './VolunteerJob';
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

const VolunteerJobsList = ({jobs}: {jobs: Job[]}) => {
  const renderJobs = () => {
    if (!jobs.length) {
      return <Text>No jobs could be found.</Text>;
    }
    return jobs
      .filter(job => job.ongoing)
      .sort(a => (a.active ? -1 : 1))
      .map(job => {
        return <VolunteerJob job={job} key={job.id} />;
      });
  };

  return <View>{jobs ? renderJobs() : <Loading />}</View>;
};

const mapStateToProps = (state: RootState) => {
  return {
    jobs: state.homeChef.jobs,
  };
};

export default connect(mapStateToProps)(VolunteerJobsList);
