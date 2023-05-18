import {connect} from 'react-redux';
import {Pressable, View, Text, Image} from 'react-native';
import React from 'react';

import styles from './styles';

const TextSuccess = ({message, navigation}) => {
  return (
    <View>
      <Text>Success!</Text>
      <View style={styles.fileSuccess}>
        <Text>You have successfully sent this text:</Text>
        <Text>Region: {message.region}</Text>
        <Text>{message.message}</Text>
        {message.photoUrl && (
          <Image
            src={message.photoUrl}
            alt="attached"
            className="photo-preview"
          />
        )}
      </View>

      <Pressable onPress={navigation.navigate('Text')}>
        Back to Text Home
      </Pressable>
    </View>
  );
};

const mapStateToProps = state => {
  return {message: state.text.sent};
};

export default connect(mapStateToProps)(TextSuccess);
