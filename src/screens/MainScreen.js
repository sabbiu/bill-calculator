import React, { Component } from 'react';
import { 
  Text, 
  View, 
  Alert, 
  ScrollView, 
  TextInput,
  Keyboard,
  ListView,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { SwipeListView } from 'react-native-swipe-list-view';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import CSV from 'csv.js';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

import ListMy from '../components/List';
import ButtonMy from '../components/Button';
import Modal from '../components/Modal';
import {IconsMap, IconsLoaded} from '../components/AppIcons';


import { 
  currentItemUpdate, 
  addToList,
  saveBill,
  clearBill,
  loadSaved,
  topUpdates,
  saveOthers,
  deleteListRow,
  editListRow,
  saveEditItem,
  newBill
} from '../actions';
import { SCREEN_WIDTH } from '../constants';

const DIR = `${RNFS.ExternalStorageDirectoryPath}/documents`

class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      topButtons : [
        { title: 'Set Title', onPress: this.onEditTitle },
        { title: 'Discount', onPress: this.onDiscount },
        { title: 'Save Bill', onPress: this.onSaveBill },
        // { title: 'Clear Bill', onPress: this.onClearBill },
        { title: 'New Bill', onPress: this.onNewBill },
      ],

      editTitleVisible: false,
      clearBillVisible: false,
      discountVisible: false,
      exportVisible: false,
      newBillVisible: false,
    };

    this.inputs =[];
  }

  /**
   * Navigator Buttons
   */
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'export-button') {
        this.onPressExport();
      }
      if (event.id == 'browse-button') {
        this.onPressBrowse();
      }
    }
  }

  onPressBrowse = () => {
    this.props.navigator.push({
      screen: 'browse',
      title: 'Browse Bills'
    });
  }

  onPressExport = () => {
    if (this.props.items.length === 0) {
      Alert.alert('Add items in the bill first');
    } else {
      this.setState({exportVisible: true});
    }
  }

  _renderRightNavButtons() {
    IconsLoaded.then(() => {
      this.props.navigator.setButtons({
        rightButtons: [
          {
            id: 'browse-button',
            disableIconTint: true,
            icon: IconsMap['browse']
          },
          {
            id: 'export-button',
            disableIconTint: true,
            icon: IconsMap['fileExport'],
          }
        ],
        animated: true
      });
    });
  }

  /**
   * Lifecycle methods
   */
  componentWillMount() {
    this.props.loadSaved();
    // AsyncStorage.clear()
    // AsyncStorage.getAllKeys().then(response => { console.log(response);})
    // AsyncStorage.setItem('savedBill', JSON.stringify([
    //   { id: moment('2017-12-17', 'YYYY-MM-DD').format(), name: 'Christmas Shopping'},
    //   { id: moment('2017-12-16', 'YYYY-MM-DD').format(), name: 'Accessories'},
    //   { id: moment('2017-12-16', 'YYYY-MM-DD').format(), name: 'Sports'},
    //   { id: moment('2017-12-12', 'YYYY-MM-DD').format(), name: 'Electronics'},
    //   { id: moment('2017-12-12', 'YYYY-MM-DD').format(), name: 'Groceries'},
    //   { id: moment('2017-12-12', 'YYYY-MM-DD').format(), name: 'Hostel'},
    //   { id: moment('2017-12-12', 'YYYY-MM-DD').format(), name: 'College Fee Dec'},
    //   { id: moment('2017-10-12', 'YYYY-MM-DD').format(), name: 'Shopping Mall'},
    //   { id: moment('2017-10-12', 'YYYY-MM-DD').format(), name: 'Groceries'},
    //   { id: moment('2017-10-12', 'YYYY-MM-DD').format(), name: 'Hostel'},
    // ]))

  }

  componentDidMount() {
    this._renderRightNavButtons();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.title != this.props.title)
      this.props.navigator.setTitle({
        title: this.props.title
      });
  }

  /**
   * Top Buttons
   */
  onEditTitle = () => { this.setState({editTitleVisible:true}) }
  onDiscount = () => { this.setState({ discountVisible:true}) }
  onSaveBill = () => { 
    const { billId, title, items, discountPer, total } = this.props;
    
    if (items.length === 0 ) {
      Alert.alert('Add items in the bill first');
    } else {
      const id = billId === '' ? moment().format() : billId;
      this.props.saveBill(this.props.navigator, {
        id, name: title
      }, billId, {
        billId: id,
        title, items, discountPer, total
      });
    }
    
  }
  onClearBill = () => { this.setState({clearBillVisible:true}) }
  onNewBill = () => { this.setState({newBillVisible:true}) }

  // export as CSV
  createCSVFile = (path, csv_string) => {
    
    RNFS.writeFile(path, csv_string, 'utf8')
      .then( success => {
        this.setState({exportVisible: false})
        Alert.alert('Exported successfully!', `Go to ${path} to view your file`)
        // console.log('file written')
      })
      .catch(err => {
        Alert.alert('Export Unsuccessful');
        // console.log(err)
      })
  }

  exportAsCSV = () => {
    const { items, total, discountPer, title } = this.props;
    // console.log(items, total, discountPer, title);

    // as csv
    // encode as csv
    const encoded = CSV.encode( items.map(item => {
      return {
        "S. No." : item.id,
        "Name": item.name,
        "Quantity": item.quantity,
        "Rate": item.rate,
        "Price": item.total
      }
    }) );

    const csv_string = `${encoded}\n,Sum,,,${total}\n,Discount,,${discountPer}%,${total*discountPer/100}\n,Total,,,${total - total*discountPer/100}`
    // // console.log(csv_string);
    // check if folder exists
    const filename = `/${Math.floor(Math.random()*1000)+1}${title.substr(0,20).split(' ').join('_')}.csv`;
    const path = DIR + filename;
    type MkdirOptions = {
      NSURLIsExcludedFromBackupKey?: boolean;
    }

    RNFS.exists(DIR)
      .then( success => {
        // console.log(success);

        if (!success) {
          if (Platform.OS == 'ios')
            RNFS.mkdir(dir, MkdirOptions).then(success => {
              this.createCSVFile(path, csv_string);
              // console.log(success);
            }).catch(error => {
              // console.log('error', error);
            });
          else
            RNFS.mkdir(dir).then(() => {
              // console.log('folder ra file duitai banyo');
              this.createCSVFile(path, csv_string);
          
            }).catch(error => {
              // console.log('error', error);
            });
        } else {
          // console.log('file banyo')
          this.createCSVFile(path, csv_string);
        }
      })
      .catch( error => {
        // console.log('error', error);
      })
  }

  //export as pdf

  async createPDF(html, fileName) {

      let options = {
        html,
        fileName,
        directory: 'docs',
      };
  
      try {
        const results = await RNHTMLtoPDF.convert(options);
        if (results.filePath) {
          this.setState({exportVisible: false});
          Alert.alert('Exported successfully!', `Go to ${results.filePath} to view your file`)
        }
        // console.log(results)
      } catch (err) {
        Alert.alert('Export Unsuccessful');
        console.error(err)
      }
  
      // let file = await RNHTMLtoPDF.convert(options)
      // // console.log(file.filePath);
    }
  exportAsPDF = () => {

    const { items, total, discountPer, title } = this.props;
    // // console.log(items, total, discountPer, title);
    let inner_table = '';
    items.forEach( item => {
      inner_table += `<tr style='border: 10px solid black;'>
        <td class='right'>${item.id}</td>
        <td>${item.name}</td>
        <td class='right'>${item.quantity}</td>
        <td class='right'>${item.rate}</td>
        <td class='right'>${item.total.toFixed(2)}</td>
      </tr>`
    });
    let discount = discountPer * total /100;
    let pdf_string = `<style>
      #bill {
        border-collapse: collapse;
        width: 100%;
      }
      
      #bill td, #bill th {
          border: 1px solid #ddd;
          padding: 8px;
      }
      
      #bill tr:nth-child(even){background-color: #f2f2f2;}
      
      #bill th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: #000;
          color: white;
      }

      .right {
        text-align: right;
      }
    </style>
    <h1>${title}</h1>
      <br>
      <table id="bill">
        <tr>
          <th>S.No.</th>  
          <th>Name</th>  
          <th>Quantity</th>  
          <th>Rate</th>  
          <th>Price</th>  
        </tr>
        ${inner_table}
        <tr>
          <td></td>
          <td colspan='3'>Sum</td>
          <td class='right'>${total.toFixed(2)}</td>
        </tr>
          <tr>
          <td></td>
          <td colspan='2'>Discount</td>
          <td class='right'>${discountPer}%</td>
          <td class='right'>${discount.toFixed(2)}</td>
        </tr>
        <tr>
          <td></td>
          <td colspan='3'>Total</td>
          <td class='right'>${(total.toFixed(2) - discount.toFixed(2)).toFixed(2)}</td>
        </tr>
      
      </table>`

    this.createPDF(pdf_string, `${Math.floor(Math.random()*1000)+1}${title.substr(0,20).split(' ').join('_')}`);

  }

  // delete and edit row items
  deleteRow = (secId, rowId, rowMap) => {
    rowMap[`${secId}${rowId}`].closeRow();
    const { items, discountPer, title, billId} = this.props;
    this.props.deleteListRow({rowId, items, discountPer, title, billId});
  }

  editRow = (secId, rowId, rowMap) => {
    rowMap[`${secId}${rowId}`].closeRow();
    this.props.editListRow(rowId);
  }

  // input field focus
  focusNextField = id => this.inputs[id].focus();

  addToList = () => {
    const { items, currentItem, discountPer, title, billId} = this.props;
    this.props.addToList({ items, currentItem, discountPer, title, billId});
  }

  saveEditItem = () => {
    const { items, currentItem, discountPer, title, billId} = this.props;
    this.props.saveEditItem({ items, currentItem, discountPer, title, billId})
  }

  render () {
    const { listCol, rightJustified } = styles;
    const { currentItem, items, discount, total, error, success, title, discountPer, editing, loading, savingLoader, billId } = this.props;

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return (
      <View style={{flex:1, backgroundColor: '#eee'}}>
        {/* Top buttons */}
        <View style={{height: 50}}>

          <View style={{flex:1, flexDirection:'row', marginTop:5}}>

            {this.state.topButtons.map((item, i)=> (
              <View key={i} style={{flex:1}}>
                <Button title={item.title} onPress={item.onPress} backgroundColor="#900" containerViewStyle={{width: '98%', marginLeft: '1%'}} raised />
              </View>
            ))}
            
          </View>
        </View>

        {/* Text inputs */}
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

                    blurOnSubmit={false}
                    onSubmitEditing={() => this.focusNextField('qty')}
                    ref={input => this.inputs['name'] = input}
                    returnKeyType={'next'}
                  />
                </View>
                <View style={{flex:2}}>
                  <TextInput
                    placeholder="Quantity"
                    value={`${currentItem.quantity}`}
                    onChangeText={value => this.props.currentItemUpdate({prop:'quantity', value})}
                  
                    blurOnSubmit={false}
                    onSubmitEditing={() => this.focusNextField('rate')}
                    ref={input => this.inputs['qty'] = input}
                    returnKeyType={'next'}
                  />
                </View>
                <View style={{flex:2}}>
                  <TextInput
                    placeholder="Rate"
                    value={`${currentItem.rate}`}
                    onChangeText={value => this.props.currentItemUpdate({prop:'rate', value})}

                    blurOnSubmit={ true }
                    onSubmitEditing={() => {
                      if (currentItem.rate !== '' && currentItem.name !== '') {
                        if (!editing) this.addToList(); 
                        else this.saveEditItem();
                      }
                      this.focusNextField('name');
                    }}
                    returnKeyType={ "done" }
                    ref={ input => this.inputs['rate'] = input}
                  />
                </View>
                <View style={[{flex:3}, listCol, {flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end'}]}>
                  <Text>{currentItem.total.toFixed(2)}</Text>
                </View>

              </View>
            </View>
          </View>
        </View> 

        {currentItem.rate !== '' && currentItem.name !== ''
          ? editing
            ? (<Button onPress={this.saveEditItem} title="Save Changes" backgroundColor="green" containerViewStyle={{width: '100%', marginLeft:0}} />)
            : (<Button onPress={this.addToList} title="Add to List" backgroundColor="green" containerViewStyle={{width: '100%', marginLeft:0}} />)
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
        
        {loading
          ? (<ActivityIndicator animating = {true} color = '#bc2b78' size = "large" />)
          : null}
        
        <ScrollView>

          <SwipeListView
              enableEmptySections
              dataSource={this.ds.cloneWithRows(items)}
              renderRow={item =>
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
              renderHiddenRow={ (data, secId, rowId, rowMap) => (
                <View style={styles.rowBack}>
                  <TouchableOpacity 
                    style={[styles.backLeftBtn]} 
                    onPress={ _ => this.editRow(secId, rowId, rowMap) }
                  >
                    <MaterialIcon name="lead-pencil" size={25} color="#3F51B5" />
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.backRightBtn, styles.backRightBtnRight]} 
                    onPress={ _ => this.deleteRow(secId, rowId, rowMap) }
                  >
                    <MaterialIcon name="delete" size={25} color="#E33935" />
                    {/* <Text style={styles.backTextWhite}>Delete</Text> */}
                  </TouchableOpacity>
                </View>
              )}
              leftOpenValue={45}
              rightOpenValue={-45}
            />
          <ListMy>

          {items.length > 0 ? 
          
            <View>
              {/* sum */}
              <View style={{flex:1, flexDirection: 'row', borderTopColor:'#ccc', borderTopWidth:1}}>
                <View style={[{width:25, backgroundColor: 'white'}, listCol, rightJustified]}>
                </View>
                <View style={{flexGrow:1}}>
            
                  <View style={{flex:1, flexDirection: 'row'}}>
            
                    <View style={[{backgroundColor: 'white',borderRightWidth:1, borderRightColor: '#ccc', flex:9}, listCol, {paddingRight:22}]}>
                      <Text style={{fontWeight:'bold'}}>Sum</Text>
                    </View>             
            
                    <View style={[{backgroundColor: '#fff', flex:3}, listCol, rightJustified]}>
                      <Text style={{fontWeight:'bold'}}>{total.toFixed(2)}</Text>
                    </View>         
                  
                  </View>
            
                </View>
              </View>

              {/* discount */}
              <View style={{flex:1, flexDirection: 'row', borderTopColor:'#ccc', borderTopWidth:1}}>
                <View style={[{width:25, backgroundColor: 'white'}, listCol, rightJustified]}>
                </View>
                <View style={{flexGrow:1}}>
            
                  <View style={{flex:1, flexDirection: 'row'}}>
            
                    <View style={[{backgroundColor: 'white',borderRightWidth:1, borderRightColor: '#ccc', flex:7}, listCol, {paddingRight:14}]}>
                      <Text style={{fontWeight:'bold'}}>Discount</Text>
                    </View> 

                    <View style={[{backgroundColor: '#fff',borderRightWidth:1, borderRightColor: '#ccc', flex:2,}, listCol, rightJustified]}>
                      <Text>{`${discountPer} %`}</Text>
                    </View>            
            
                    <View style={[{backgroundColor: '#fff', flex:3}, listCol, rightJustified]}>
                      <Text style={{fontWeight:'bold'}}>{(discountPer * total /100).toFixed(2)}</Text>
                    </View>         
                  
                  </View>
            
                </View>
              </View>
                

              {/* total */}
              <View style={{flex:1, flexDirection: 'row', borderTopColor:'#ccc', borderTopWidth:1}}>
                <View style={[{width:25, backgroundColor: 'white'}, listCol, rightJustified]}>
                </View>
                <View style={{flexGrow:1}}>
            
                  <View style={{flex:1, flexDirection: 'row'}}>
            
                    <View style={[{backgroundColor: 'white',borderRightWidth:1, borderRightColor: '#ccc', flex:9}, listCol, {paddingRight:22}]}>
                      <Text style={{fontWeight:'bold'}}>Total</Text>
                    </View>             
            
                    <View style={[{backgroundColor: '#fff', flex:3}, listCol, rightJustified]}>
                      <Text style={{fontWeight:'bold'}}>{(total - discountPer * total/ 100).toFixed(2)}</Text>
                    </View>         
                  
                  </View>
            
                </View>
              </View>
            </View>
          : null}


          </ListMy>

          {items.length > 0 && items.length <6
          ? (<View style={{ width:'100%', alignItems:'center', justifyContent: 'center'}}>
              <Text style={{color: 'green'}}>You can swipe the entered item</Text>
              <Text style={{color: '#3F51B5'}}>Swipe right to Edit</Text>
              <Text style={{color: '#E33935'}}>Swipe left to Delete</Text>
            </View>)
          : null}


        </ScrollView>

        

        {/* edittitle modal */}
        <Modal
          visible={this.state.editTitleVisible}
          title="Set title for your bill"
          content={
            <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
              <TextInput 
                placeholder="Edit the title"
                style={{width:"80%"}}
                value={title}
                onChangeText={value => this.props.topUpdates({prop:'title', value})}
              />
            </View>
          }
          onAccept={()=>{
            this.setState({editTitleVisible: false});
            if (title == '') { this.props.topUpdates({prop:'title', value:'Untitled'}) }
            this.props.navigator.setTitle({ title });
            this.props.saveOthers({prop:'title', value:title});
          }}
          onDecline={null}
        />

        {/* clearbill modal */}
        <Modal
          visible={this.state.clearBillVisible}
          title="Are you sure?"
          content={
            <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
              <Text>This will delete all the contents in your bill</Text>
            </View>
          }
          onAccept={()=>{
            this.setState({clearBillVisible: false});
            this.props.clearBill();
          }}
          onDecline={()=>{
            this.setState({clearBillVisible: false});
          }}
        />

        {/* discount modal */}
        <Modal
          visible={this.state.discountVisible}
          title="Set discount percentage for your bill"
          content={
            <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
              <TextInput 
                placeholder="Set discount percentage"
                style={{width:"80%"}}
                value={`${discountPer}`}
                onChangeText={value => this.props.topUpdates({prop:'discountPer', value})}
              />
            </View>
          }
          onAccept={()=>{
            this.setState({discountVisible: false});
            this.props.saveOthers({prop:'discountPer', value:discountPer});
          }}
          onDecline={() => {
            this.setState({discountVisible: false});            
          }}
        />

        {/* export modal */}
        <Modal
          visible={this.state.exportVisible}
          title="Export As..."
          content={
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
              <Button 
                onPress={this.exportAsCSV}
                title='CSV'
                containerViewStyle={{margin:10}}
                large
                raised
                buttonStyle={{
                  height:40, 
                  paddingLeft:30,
                  paddingTop:30,
                  paddingBottom:30,
                  backgroundColor:'#207347'
                }}
                textStyle={{
                  color: 'white'
                }}
                icon={{name: 'file-excel-o', type: 'font-awesome'}}
              />
              <Button 
                onPress={this.exportAsPDF}
                title='PDF'
                containerViewStyle={{margin:10}}
                large
                raised
                buttonStyle={{
                  height:40, 
                  paddingLeft:30,
                  paddingTop:30,
                  paddingBottom:30,
                  backgroundColor:'#D5483E'
                }}
                textStyle={{
                  color: 'white'
                }}
                icon={{name: 'file-pdf-o', type: 'font-awesome'}}
              />
            </View>
          }
          onAccept={null}
          onDecline={() => {
            this.setState({exportVisible: false});            
          }}
        />
        
        {/* saving loader modal */}
        <Modal
          visible={this.props.savingLoader}
          title="Processing your request..."
          animationType="none"
          content={
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
              <ActivityIndicator animating = {true} color = '#bc2b78' size = "large" />
            </View>
          }
          onAccept={null}
          onDecline={null}
        />

        {/* newbill modal */}
        <Modal
          visible={this.state.newBillVisible}
          title="Have you saved the bill?"
          content={
            <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
              <Text>This wil remove all the unsaved and create a new bill for you.</Text>
            </View>
          }
          onAccept={()=>{
            this.setState({newBillVisible: false});
            this.props.newBill();
          }}
          onDecline={()=>{
            this.setState({newBillVisible: false});
          }}
        />

        {/* {this.props.savingLoader
          ? (<View style={{flex:1, position: 'absolute', backgroundColor:'rgba(0,0,0,0.5)'}}>
              <ActivityIndicator animating = {true} color = '#bc2b78' size = "large" />
              
            </View>)
          : null} */}

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
  },
  rowBack: {
		alignItems: 'center',
		backgroundColor: '#eee',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
  },
  backLeftBtn: {
    alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
    width: 45,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 45
  },
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 45
  },
  backTextWhite: {
		color: '#FFF'
  },
  backTextBlue: {
		color: 'blue'
  },
  backTextRed: {
		color: 'red'
  },
  backRightBtnRight: {
		backgroundColor: 'rgba(0,0,0,0)',
		right: 0
	},
}

function mapStateToProps({ bill }) {
  const { currentItem, items, discount, total, error, success, title, discountPer, editing, loading, savingLoader, billId } = bill;
  return { currentItem, items, discount, total, error, success, title, discountPer, editing, loading, savingLoader, billId }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    currentItemUpdate, 
    addToList,
    saveBill,
    loadSaved,
    clearBill,
    topUpdates,
    saveOthers,
    deleteListRow,
    editListRow,
    saveEditItem,
    newBill
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
