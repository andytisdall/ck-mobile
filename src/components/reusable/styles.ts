import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  scrollView: {
    minHeight: '100%',
  },
  appTitleContainer: {
    paddingVertical: 20,
  },
  appTitle: {
    fontSize: 40,
    textAlign: 'center',
  },
  appSubTitle: {
    paddingTop: 10,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '600',
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
    backgroundColor: 'rgb(200,70,20)',
    margin: 10,
    width: '50%',
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 3},
    shadowOpacity: 0.3,
    borderWidth: 2,
  },
  btnText: {
    paddingVertical: 10,
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
    paddingHorizontal: 10,
  },
  photoPreview: {
    height: 330,
    width: '80%',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  photoPreviewPhoto: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
  },
});
