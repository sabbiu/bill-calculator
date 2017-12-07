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
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import ListItem from '../components/ListItem';
import List from '../components/List';

import { sampleFunction } from '../actions';
import { SCREEN_WIDTH } from '../constants';

const LtBox =()=> {
  return (
    <View style={{flex:1}}>
      <Text>Hello</Text>
    </View>
  );
}

class MainScreen extends Component {

  constructor(props) {
    super(props);

    // Register Navbar Button Component
    Navigation.registerComponent('LtBox', () => LtBox);   

    this.state = {
      topButtons : [
        {
          title: 'Edit Title',
          onPress: this.onEditTitle
        },
        {
          title: 'Discount',
          onPress: this.onDiscount
        },
        {
          title: 'Save Bill',
          onPress: this.onSaveBill
        },
        {
          title: 'Clear Bill',
          onPress: this.onClearBill
        },
      ]
    }
  }

  onEditTitle = () => {}
  onDiscount = () => {}
  onSaveBill = () => {}
  onClearBill = () => {}

  componentDidMount() {
    console.log('hellos')
    this.props.sampleFunction();

    this.props.navigator.setTitle({
      title: 'Yo my bill!'
    });
    // this.props.navigator.setSubTitle({
    //   subtitle: 'Connection...'
    // });
  
  }

  render () {
    const { listCol, rightJustified } = styles;

    return (
      <View style={{flex:1}}>
        <View style={{height: 50}}>

          <View style={{flex:1, flexDirection:'row', marginTop:5}}>

            {this.state.topButtons.map((item, i)=> (
              <View key={i} style={{flex:1}}>
                <Button title={item.title} onPress={item.onPress} backgroundColor="tomato" containerViewStyle={{width: '98%', marginLeft: '1%'}} raised />
              </View>
            ))}
            
          </View>
        </View>


        <View style={{height: 50, backgroundColor: 'white'}}>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={[{ width:25, paddingLeft:0}, listCol, {flexDirection: 'column', justifyContent: 'center'}]}>
              <Text>50.</Text>
            </View>
            <View style={{flexGrow:1}}>
              <View style={{flex:1, flexDirection: 'row'}}>

                <View style={{flex:5}}>
                  <TextInput
                    placeholder="Item Name"
                  />
                </View>
                <View style={{flex:2}}>
                  <TextInput
                    textAlign="right"
                    placeholder="Quantity"
                  />
                </View>
                <View style={{flex:2}}>
                  <TextInput
                    textAlign="right"
                    placeholder="Rate"
                  />
                </View>
                <View style={[{flex:3}, listCol, {flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end'}]}>
                  <Text>99.00</Text>
                </View>

              </View>
            </View>
          </View>
        </View> 

        <Button title="Add" backgroundColor="green" containerViewStyle={{width: '100%', marginLeft:0}} />

        <View style={{ width:'100%', height:35, alignItems:'center', justifyContent: 'center'}}>
          <Text style={{color: 'red'}}>This is error message</Text>
        </View>

        <View style={{ width:'100%', height:35, alignItems:'center', justifyContent: 'center'}}>
          <Text style={{color: 'green'}}>This is success message</Text>
        </View>

        <ScrollView style={{flex:1}}>
          
          <List>
            <ListItem
              component={
                <View style={{flex:1, flexDirection: 'row'}}>
                  <View style={[{backgroundColor: '#ccc', width:25}, listCol, rightJustified]}>
                    <Text>50.</Text>
                  </View>
                  <View style={{flexGrow:1}}>
              
                    <View style={{flex:1, flexDirection: 'row'}}>
                      <View style={[{backgroundColor: 'white', borderRightWidth:1, borderRightColor: '#ccc', flex:5}, listCol]}>
                        <Text style={{}}>50.</Text>
                      </View>
              
                      <View style={[{backgroundColor: 'white', borderRightWidth:1, borderRightColor: '#ccc', flex:2}, listCol, rightJustified]}>
                        <Text>50.</Text>
                      </View>
              
                      <View style={[{backgroundColor: 'white', flex:2}, listCol, rightJustified]}>
                        <Text>50.</Text>
                      </View>             
              
                      <View style={[{backgroundColor: '#ccc', flex:3}, listCol, rightJustified]}>
                        <Text>50.</Text>
                      </View>         
                    
                    </View>
              
                  </View>
                </View>
              }
            />

            

            <ListItem
              component={
                <View style={{flex:1, flexDirection: 'row', borderTopColor:'#ccc', borderTopWidth:1}}>
                  <View style={[{width:25, backgroundColor: 'white'}, listCol, rightJustified]}>
                  </View>
                  <View style={{flexGrow:1}}>
              
                    <View style={{flex:1, flexDirection: 'row'}}>
              
                      <View style={[{backgroundColor: 'white',borderRightWidth:1, borderRightColor: '#ccc', flex:9}, listCol, {paddingRight:22}]}>
                        <Text style={{fontWeight:'bold'}}>Discount</Text>
                      </View>             
              
                      <View style={[{backgroundColor: '#fff', flex:3}, listCol, rightJustified]}>
                        <Text style={{fontWeight:'bold'}}>50.</Text>
                      </View>         
                    
                    </View>
              
                  </View>
                </View>
              }
            />

            <ListItem
              component={
                <View style={{flex:1, flexDirection: 'row', borderTopColor:'#ccc', borderTopWidth:1}}>
                  <View style={[{width:25, backgroundColor: 'white'}, listCol, rightJustified]}>
                  </View>
                  <View style={{flexGrow:1}}>
              
                    <View style={{flex:1, flexDirection: 'row'}}>
              
                      <View style={[{backgroundColor: 'white',borderRightWidth:1, borderRightColor: '#ccc', flex:9}, listCol, {paddingRight:22}]}>
                        <Text style={{fontWeight:'bold'}}>Total</Text>
                      </View>             
              
                      <View style={[{backgroundColor: '#fff', flex:3}, listCol, rightJustified]}>
                        <Text style={{fontWeight:'bold'}}>50.</Text>
                      </View>         
                    
                    </View>
              
                  </View>
                </View>
              }
            />
          </List>



        </ScrollView>
        
      </View> 
    );
  }
}

const styles = {
  listCol: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 4,
    paddingRight: 4
  },
  rightJustified: {
    flexDirection:'row', justifyContent: 'flex-end'
  },
  leftJustified: {
    justifyContent: 'right'
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
