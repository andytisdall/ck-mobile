import {connect} from 'react-redux';
import React, {useEffect, useMemo, useState} from 'react';
import {format} from 'date-fns';
import {View, Text, Pressable, ScrollView, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../../App';
import {Job} from '../shiftSignup/VolunteerJobsList';
import {Hours} from '../shiftSignup/Confirmation';
import {RootState} from '../../state/Root';
import {
  getHours as getHoursAction,
  getShifts as getShiftsAction,
} from '../../actions';
import Loading from '../reusable/Loading';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Chef'>;

interface ChefShiftsProps {
  jobs: Job[];
  hours: Record<string, Hours>;
  user: {username: string; firstName?: string};
  getHours: () => void;
  getShifts: () => void;
}

const ChefShifts = ({
  jobs,
  getHours,
  hours,
  getShifts,
  user,
  navigation,
}: ChefShiftsProps & ScreenProps) => {
  const [upcomingExpand, setUpcomingExpand] = useState(true);
  const [pastExpand, setPastExpand] = useState(true);

  useEffect(() => {
    getShifts();
    getHours();
  }, [getHours, getShifts]);

  const renderShift = (hour: Hours) => {
    const job = jobs.find(j => j.id === hour.job);
    if (!job) {
      return;
    }
    return (
      <View key={hour.id}>
        <View>
          <Text>
            {format(new Date(hour.time), 'eee, M/D/YY')} - {job.name}
          </Text>
        </View>
        <View>
          <Text>{hour.mealCount || 0} Meals</Text>
          <Pressable>
            <Text>edit</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const sortedHours = useMemo(() => {
    if (hours) {
      return [...Object.values(hours)].sort((a, b) =>
        a.time > b.time ? 1 : -1,
      );
    }
  }, [hours]);

  const totalMeals = useMemo(() => {
    if (hours) {
      return Object.values(hours)
        .filter(h => h.status === 'Completed')
        .reduce((total, current) => total + parseInt(current.mealCount, 10), 0);
    }
  }, [hours]);

  const renderHours = (period: 'past' | 'upcoming') => {
    if (hours && jobs && sortedHours) {
      let status: string | undefined;
      let hoursArray;
      if (period === 'past') {
        hoursArray = [...sortedHours].reverse();
        status = 'Completed';
      } else {
        hoursArray = sortedHours;
        status = 'Confirmed';
      }
      const renderedList = hoursArray
        .filter(h => h.status === status)
        .map(hour => {
          return renderShift(hour);
        });
      if (renderedList.length) {
        return <View>{renderedList}</View>;
      } else {
        return <Text>No Shifts</Text>;
      }
    }
  };

  if (!hours || !jobs) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <View>
        {user.firstName ? (
          <Text>{user.firstName}'s Town Fridge Deliveries</Text>
        ) : null}
        {totalMeals && totalMeals > 0 ? (
          <Text>You have delivered {totalMeals} total meals!</Text>
        ) : null}
      </View>
      <Pressable onPress={() => setUpcomingExpand(!upcomingExpand)}>
        <Text>&rarr;</Text>
        <Text>Upcoming Deliveries</Text>
      </Pressable>
      <View>{upcomingExpand && renderHours('upcoming')}</View>
      <Pressable onPress={() => setPastExpand(!pastExpand)}>
        <Text>&rarr;</Text>
        <Text>Past Deliveries</Text>
      </Pressable>
      <View>{pastExpand && renderHours('past')}</View>
      <View>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text>Sign Up to Deliver Meals</Text>
        </Pressable>
        <Image
          source={{uri: '/images/home-chef/chef-shifts.jpeg'}}
          alt="Home Chef meals ready to go"
        />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    jobs: state.homeChef.jobs,
    hours: state.homeChef.hours,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  getHours: getHoursAction,
  getShifts: getShiftsAction,
})(ChefShifts);
