import {connect} from 'react-redux';
import {Pressable, View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';

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
  navigation: {navigate: (name: string) => void};
  clearText: () => {type: string};
}

const TextSuccess = ({message, navigation, clearText}: TextSuccessProps) => {
  useEffect(() => () => {
    clearText();
  });

  return (
    <BaseComponent>
      <View>
        <Text>Success!</Text>
        <View>
          <Text>You have successfully sent this text:</Text>
          <Text>Region: {message.region}</Text>
          <Text>{message.message}</Text>
          {message.photoUrl && (
            <Image
              source={{uri: message.photoUrl}}
              alt="attached"
              style={styles.photoPreview}
            />
          )}
        </View>

        <Pressable onPress={() => navigation.navigate('Text')}>
          Back to Text Home
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
