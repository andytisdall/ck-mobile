import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  LayoutAnimation,
  Switch,
  Pressable,
  FlatList,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {SignupStackParamsList} from './Signup';
import styles from './styles';
import {getShifts as getShiftsAction} from '../../actions';
import VolunteerJobsList from './VolunteerJobsList';
import Calendar from './HomeChefCalendar';

type ViewType = 'calendar' | 'list';

type ScreenProps = NativeStackScreenProps<SignupStackParamsList, 'ShiftSignup'>;

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
    let value = false;
    if (viewType === 'calendar') {
      value = true;
    }
    return (
      <>
        <View style={styles.switch}>
          <View style={styles.switchRow}>
            <Pressable
              onPress={() => (viewType !== 'list' ? switchViewType() : null)}
              style={styles.switchBtn}>
              {({pressed}) => {
                let extraStyle;
                if (pressed) {
                  extraStyle = styles.highlight;
                }
                return (
                  <Text style={[styles.switchText, extraStyle]}>
                    Town Fridge List
                  </Text>
                );
              }}
            </Pressable>
            <Switch
              thumbColor="blue"
              onChange={switchViewType}
              value={value}
              trackColor={{false: 'grey', true: 'grey'}}
            />
            <Pressable
              onPress={() =>
                viewType !== 'calendar' ? switchViewType() : null
              }
              style={styles.switchBtn}>
              {({pressed}) => {
                let extraStyle;
                if (pressed) {
                  extraStyle = styles.highlight;
                }
                return (
                  <Text style={[styles.switchText, extraStyle]}>Calendar</Text>
                );
              }}
            </Pressable>
          </View>
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
    <FlatList
      style={styles.scrollView}
      data={[
        <View style={styles.homeChef}>
          <View style={styles.signupHeader}>
            <Text style={styles.signupTitle}>Town Fridge Sign Up</Text>
            {renderSignup()}
          </View>
        </View>,
      ]}
      renderItem={({item}) => item}
    />
  );
};

export default connect(null, {getShifts: getShiftsAction})(ShiftSignup);
