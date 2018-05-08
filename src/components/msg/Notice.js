/**
 * Created by liuxichao on 2018/4/17.
 */
'use strict';
import React, {Component} from 'react';
import {Text} from 'react-native'

export default class Notice extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'通知'
        }
    }
    componentWillMount(){
    }
    render(){
        // console.log('Me的页面');
        return (
            <Text url={'tel:1999888'}>
                {this.state.title}
            </Text>
        )
    }
}