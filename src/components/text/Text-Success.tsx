import {connect} from 'react-redux';
import {Pressable, View, Text, Image} from 'react-native';
import React from 'react';

import {RootState} from '../../state/Root';
import styles from './styles';
import {clearText as clearTextAction} from '../../actions';
import {BaseComponent} from '../../../App';

export type SentMessage = {
  message: string;
  photoUrl: string | undefined;
  region: string;
};

interface TextSuccessProps {
  message: SentMessage;
  navigation: {pop: () => void};
  clearText: () => {type: string};
}

const TextSuccess = ({message, navigation, clearText}: TextSuccessProps) => {
  console.log(message.photoUrl);
  return (
    <BaseComponent>
      <View>
        <Text>Success!</Text>
        <View>
          <Text>You have successfully sent this text:</Text>
          <Text>Region: {message.region}</Text>
          <Text>{message.message}</Text>
          {!!message.photoUrl && (
            <View style={styles.photoPreview}>
              <Image
                source={{uri: message.photoUrl}}
                alt="attached"
                style={styles.photoPreviewPhoto}
              />
            </View>
          )}
        </View>

        <Pressable
          style={[styles.sendBtn, styles.cancel]}
          onPress={() => {
            clearText();
            navigation.pop();
          }}>
          <Text>Back to Text Home</Text>
        </Pressable>
      </View>
    </BaseComponent>
  );
};

const mapStateToProps = (state: RootState) => {
  return {message: state.text.sent};
};

export default connect(mapStateToProps, {clearText: clearTextAction})(
  TextSuccess,
);
