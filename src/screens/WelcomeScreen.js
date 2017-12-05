import React, { Component } from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import Slides from '../components/Slides';

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

  navigateToMainScreen = () => {
    this.props.navigator.push({
      screen: 'main',
      title: 'New Bill',
      backButtonHidden: true
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
