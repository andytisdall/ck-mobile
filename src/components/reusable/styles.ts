import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  popup: {
    padding: 10,
    borderWidth: 2,
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  error: {
    backgroundColor: 'red',
  },
  alert: {
    backgroundColor: 'green',
  },
  photo: {
    marginTop: 20,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'rgb(250,120,170)',
    borderRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 30,
    margin: 10,
    width: '50%',
  },

  btnText: {
    fontSize: 30,
    textAlign: 'center',
  },
  photoPreview: {
    height: 300,
    width: '80%',
    marginVertical: 20,
  },
  photoPreviewPhoto: {flex: 1, resizeMode: 'contain'},
});
