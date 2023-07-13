import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import React from 'react';

import styles from './styles';
import {RootState} from '../../state/Root';

interface PopupProps {
  popup: {
    alert?: any;
    error: any;
  };
}

const Popup = ({popup}: PopupProps) => {
  const renderMessage = () => {
    if (popup.error) {
      return (
        <View style={[styles.popup, styles.error]}>
          <Text style={styles.popupText}>{popup.error}</Text>
        </View>
      );
    }
    if (popup.alert) {
      return (
        <View style={[styles.popup, styles.alert]}>
          <Text style={styles.popupText}>{popup.alert}</Text>
        </View>
      );
    }
  };
  return <View>{renderMessage()}</View>;
};

const mapStateToProps = (state: RootState) => {
  return {popup: state.popup};
};

export default connect(mapStateToProps)(Popup);
