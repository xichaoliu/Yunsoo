/**
 * Created by liuxichao on 2018/4/26.
 */
'use strict';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native'

export default class CheckButton extends Component{
    constructor(props){
        super(props);
        this.props=props;
    }
    render(){
        return    <View style={{
            width:'100%',
            height:50,
            backgroundColor:'white',
            flexDirection:'row',
            justifyContent:'space-around',
            alignItems:'center',
            borderTopColor:'#f9f9f9',
            borderTopWidth:2
        }}>
            <TouchableHighlight
                underlayColor="#f6f6f6"
                onPress={() =>
                    this.props.navigate('Advice', { name: 1 })}
            >
                <View style={styles.button}>
                    <Text style={{color:'green',fontSize:18}} >批&nbsp;&nbsp;准</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                underlayColor="#f6f6f6"
                onPress={() =>
                    this.props.navigate('Advice', { name: 0 })}
            >
                <View  style={styles.button}>
                    <Text style={{color:'red',fontSize:18}}>拒&nbsp;&nbsp;绝</Text>
                </View>
            </TouchableHighlight>
        </View>
    }
}
const styles=StyleSheet.create({
    button:{
        width:150,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    }
});