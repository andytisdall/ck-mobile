import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  appTitleContainer: {
    paddingVertical: 30,
  },
  appTitle: {
    fontSize: 50,
    textAlign: 'center',
  },
  appSubTitle: {
    fontSize: 35,
    textAlign: 'center',
  },
  popup: {
    padding: 10,
    borderWidth: 2,
    textAlign: 'center',
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
    paddingVertical: 20,
    margin: 10,
    width: '50%',
  },

  btnText: {
    fontSize: 25,
    textAlign: 'center',
  },
  photoPreview: {
    height: 330,
    width: '80%',
    marginVertical: 20,
  },
  photoDelete: {
    height: 35,
    width: 35,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: 'rgb(230,230,230)',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoDeleteText: {color: 'red', fontSize: 20},
  photoPreviewPhoto: {flex: 1, resizeMode: 'contain'},
});
