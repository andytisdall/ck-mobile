import {connect} from 'react-redux';
import React, {useEffect, useMemo, useState} from 'react';
import {format, utcToZonedTime} from 'date-fns-tz';
import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  LayoutAnimation,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import Btn from '../reusable/Btn';
import {RootTabParamsList} from '../../../App';
import {ChefStackParamsList} from './Chef';
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

type ScreenProps = NativeStackScreenProps<
  ChefStackParamsList & RootTabParamsList,
  'ChefShifts'
>;

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

  const renderShift = ({item}: {item: Hours}) => {
    const job = jobs.find(j => j.id === item.job);
    if (!job) {
      return <View>Job not found</View>;
    }
    return (
      <View key={item.id} style={chefStyles.chefRow}>
        <Btn
          style={chefStyles.editBtn}
          onPress={() => {
            navigation.navigate('EditShift', {hoursId: item.id});
          }}>
          <Text style={styles.confirmText}>edit</Text>
        </Btn>
        <View style={chefStyles.chefSubRow}>
          <Text>
            {format(
              utcToZonedTime(new Date(item.time), 'America/Los_Angeles'),
              'eee, M/d/yy',
            )}{' '}
            - {job.name}
          </Text>
          <Text> {item.mealCount || 0} Meals</Text>
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
      const filteredList = hoursArray.filter(h => h.status === status);

      if (filteredList.length) {
        return (
          <FlatList
            style={chefStyles.chefList}
            renderItem={renderShift}
            data={filteredList}
          />
        );
      } else {
        return <Text style={chefStyles.chefNoShifts}>No Deliveries Found</Text>;
      }
    }
  };

  const upcomingArrowStyle = upcomingExpand ? chefStyles.arrowDown : undefined;
  const pastArrowStyle = pastExpand ? chefStyles.arrowDown : undefined;

  const header = () => {
    return (
      <View>
        <View style={chefStyles.chefHeader}>
          {user.firstName ? (
            <Text style={styles.signupTitle}>
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
          <View style={chefStyles.chefPhotos}>
            <Image
              source={{
                uri: 'https://portal.ckoakland.org/images/home-chef/chef-shifts.jpeg',
              }}
              alt="Home Chef meals ready to go"
              style={chefStyles.chefPhoto}
            />
            <Image
              source={{
                uri: 'https://portal.ckoakland.org/images/home-chef/town-fridge.jpg',
              }}
              alt="Home Chef meals ready to go"
              style={chefStyles.chefPhoto}
            />
            <Image
              source={{
                uri: 'https://storage.googleapis.com/coherent-vision-368820.appspot.com/chef-shifts-3.jpg',
              }}
              alt="Home Chef meals ready to go"
              style={chefStyles.chefPhoto}
            />
          </View>
          <Btn
            style={chefStyles.signupBtn}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.confirmText}>Sign Up to Deliver Meals</Text>
          </Btn>
        </View>
      </View>
    );
  };

  const upcomingDeliveries = () => {
    return (
      <View>
        <Pressable
          onPress={() => {
            animate();
            setUpcomingExpand(!upcomingExpand);
          }}>
          {({pressed}) => {
            const btnStyle: any[] = [chefStyles.chefListHeader];
            if (pressed) {
              btnStyle.push(styles.highlight);
            }
            return (
              <View style={btnStyle}>
                <View style={chefStyles.arrow}>
                  <Arrow style={upcomingArrowStyle} />
                </View>
                <Text style={styles.signupTitle}>Upcoming Deliveries</Text>
              </View>
            );
          }}
        </Pressable>
        <View>{upcomingExpand && renderHours('upcoming')}</View>
      </View>
    );
  };

  const pastDeliveries = () => {
    return (
      <View>
        <Pressable
          onPress={() => {
            animate();
            setPastExpand(!pastExpand);
          }}>
          {({pressed}) => {
            const btnStyle: any[] = [chefStyles.chefListHeader];
            if (pressed) {
              btnStyle.push(styles.highlight);
            }
            return (
              <View style={btnStyle}>
                <View style={chefStyles.arrow}>
                  <Arrow style={pastArrowStyle} />
                </View>
                <Text style={styles.signupTitle}>Past Deliveries</Text>
              </View>
            );
          }}
        </Pressable>
        <View>{pastExpand && renderHours('past')}</View>
      </View>
    );
  };

  if (!hours || !jobs) {
    return (
      <View style={styles.homeChef}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.homeChef}>
      <FlatList
        style={styles.flatList}
        data={[
          <FlatList
            data={[header(), upcomingDeliveries(), pastDeliveries()]}
            renderItem={({item}) => item}
            style={styles.jobList}
          />,
        ]}
        renderItem={({item}) => item}
      />
    </View>
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
