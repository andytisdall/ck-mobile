import {View, Text, Image} from 'react-native';
import React from 'react';

import styles from './styles';
import AddPhoto from '../reusable/AddPhoto';

const EnterPhoto = ({
  photo,
  setPhoto,
}: {
  photo: string | undefined;
  setPhoto: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const renderPhoto = () => {
    return <Image source={{uri: photo}} />;
  };

  return (
    <View style={styles.sendTextVariablesItem}>
      <Text style={styles.sendTextLabel}>Photo (optional):</Text>
      <AddPhoto setPhoto={setPhoto} photoUri={photo} />
      {photo ? renderPhoto() : null}
    </View>
  );
};

export default EnterPhoto;
