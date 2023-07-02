import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, Pressable, ScrollView, LayoutAnimation} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../../App';
import styles from './styles';
import {getShifts as getShiftsAction} from '../../actions';
import VolunteerJobsList from './VolunteerJobsList';
import Calendar from './HomeChefCalendar';

type ViewType = 'calendar' | 'list' | undefined;

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const ShiftSignup = ({
  getShifts,
  navigation,
  route,
}: {
  getShifts: () => void;
} & ScreenProps) => {
  const [viewType, setViewType] = useState<ViewType>();
  useEffect(() => {
    getShifts();
  }, [getShifts]);

  const switchViewType = (type: ViewType) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.scaleX,
      ),
    );
    setViewType(type);
  };

  const renderSignup = () => {
    const listBtn: any[] = [styles.navBtn];
    const calBtn: any[] = [styles.navBtn];
    if (viewType === 'list') {
      listBtn.push(styles.viewActive);
    }
    if (viewType === 'calendar') {
      calBtn.push(styles.viewActive);
    }
    return (
      <>
        <View style={styles.signupLinks}>
          <Pressable onPress={() => switchViewType('list')} style={listBtn}>
            <Text style={styles.navBtnText}>List</Text>
          </Pressable>
          <Pressable onPress={() => switchViewType('calendar')} style={calBtn}>
            <Text style={styles.navBtnText}>Calendar</Text>
          </Pressable>
        </View>
        <View>
          {viewType === 'list' && (
            <VolunteerJobsList navigation={navigation} route={route} />
          )}
          {viewType === 'calendar' && (
            <Calendar navigation={navigation} route={route} />
          )}
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
