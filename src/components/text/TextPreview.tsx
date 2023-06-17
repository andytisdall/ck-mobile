// import heic2any from 'heic2any';
// import {useState, useEffect} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';

import styles from './styles';
// import Loading from '../reusable/Loading';

interface TextPreviewProps {
  onSubmit: () => void;
  message: string;
  region: string;
  photo: string | undefined;
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
        <View style={styles.photoPreview}>
          <Image
            style={styles.photoPreviewPhoto}
            source={{uri: photo}}
            alt="preview"
          />
        </View>
      )}

      <Text style={styles.textConfirmRegion}>Region: {region}</Text>
      <View style={styles.textConfirmBtns}>
        <Pressable
          style={styles.sendBtn}
          onPress={() => {
            onSubmit();
          }}>
          <Text style={styles.sendBtnText}>Send Message</Text>
        </Pressable>

        <Pressable
          style={[styles.sendBtn, styles.cancel]}
          onPress={() => {
            onCancel();
          }}>
          <Text style={styles.sendBtnText}>Start Over</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TextPreview;
