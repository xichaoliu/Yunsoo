/**
 * Created by liuxichao on 2018/4/26.
 */
'use strict';
import React, {Component} from 'react';
import {Image, Text, View} from 'react-native'
export default class RenderTit extends Component{
  render(){
      return <View style={{
          width:'100%',
          flexDirection:'row',
          backgroundColor:'white',
          marginBottom:5,
          paddingTop:5,
          paddingBottom:5,
          paddingLeft:20
      }}>
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <Image
                  style={{width:50,height:50,borderRadius:50,marginRight:5}}
                  source={require('../../assets/ic_launcher.png')}
              />
              <View>
                  <Text style={{
                      marginTop:5
                  }}>
                      <Text style={{
                          color:'black',
                          fontSize:14
                      }}>
                          张老师
                      </Text>
                  </Text>
                  <Text style={{fontSize:12,marginTop:5}}>采购部  部门经理</Text>
              </View>
          </View>
          {/*<View><Text>审批中</Text></View>*/}
      </View>
  }
}