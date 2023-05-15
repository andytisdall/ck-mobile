import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {Pressable, View, Text} from 'react-native/types';
import {useState} from 'react';

interface AddPhotoProps {
  setPhoto: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AddPhoto = ({setPhoto}: AddPhotoProps) => {
  const [fileName, setFileName] = useState<string | undefined>();

  const setLocalPhoto = (photo: ImagePickerResponse) => {
    if (!photo.didCancel && !photo.errorCode && photo.assets) {
      setFileName(photo.assets[0].fileName);
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

  return (
    <View>
      <Pressable onPress={getPhotoFromLibrary}>Get Photo</Pressable>
      <Pressable onPress={takePhoto}>Take Photo</Pressable>
      <Text>{fileName ? fileName : ''}</Text>
    </View>
  );
};

export default AddPhoto;
