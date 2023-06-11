import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {Pressable, View, Text, Image} from 'react-native';
import React from 'react';

import styles from './styles';

interface AddPhotoProps {
  setPhoto: React.Dispatch<React.SetStateAction<string | undefined>>;
  photoUri: string | undefined;
}

const AddPhoto = ({setPhoto, photoUri}: AddPhotoProps) => {
  const setLocalPhoto = (photo: ImagePickerResponse) => {
    if (!photo.didCancel && !photo.errorCode && photo.assets) {
      setPhoto(photo.assets[0].uri);
    }
  };

  const getPhotoFromLibrary = async () => {
    const photo = await launchImageLibrary({
      mediaType: 'photo',
    });
    setLocalPhoto(photo);
  };

  const takePhoto = async () => {
    const photo = await launchCamera({mediaType: 'photo'});
    setLocalPhoto(photo);
  };

  const renderPhoto = () => {
    return (
      <View style={styles.photoPreview}>
        <Image
          style={styles.photoPreviewPhoto}
          source={{uri: photoUri}}
          alt="preview"
        />
      </View>
    );
  };

  return (
    <View style={styles.photo}>
      <Pressable style={styles.btn} onPress={getPhotoFromLibrary}>
        <Text style={styles.btnText}>Get Photo</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={takePhoto}>
        <Text style={styles.btnText}>Take Photo</Text>
      </Pressable>
      {!!photoUri && renderPhoto()}
    </View>
  );
};

export default AddPhoto;
