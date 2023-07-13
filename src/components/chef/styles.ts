import {StyleSheet} from 'react-native';

import {colors} from '../shiftSignup/styles';

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
    padding: 20,
  },
  chefListContainer: {
    borderBottomWidth: 1,
  },
  chefList: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 5,
    marginBottom: 20,
  },
  editBtn: {
    backgroundColor: colors.med,
    marginRight: 10,
  },
  chefInfo: {
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
    backgroundColor: colors.beige,
  },
  mealCountInput: {width: 75, backgroundColor: 'white'},
});
