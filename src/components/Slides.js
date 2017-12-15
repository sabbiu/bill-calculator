import React, { Component } from 'react';
import { 
  View, 
  Text, 
  ScrollView,
  Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import Circle from '../components/Circle';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';

class Slides extends Component {

  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          title="Start Right Now!"
          buttonStyle={{ backgroundColor: '#5981FF' }}
          raised
          onPress={this.props.onComplete}
        />
      )
    } else {
      return (
        <View style={{flexDirection: 'row'}}>
          {this.props.data.map( (item, i)=> {
            if (i == index) return (<Circle key={i} color='#5981FF'/>);
            else return (<Circle key={i} color='#ccc'/>)
          })}
          
        </View>
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
          source={slide.img} 
          blurRadius={slide.blurRadius}
        />
        <Text style={textStyle}>{slide.text}</Text>
        {this.props.viewed===false
          ? this.renderLastSlide(index)
          : null}
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
    marginBottom: '100@vs',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2}
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
