import React, { Component } from 'react';
import { 
  Text, 
  View, 
  Alert, 
  ScrollView, 
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormLabel, FormInput } from 'react-native-elements'

import Keypad from '../components/NumericKeypad';

import { sampleFunction } from '../actions';

class MainScreen extends Component {

  componentDidMount() {
    console.log('hellos')
    this.props.sampleFunction();

  }

  onPress = (value) => {
    console.log(value)
  }

  render () {
    return (
      <View style={{flex:1}}>
        <ScrollView>
          <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex:2}}>
                <TextInput
                  onFocus={Keyboard.dismiss()}
                />
              </View>
            <View style={{flex:1}}>
              <TextInput/>
            </View>
            <View style={{flex:1}}>
              <TextInput/>
            </View>
          </View>


        </ScrollView>
        <Keypad 
          onPress={this.onPress}
        />
        
        {/* <View style={styles.keypadStyle}>
          <Keypad />
        </View> */}
      </View> 
    );
  }
}

const styles = {
  keypadStyle: {
    position: 'absolute',
    bottom: 5
  }
}

function mapStateToProps({ bill }) {
  const { text } = bill;
  return { text }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sampleFunction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
