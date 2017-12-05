import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import { 
  Text, 
  View,
  StyleSheet
} from 'react-native';

class SplashScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  mixins: [TimerMixin];  

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    TimerMixin.setTimeout(
      () => { 
        this.props.navigator.push({
          screen: 'main',
          title: 'New Bill',
          animated: true,
          animationType: 'fade',
          backButtonHidden: true
        }); 
      },
      500
    );
  }

  render() {
    const { containerStyle } = style;

    return (
      <View style={containerStyle}>
        <Text>Tis is Splash Screen</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  containerStyle : {
    backgroundColor: 'red',
    flex: 1
  }
})

export default SplashScreen;
