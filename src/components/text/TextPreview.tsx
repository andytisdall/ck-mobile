// import heic2any from 'heic2any';
// import {useState, useEffect} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';

import Btn from '../reusable/Btn';
import styles from './styles';
import photoStyles from '../reusable/styles';
import {PhotoFile} from '../reusable/AddPhoto';
// import Loading from '../reusable/Loading';

interface TextPreviewProps {
  onSubmit: () => void;
  message: string;
  region: string;
  photo: PhotoFile | undefined;
  onCancel: () => void;
}

const TextPreview = ({
  onSubmit,
  message,
  region,
  photo,
  onCancel,
}: TextPreviewProps) => {
  // const [image, setImage] = useState(photo);

  // useEffect(() => {
  //   if (photo?.name.toLowerCase().includes('.heic')) {
  //     setImage(null);
  //     const convert = async () => {
  //       const pic = await heic2any({
  //         blob: photo,
  //         toType: 'image/jpeg',
  //         quality: 0.3,
  //       });
  //       setImage(pic);
  //     };
  //     convert();
  //   }
  // }, [photo]);
  return (
    <View>
      <Text style={styles.textConfirmTitle}>Confirm Your Message:</Text>
      <Text style={styles.textPreview}>{message}</Text>
      {/* {photo && !image && <Loading />} */}
      {photo && (
        <View style={photoStyles.photoPreview}>
          <Image
            style={photoStyles.photoPreviewPhoto}
            source={{uri: photo.uri}}
            alt="preview"
          />
        </View>
      )}

      <Text style={styles.textConfirmRegion}>Region: {region}</Text>
      <View style={styles.textConfirmBtns}>
        <Btn style={styles.sendBtn} onPress={onSubmit}>
          <Text style={styles.sendBtnText}>Send Message</Text>
        </Btn>

        <Btn style={[styles.sendBtn, styles.cancel]} onPress={onCancel}>
          <Text style={styles.sendBtnText}>Start Over</Text>
        </Btn>
      </View>
    </View>
  );
};

export default TextPreview;
