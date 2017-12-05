import React, { Component } from 'react';
import { 
  View, 
  Text, 
  ScrollView,
  Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';

class Slides extends Component {

  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          title="Start Right Now!"
          raised
          onPress={this.props.onComplete}
        />
      )
    }
  }

  renderSlides() {
    const { textStyle, slideStyle, absolute, img } = styles;

    return this.props.data.map((slide, index) => (
      <View key={index} style={slideStyle}>
        <Image
          style={[absolute, img]}
          resizeMode='cover'
          source={require('../assets/welcome_1.jpg')} 
          blurRadius={6}
        />
        <Text style={textStyle}>{slide.text}</Text>
        {this.renderLastSlide(index)}
      </View>
    ));
  }

  render () {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex:1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = ScaledSheet.create({
  textStyle: {
    fontSize: '30@ms',
    color: 'white',
    marginBottom: '100@vs'
  },
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  img: {
    height: SCREEN_HEIGHT
  },
  absolute: {
    position: 'absolute',
    top: 0, bottom: 0, right: 0, left: 0
  }
});

export default Slides;
