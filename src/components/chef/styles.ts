import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  chefHeader: {
    paddingVertical: 20,
  },
  chefHeaderText: {fontSize: 30, textAlign: 'center', paddingBottom: 10},
  chefHeaderSubText: {fontSize: 15, textAlign: 'center'},

  chefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },

  chefSubRow: {flexDirection: 'row', alignItems: 'center'},
  arrow: {width: 20, height: 20, marginRight: 10},
  arrowDown: {transform: [{rotate: '90deg'}]},
  chefTitle: {
    fontSize: 20,
  },
  chefListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  chefList: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  editBtn: {
    backgroundColor: 'rgb(220,140,140)',

    marginRight: 10,
  },
  chefInfo: {
    // flexDirection: 'row',
    height: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chefPhoto: {
    flex: 1,
    height: '100%',
    resizeMode: 'contain',
  },
  signupBtn: {
    marginVertical: 20,
    backgroundColor: 'rgba(250,200, 0, .8)',
  },
});
