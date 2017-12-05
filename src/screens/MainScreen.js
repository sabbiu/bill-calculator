import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sampleFunction } from '../actions';

class MainScreen extends Component {
  componentDidMount() {
    console.log(this.props)
    this.props.sampleFunction();
  }

  render () {
    return (
      <View>
        <Text>{this.props.text}</Text>
      </View>
    );
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
