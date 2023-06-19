import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {Pressable, View, Text, Image, Platform} from 'react-native';
import React from 'react';

import styles from './styles';

interface AddPhotoProps {
  setPhoto: React.Dispatch<React.SetStateAction<PhotoFile | undefined>>;
  photoFile: PhotoFile | undefined;
}

export interface PhotoFile {
  name?: string;
  type?: string;
  uri?: string;
}

const AddPhoto = ({setPhoto, photoFile}: AddPhotoProps) => {
  const setLocalPhoto = (response: ImagePickerResponse) => {
    if (!response.didCancel && !response.errorCode && response.assets) {
      const photo = response.assets[0];
      setPhoto({
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === 'ios' ? photo.uri?.replace('file://', '') : photo.uri,
      });
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
        <Pressable
          style={styles.photoDelete}
          onPress={() => setPhoto(undefined)}>
          <Text style={styles.photoDeleteText}>X</Text>
        </Pressable>
        <Image
          style={styles.photoPreviewPhoto}
          source={{uri: photoFile?.uri}}
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
      {!!photoFile && renderPhoto()}
    </View>
  );
};

export default AddPhoto;
