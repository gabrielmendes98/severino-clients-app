import { StyleSheet } from 'react-native';
import theme from 'common/styles/theme';

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    // backgroundColor: '#00FF00',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing(2),
  },
  location: {
    alignItems: 'center',
    // backgroundColor: '#FF0000',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    paddingTop: theme.spacing(1),
  },
  locationText: {
    fontSize: theme.fontSize(1.2),
    marginLeft: theme.spacing(1),
  },
});

export default styles;
