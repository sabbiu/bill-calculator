import React, { Component } from 'react';
import { 
  Text, 
  View,
  SectionList,
  ActivityIndicator
} from 'react-native';
import {
  Button, ListItem
} from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../components/Modal';

import {
  fetchBills,
  loadThisBill,
  deleteBill
} from '../actions';

class BrowseScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      deleteModalVisible: false,
      toBeDeleted: ''
    };
  }

  componentWillMount() {

    this.props.fetchBills();
  }

  itemPressed = (item) => {
    this.props.navigator.pop({
      animated: true,
      animationType: 'fade'
    });
    this.props.loadThisBill(item.id);
  }

  render() {
    const { headerStyle, containerStyle } = styles;
    const { savedBills, loading } = this.props;

    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        {loading
          ? (<ActivityIndicator animating = {true} color = '#bc2b78' size = "large" />)
          : null}

        {savedBills.length == 0
          ? (<Text style={{marginTop: 10, alignSelf: 'center'}}>No Bills found. Save a bill to browse</Text>)
          : null}
        <SectionList
          renderItem={({item}) => (
            <ListItem
              title={item.name}
              onPress={() => this.itemPressed(item)}
              onPressRightIcon={() => this.setState({ deleteModalVisible: true, toBeDeleted: item.id })}
              rightIcon={{name: 'delete', color: '#E33935'}}
              leftIcon={{name: 'gesture-tap', type:'material-community', color: '#ccc'}}
              containerStyle={{
                backgroundColor: 'white'
              }}
            />
          )}
          renderSectionHeader={({section}) => (
            <Text style={headerStyle}> {section.key} </Text>
          )}
          sections={savedBills}
          keyExtractor={ item => item.id }
        />

        {/* delete modal */}
        <Modal
          visible={this.state.deleteModalVisible}
          title="Are you sure?"
          content={
            <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
              <Text>This will delete selected bill</Text>
            </View>
          }
          onAccept={()=>{
            this.setState({deleteModalVisible: false});
            this.props.deleteBill(this.state.toBeDeleted);
          }}
          onDecline={()=>{
            this.setState({deleteModalVisible: false});
          }}
        />
      </View>
    );
  }
}

const styles = {
  headerStyle: {
    fontSize: 20
  },
  containerStyle: {
    marginTop: 100,
    marginBottom: 50
  }
}

function mapStateToProps({ browseBills }) {
  const { savedBills, loading } = browseBills;
  return { savedBills, loading };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBills, loadThisBill, deleteBill }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseScreen);
