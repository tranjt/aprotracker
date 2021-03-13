import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: 'black',
    textSecondary: '#4dd0e1',
    textThird: '#009faf',
    primary: '#4dd0e1',
    primaryLight: '#e5ffff',
    primaryDark: '#009faf',
    appBar: '#24292e',
    error: '#d73a4a',
    disabled: '#c0c0c0',
    smallerText: '#989898'
  },
  fontSizes: {
    smallerText: 12,
    body: 14,
    subheading: 16,
    title: 20,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  }
};

export default theme;