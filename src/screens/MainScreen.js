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

import { 
  currentItemUpdate, 
  addToList,
  saveBill,
  clearBill,
  loadSaved
} from '../actions';
import { SCREEN_WIDTH } from '../constants';

class MainScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      topButtons : [
        { title: 'Edit Title', onPress: this.onEditTitle },
        { title: 'Discount', onPress: this.onDiscount },
        { title: 'Save Bill', onPress: this.onSaveBill },
        { title: 'Clear Bill', onPress: this.onClearBill },
      ]
    }
  }

  onEditTitle = () => {}
  onDiscount = () => {}
  onSaveBill = () => {
    console.log(this.props.items)
    this.props.saveBill();
  }
  onClearBill = () => {
    this.props.clearBill();
  }

  componentWillMount() {
    this.props.loadSaved();
  }

  componentDidUpdate(prevProps) {
    if (this.props.title != prevProps.title) {
      this.props.navigator.setTitle({
        title: this.props.title
      })
    }
  }

  componentDidMount() {
    // this.props.navigator.setTitle({
    //   title: 'Yo my bill!'
    // });
    // this.props.navigator.setSubTitle({
    //   subtitle: 'Connection...'
    // });
  
  }

  render () {
    const { listCol, rightJustified } = styles;
    const { currentItem, items, discount, total, error, success } = this.props;

    return (
      <View style={{flex:1, backgroundColor: '#eeeeee'}}>
        <View style={{height: 50}}>

          <View style={{flex:1, flexDirection:'row', marginTop:5}}>

            {this.state.topButtons.map((item, i)=> (
              <View key={i} style={{flex:1}}>
                <Button title={item.title} onPress={item.onPress} backgroundColor="#990000" containerViewStyle={{width: '98%', marginLeft: '1%'}} raised />
              </View>
            ))}
            
          </View>
        </View>


        <View style={{height: 50, backgroundColor: 'white'}}>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={[{ width:25, paddingLeft:0}, listCol, {flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'center'}]}>
              <Text>{`${currentItem.id}.`}</Text>
            </View>
            <View style={{flexGrow:1}}>
              <View style={{flex:1, flexDirection: 'row'}}>

                <View style={{flex:5}}>
                  <TextInput
                    placeholder="Item Name"
                    value={currentItem.name}
                    onChangeText={value => this.props.currentItemUpdate({prop:'name', value})}
                  />
                </View>
                <View style={{flex:2}}>
                  <TextInput
                    placeholder="Quantity"
                    value={`${currentItem.quantity}`}
                    onChangeText={value => this.props.currentItemUpdate({prop:'quantity', value})}
                  />
                </View>
                <View style={{flex:2}}>
                  <TextInput
                    placeholder="Rate"
                    value={`${currentItem.rate}`}
                    onChangeText={value => this.props.currentItemUpdate({prop:'rate', value})}
                  />
                </View>
                <View style={[{flex:3}, listCol, {flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end'}]}>
                  <Text>{currentItem.total.toFixed(2)}</Text>
                </View>

              </View>
            </View>
          </View>
        </View> 

        {currentItem.rate !== ''
          ? (<Button onPress={()=>this.props.addToList(this.props)} title="Add to List" backgroundColor="green" containerViewStyle={{width: '100%', marginLeft:0}} />)
          : null}

        {error
          ? (<View style={{ width:'100%', height:35, alignItems:'center', justifyContent: 'center'}}>
              <Text style={{color: 'red'}}>{error}</Text>
            </View>)
          : null}

        {success
          ? (<View style={{ width:'100%', height:35, alignItems:'center', justifyContent: 'center'}}>
              <Text style={{color: 'green'}}>This is success message</Text>
            </View>)
          : null}

        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 60}}>
          
          <List>
            {items.map((item) => {
              return (<ListItem
                  key = {item.id}
                  component={
                    <View style={{flex:1, flexDirection: 'row'}}>
                      <View style={[{backgroundColor: '#ccc', width:25}, listCol, rightJustified]}>
                        <Text>{item.id}</Text>
                      </View>
                      <View style={{flexGrow:1}}>
                  
                        <View style={{flex:1, flexDirection: 'row'}}>
                          <View style={[{backgroundColor: 'white', borderRightWidth:1, borderRightColor: '#ccc', flex:5}, listCol]}>
                            <Text style={{}}>{item.name}</Text>
                          </View>
                  
                          <View style={[{backgroundColor: 'white', borderRightWidth:1, borderRightColor: '#ccc', flex:2}, listCol, rightJustified]}>
                            <Text>{item.quantity}</Text>
                          </View>
                  
                          <View style={[{backgroundColor: 'white', flex:2}, listCol, rightJustified]}>
                            <Text>{item.rate}</Text>
                          </View>             
                  
                          <View style={[{backgroundColor: '#ccc', flex:3}, listCol, rightJustified]}>
                            <Text>{item.total.toFixed(2)}</Text>
                          </View>         
                        
                        </View>
                  
                      </View>
                    </View>
                  }
                />)})
              }



            
            <View style={{flex:1, flexDirection: 'row', borderTopColor:'#ccc', borderTopWidth:1}}>
              <View style={[{width:25, backgroundColor: 'white'}, listCol, rightJustified]}>
              </View>
              <View style={{flexGrow:1}}>
          
                <View style={{flex:1, flexDirection: 'row'}}>
          
                  <View style={[{backgroundColor: 'white',borderRightWidth:1, borderRightColor: '#ccc', flex:9}, listCol, {paddingRight:22}]}>
                    <Text style={{fontWeight:'bold'}}>Discount</Text>
                  </View>             
          
                  <View style={[{backgroundColor: '#fff', flex:3}, listCol, rightJustified]}>
                    <Text style={{fontWeight:'bold'}}>{discount.toFixed(2)}</Text>
                  </View>         
                
                </View>
          
              </View>
            </View>
              

        
            <View style={{flex:1, flexDirection: 'row', borderTopColor:'#ccc', borderTopWidth:1}}>
              <View style={[{width:25, backgroundColor: 'white'}, listCol, rightJustified]}>
              </View>
              <View style={{flexGrow:1}}>
          
                <View style={{flex:1, flexDirection: 'row'}}>
          
                  <View style={[{backgroundColor: 'white',borderRightWidth:1, borderRightColor: '#ccc', flex:9}, listCol, {paddingRight:22}]}>
                    <Text style={{fontWeight:'bold'}}>Total</Text>
                  </View>             
          
                  <View style={[{backgroundColor: '#fff', flex:3}, listCol, rightJustified]}>
                    <Text style={{fontWeight:'bold'}}>{total.toFixed(2)}</Text>
                  </View>         
                
                </View>
          
              </View>
            </View>


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
  const { currentItem, items, discount, total, error, success } = bill;
  return { currentItem, items, discount, total, error, success }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    currentItemUpdate, 
    addToList,
    saveBill,
    loadSaved,
    clearBill
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
