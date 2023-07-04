import {connect} from 'react-redux';
import React, {useEffect, useMemo, useState} from 'react';
import {format} from 'date-fns';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  LayoutAnimation,
} from 'react-native';
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
import styles from '../shiftSignup/styles';
import chefStyles from './styles';
import Arrow from '../../assets/right-arrow.svg';

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
  const [upcomingExpand, setUpcomingExpand] = useState(false);
  const [pastExpand, setPastExpand] = useState(false);

  useEffect(() => {
    getShifts();
    getHours();
  }, [getHours, getShifts]);

  const animate = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.scaleX,
      ),
    );
  };

  const renderShift = (hour: Hours) => {
    const job = jobs.find(j => j.id === hour.job);
    if (!job) {
      return;
    }
    return (
      <View key={hour.id} style={chefStyles.chefRow}>
        <View style={chefStyles.chefSubRow}>
          <Pressable style={chefStyles.editBtn}>
            <Text>edit</Text>
          </Pressable>
          <Text>
            {format(new Date(hour.time), 'eee, M/d/yy')} - {job.name}
          </Text>
        </View>
        <Text>{hour.mealCount || 0} Meals</Text>
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

  const upcomingArrowStyle = upcomingExpand ? chefStyles.arrowDown : undefined;
  const pastArrowStyle = pastExpand ? chefStyles.arrowDown : undefined;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.homeChef}>
        <View style={chefStyles.chefHeader}>
          {user.firstName ? (
            <Text style={chefStyles.chefHeaderText}>
              {user.firstName}'s Town Fridge Deliveries
            </Text>
          ) : null}
          {totalMeals && totalMeals > 0 ? (
            <Text style={chefStyles.chefHeaderSubText}>
              You have delivered {totalMeals} total meals!
            </Text>
          ) : null}
        </View>

        <View style={chefStyles.chefInfo}>
          <Image
            source={require('../../assets/chef-shifts.jpeg')}
            alt="Home Chef meals ready to go"
            style={chefStyles.chefPhoto}
          />
          <Pressable
            style={chefStyles.signupBtn}
            onPress={() => navigation.navigate('Signup')}>
            <Text>Sign Up to Deliver Meals</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            animate();
            setUpcomingExpand(!upcomingExpand);
          }}
          style={chefStyles.chefListHeader}>
          <View style={chefStyles.arrow}>
            <Arrow style={upcomingArrowStyle} />
          </View>
          <Text style={chefStyles.chefTitle}>Upcoming Deliveries</Text>
        </Pressable>
        <View style={chefStyles.chefList}>
          {upcomingExpand && renderHours('upcoming')}
        </View>

        <Pressable
          onPress={() => {
            animate();
            setPastExpand(!pastExpand);
          }}
          style={chefStyles.chefListHeader}>
          <View style={chefStyles.arrow}>
            <Arrow style={pastArrowStyle} />
          </View>
          <Text style={chefStyles.chefTitle}>Past Deliveries</Text>
        </Pressable>
        <View style={chefStyles.chefList}>
          {pastExpand && renderHours('past')}
        </View>
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
