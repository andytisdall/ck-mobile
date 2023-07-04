import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView, LayoutAnimation, Switch} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../../App';
import styles from './styles';
import {getShifts as getShiftsAction} from '../../actions';
import VolunteerJobsList from './VolunteerJobsList';
import Calendar from './HomeChefCalendar';

type ViewType = 'calendar' | 'list';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const ShiftSignup = ({
  getShifts,
  navigation,
  route,
}: {
  getShifts: () => void;
} & ScreenProps) => {
  const [viewType, setViewType] = useState<ViewType>('list');
  useEffect(() => {
    getShifts();
  }, [getShifts]);

  const switchViewType = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.scaleX,
      ),
    );
    const type = viewType === 'list' ? 'calendar' : 'list';
    setViewType(type);
  };

  const renderSignup = () => {
    // const listBtn: any[] = [styles.navBtn];
    // const calBtn: any[] = [styles.navBtn];
    let thumbColor = '';
    let value = false;
    if (viewType === 'list') {
      thumbColor = 'rgb(180,40,100)';
    }
    if (viewType === 'calendar') {
      thumbColor = 'rgb(130,70,130)';
      value = true;
    }
    return (
      <>
        <View style={styles.signupLinks}>
          {/* <Pressable onPress={() => switchViewType('list')} style={listBtn}> */}
          <Text style={styles.switchText}>List</Text>
          {/* </Pressable> */}
          {/* <Pressable onPress={() => switchViewType('calendar')} style={calBtn}> */}
          {/* </Pressable> */}
          <Switch
            thumbColor={thumbColor}
            onChange={switchViewType}
            value={value}
          />
          <Text style={styles.switchText}>Calendar</Text>
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
