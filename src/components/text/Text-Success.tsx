import {connect} from 'react-redux';
import {Pressable, View, Text, Image} from 'react-native';
import React from 'react';

import {RootState} from '../../state/Root';
import styles from './styles';

export type SentMessage = {
  message: string;
  photoUrl: string | undefined;
  region: string;
};

interface TextSuccessProps {
  message: SentMessage;
  navigation: {navigate: (name: string) => void};
}

const TextSuccess = ({message, navigation}: TextSuccessProps) => {
  return (
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
  );
};

const mapStateToProps = (state: RootState) => {
  return {message: state.text.sent};
};

export default connect(mapStateToProps)(TextSuccess);
