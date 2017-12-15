import React, { Component } from 'react';
import { 
  View,
  AsyncStorage,
  Platform,
  Alert
} from 'react-native';
import { Button } from 'react-native-elements';

import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Bill Calculator', img: require('../assets/welcome_1.jpg'), blurRadius: 6 },
  { text: 'Organize your Bills', img: require('../assets/welcome_2.jpg'), blurRadius: 1 },
  { text: 'Export Bills to PDF or CSV', img: require('../assets/welcome_3.jpg'), blurRadius: 2 }
];

class WelcomeScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    // try {
    //   AsyncStorage.getItem('viewed').then(viewed => {
    //     console.log('viewed', viewed);
    //     if (viewed == 'true') this.navigateToMainScreen();
    //   });
    // } catch (error) {
    //   console.log(error)
    // }
    
  }

  

  navigateToMainScreen = () => {
    this.props.navigator.resetTo({
      screen: 'main',
      title: 'New Bill',
      backButtonHidden: true,
    });
  }

  onSlidesComplete = () => {
    AsyncStorage.setItem('viewed', 'true');
    this.navigateToMainScreen();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Slides 
          data={SLIDE_DATA} 
          onComplete={this.onSlidesComplete} 
        />
        <Button
          title="Skip Intro"
          onPress={this.onSlidesComplete}
          containerViewStyle={{
            position: 'absolute',
            bottom: 20,
            left: 10
          }}
          buttonStyle={{
            backgroundColor: 'rgba(0,0,0,0)'
          }}
          textStyle={{
            borderBottomWidth: 2,
            borderBottomColor: 'white'
          }}
        />
      </View>
    );
  }
}

export default WelcomeScreen;
