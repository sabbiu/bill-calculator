import React, { Component } from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  AsyncStorage,
  Alert
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import Slides from '../components/Slides';
import NavButton from '../components/NavButton';

const SLIDE_DATA = [
  { text: 'Welcome to Bill Calculator' },
  { text: 'Organize your Bills' },
  { text: 'Export Bills to PDF or CSV' }
];

class WelcomeScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);

    // Register Navbar Button Component
    Navigation.registerComponent('NavButton', () => NavButton);   
  }

  componentWillMount() {
    try {
      AsyncStorage.getItem('viewed').then(viewed => {
        console.log('viewed', viewed);
        if (viewed == 'true') this.navigateToMainScreen();
      });
    } catch (error) {
      console.log(error)
    }
    
  }

  onPressBrowse = () => {
    this.props.navigator.push({
      screen: 'browse',
      title: 'Browse Bills'
    });
    console.log(this.props)
  }

  onPressExport = () => {
    Alert.alert('hello');
  }

  navigateToMainScreen = () => {
    this.props.navigator.resetTo({
      screen: 'main',
      title: 'New Bill',
      backButtonHidden: true,
      navigatorButtons: {
        rightButtons: [
          // {
          //   id: 'browse-button',
          //   component: 'NavButton', // This line loads our component as a nav bar button item
          //   title: 'hello',
          //   passProps: {
          //     iconName: 'folder-open',
          //     onPress: this.onPressBrowse
          //   },
          // },
          {
            id: 'export-button',
            component: 'NavButton', // This line loads our component as a nav bar button item
            passProps: {
              iconName: 'file-export',
              onPress: this.onPressExport
            },
          },
        ],
      },
    });
  }

  onSlidesComplete = () => {
    AsyncStorage.setItem('viewed', 'true');
    this.navigateToMainScreen();
  }

  render() {
    return (
      <Slides 
        data={SLIDE_DATA} 
        onComplete={this.onSlidesComplete} 
      />
    );
  }
}

export default WelcomeScreen;
