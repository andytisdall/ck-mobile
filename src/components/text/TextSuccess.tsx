import {connect} from 'react-redux';
import {Pressable, View, Text, Image} from 'react-native';
import React from 'react';

import {RootState} from '../../state/Root';
import styles from './styles';
import photoStyles from '../reusable/styles';
import {clearText as clearTextAction} from '../../actions';
import {BaseComponent} from '../../../App';

export type SentMessage = {
  message: string;
  photoUrl: string | undefined;
  region: string;
};

interface TextSuccessProps {
  message: SentMessage;
  navigation: {push: (name: string) => void; pop: () => void};
  clearText: () => {type: string};
}

const TextSuccess = ({message, navigation, clearText}: TextSuccessProps) => {
  if (message) {
    return (
      <BaseComponent>
        <View style={styles.sendText}>
          <Text style={styles.textConfirmTitle}>Success!</Text>
          <View>
            <Text style={styles.fridgeText}>
              You have successfully sent this text:
            </Text>

            <Text style={styles.textPreview}>{message.message}</Text>

            <Text style={styles.textConfirmRegion}>
              Region: {message.region}
            </Text>
            {!!message.photoUrl && (
              <View style={photoStyles.photoPreview}>
                <Image
                  source={{uri: message.photoUrl}}
                  alt="attached"
                  style={photoStyles.photoPreviewPhoto}
                />
              </View>
            )}
          </View>

          <Pressable
            style={[styles.sendBtn, styles.cancel]}
            onPress={() => {
              clearText();
              navigation.push('Text');
            }}>
            <Text>Back to Text Home</Text>
          </Pressable>
        </View>
      </BaseComponent>
    );
  } else {
    return <></>;
  }
};

const mapStateToProps = (state: RootState) => {
  return {message: state.text.sent};
};

export default connect(mapStateToProps, {clearText: clearTextAction})(
  TextSuccess,
);
