/**
 * Created by liuxichao on 2018/4/23.
 */
'use strict';
import React, {Component} from 'react';
import {Linking, StyleSheet, Text} from 'react-native'

export default class Announce extends Component {
    constructor(props){
        super(props);
        this.state={
            text:'报表'
        }
    }
    static navigationOptions = {
        title: '报表'
    };
    componentWillMount(){
        // const { navigate } = this.props.navigation;
        // navigate('childTab')
    }
    render(){
        // console.log('Tom的页面');
        return (
            <Text>公司公告</Text>
        )
    }
}
function callMe(){
    return Linking.openURL('tel:10086')

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