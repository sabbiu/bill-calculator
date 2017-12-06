import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import store from './store';

import WelcomeScreen from './screens/WelcomeScreen';
import MainScreen from './screens/MainScreen';
import BrowseScreen from './screens/BrowseScreen';

export default () => {
  Navigation.registerComponent('welcome', () => WelcomeScreen, store, Provider);
  Navigation.registerComponent('main', () => MainScreen, store, Provider);
  Navigation.registerComponent('browse', () => BrowseScreen, store, Provider);
  
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'welcome',
    }
  });
  
}
