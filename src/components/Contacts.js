/**
 * Created by liuxichao on 2018/4/17.
 */
'use strict';
import React, {Component} from 'react';
import {
    FlatList,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    PermissionsAndroid
} from 'react-native'
export default class Contact extends Component {
    constructor(props){
        // console.log('1111');
        super(props);
        this.state={
            contacts:[],
            permisson:PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        }
    }
    componentWillMount(){}

    render(){
        return (
            <ScrollView>
                <FlatList
                    data={this.state.contacts}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index+''}
                />
            </ScrollView>
        )
    }
    _renderItem = ({item}) => (
        <MyListItem
            id={item.phoneNumbers[0].number}
            name={item.familyName}
        />
    )
}
const styles=StyleSheet.create({
    text:{
        width:100,
        height:50,
        backgroundColor:'red'
    },
    font:{
        fontSize:25,
        color:'black',
        lineHeight:50
    }
});
class MyListItem extends Component{
    _onPress = () => {
        Linking.openURL(`tel:${this.props.id}`);
    };
    constructor(props){
        super(props);
        this.state={
            showNumber:this.props.id.slice(0,4).concat('********')
        }
    }
    render() {
        let date=new Date().getTime();
        return (
            <TouchableHighlight
                underlayColor="#f6f6f6"
                onPress={this. _onPress}
                key={date}
            >
            <View  key={this.props.id} style={{flexDirection:'row',justifyContent:'flex-start',margin:10,paddingLeft:10}}>
                <Text style={{width:'25%'}}>{this.props.name+'*'}</Text>
                    <Text>{this.state.showNumber}</Text>
            </View>
            </TouchableHighlight>
        )
    }
}
