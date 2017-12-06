import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import Button from './Button';
import {  SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';

class Keypad extends Component {

  render() {
    const { containerSyle, rowStyle, buttonStyle } = styles;
    
    const data = [
      [ 1, 2, 3, 'BACK'],
      [ 4, 5, 6, 'PREV'],
      [ 7, 8, 9, 'NEXT'],
      [ '.', 0, '', 'ADD'],
    ];

    const styleText = [
      [ null, null, null, {color: 'red'} ],
      [ null, null, null, {color: 'black'}],
      [ null, null, null, {color: 'black'}],
      [ null, null, null, {color: 'green'}],
    ];

    return (
      <View style={containerSyle}>
        {data.map((r, i) => { 
          return(
            <View key={i} style={rowStyle}>
              {r.map((c,j) => {
                return(
                  <View key={j} style={buttonStyle}>
                    <Button
                      onPress={() => this.props.onPress(c)}
                      styleText={styleText[i][j]}
                    >
                      {`${c}`}
                    </Button>
                  </View>
                )
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

const HEIGHT = 240;
const WIDTH = 350;
const RIGHT = 5;
const BOTTOM = 5;
const styles = ScaledSheet.create({
  containerSyle: {
    height: HEIGHT,
    width: WIDTH,
    right: RIGHT,
    bottom: BOTTOM,
    position: 'absolute',
    
  },
  rowStyle: {
    flexDirection: 'row',
    flex:1
  },
  buttonStyle: {
    backgroundColor: '#ccc',
    flex:1
  }
})

export default Keypad;
