import {connect} from 'react-redux';
import {Pressable, View, Text, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';

import {RootState} from '../../state/Root';
import styles from './styles';
import photoStyles from '../reusable/styles';
import {clearText as clearTextAction} from '../../actions';
import Loading from '../reusable/Loading';

export type SentMessage = {
  message: string;
  photoUrl: string | undefined;
  region: 'WEST_OAKLAND' | 'EAST_OAKLAND';
};

interface TextSuccessProps {
  message: SentMessage;
  navigation: {navigate: (name: string) => void; pop: () => void};
  clearText: () => {type: string};
}

const regionNames = {
  EAST_OAKLAND: 'East Oakland',
  WEST_OAKLAND: 'West Oakland',
};

const TextSuccess = ({message, navigation, clearText}: TextSuccessProps) => {
  const [photoLoading, setPhotoLoading] = useState(true);

  if (message) {
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.sendText}>
          <Text style={styles.textConfirmTitle}>Success!</Text>
          <View>
            <Text style={styles.textConfirmRegion}>
              You have successfully sent this text:
            </Text>

            <Text style={styles.textPreview}>{message.message}</Text>

            <Text style={styles.textConfirmRegion}>
              Region: {regionNames[message.region]}
            </Text>
            {!!message.photoUrl && (
              <View style={photoStyles.photoPreview}>
                {photoLoading && <Loading />}
                <Image
                  source={{uri: message.photoUrl}}
                  onLoad={() => setPhotoLoading(false)}
                  alt="attached"
                  style={photoStyles.photoPreviewPhoto}
                />
              </View>
            )}
          </View>

          <Pressable
            style={[styles.backBtn]}
            onPress={() => {
              clearText();
              navigation.navigate('Home');
            }}>
            <Text style={styles.backBtnText}>Back to Text Home</Text>
          </Pressable>
        </View>
      </ScrollView>
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
