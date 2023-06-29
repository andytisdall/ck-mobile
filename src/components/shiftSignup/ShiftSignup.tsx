import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, Pressable, ScrollView} from 'react-native';

import styles from './styles';
import {getShifts as getShiftsAction} from '../../actions';
import VolunteerJobsList from './VolunteerJobsList';
import Calendar from './HomeChefCalendar';

type ViewType = 'calendar' | 'list' | undefined;

const ShiftSignup = ({getShifts}: {getShifts: () => void}) => {
  const [viewType, setViewType] = useState<ViewType>();
  useEffect(() => {
    getShifts();
  }, [getShifts]);

  const renderSignup = () => {
    return (
      <>
        <View style={styles.signupLinks}>
          <Pressable onPress={() => setViewType('list')} style={styles.navBtn}>
            <Text style={styles.navBtnText}>List</Text>
          </Pressable>
          <Pressable
            onPress={() => setViewType('calendar')}
            style={styles.navBtn}>
            <Text style={styles.navBtnText}>Calendar</Text>
          </Pressable>
        </View>
        <View>
          {viewType === 'list' && <VolunteerJobsList />}
          {viewType === 'calendar' && <Calendar />}
        </View>
      </>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.homeChef}>
        <Text style={styles.signupTitle}>Town Fridge Sign Up</Text>
        {renderSignup()}
      </View>
    </ScrollView>
  );
};

export default connect(null, {getShifts: getShiftsAction})(ShiftSignup);
