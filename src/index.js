import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import store from './store';

import WelcomeScreen from './screens/WelcomeScreen';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';

export default () => {
  Navigation.registerComponent('welcome', () => WelcomeScreen, store, Provider);
  Navigation.registerComponent('main', () => MainScreen, store, Provider);
  Navigation.registerComponent('settings', () => SettingsScreen, store, Provider);
  
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'welcome',
    }
  });
  
}
