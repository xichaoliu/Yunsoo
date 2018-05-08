/**
 * Created by liuxichao on 2018/4/17.
 */
'use strict';
import React, {Component} from 'react';
import {StyleSheet, Text,TouchableHighlight,View} from 'react-native'
import { NavigationActions } from 'react-navigation';
export default class Me extends Component {
    constructor(props){
        super(props);
        this.state={
            title:'我的'
        }
    }
    render(){
        // console.log('Me的页面');
        const { navigation } = this.props;
        console.log(this.props.navigation);
        return <View>
            <TouchableHighlight
                style={styles.button}
                underlayColor="#1E90FF"
                onPress={()=>{
                    navigation.navigate('LoginPage')
                }}
            >
                <View style={styles.button}>
                    <Text style={{color:'white',fontSize:18}} >退出登录</Text>
                </View>
            </TouchableHighlight>
            </View>
    }
}
const styles=StyleSheet.create({
    text:{
        width:100,
        height:100,
        backgroundColor:'red',
        color:'white'
    },
    button:{
        width:'100%',
        height:40,
        backgroundColor:'#1E90FF',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    }
});