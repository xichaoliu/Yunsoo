/**
 * Created by liuxichao on 2018/4/17.
 */
'use strict';
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native'

export default class Undo extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'代办'
        }
    }
    render(){
        // console.log('Me的页面');
        const { navigate } = this.props.navigation;
        return (
           <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
               <TouchableHighlight
                   underlayColor="white"
                   onPress={() =>
                       navigate('SDetail', { name: 'Jane' })}
               >
               <View style={styles.content_item}>
                    <Text style={{color:'black',width:'100%',fontSize:14}}>审批：<Text>物品领用</Text></Text>
                   <Text style={styles.item_text}>物品用途：<Text style={{color:'black'}}>办公用品</Text></Text>
                   <Text style={styles.item_text}>物品名称：<Text style={{color:'black'}}>记事本</Text></Text>
                   <Text style={styles.item_text}>数量：<Text style={{color:'black'}}>1</Text></Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:30}}>
                    <Text style={{fontSize:12,color:'#666'}}>今天 14:14</Text>
                    <View style={{width:'40%',flexDirection:'row',justifyContent:'flex-end'}}>
                        {/*<TouchableOpacity*/}
                            {/*activeOpacity={.8}*/}
                            {/*style={styles.button_refuse}>*/}
                            {/*<Text style={styles.refuse_text}>拒绝</Text>*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity
                            style={styles.button_agree}
                            activeOpacity={.8}
                        >
                            <Text style={styles.refuse_agree}>审核</Text>
                        </TouchableOpacity>
                    </View>
                </View>
               </View>
               </TouchableHighlight>
               <View style={styles.content_item}>

               </View>
               <View style={styles.content_item}>

               </View>
               <View style={styles.content_item}>

               </View>
               <View style={styles.content_item}>

               </View>
               <View style={styles.content_item}>

               </View>
           </ScrollView>
        )
    }
}
const styles=StyleSheet.create({
   container:{
       width:'100%',
       height:'100%',
       backgroundColor:'#ddd',
       flexDirection:'column',
       // alignItems:'center'
   },
   content_item:{
       width: 340,
       height:200,
       backgroundColor:'white',
       marginTop:10,
       marginBottom:10,
       padding:15
   },
    item_text:{
        color:'#666',
        width:'100%',
        fontSize:14,
        marginTop:10
    },
    button_refuse:{
       width:50,
        height:30,
        borderWidth:1,
        borderColor:'#1E90FF',
        backgroundColor:'white',
        borderRadius:5,
        justifyContent:'center'
    },
    refuse_text:{
        color:'#1E90FF',
        textAlign:'center',
        fontSize:16
    },
    button_agree:{
        width:50,
        height:30,
        backgroundColor:'#1E90FF',
        borderRadius:5,
        justifyContent:'center'
    },
    refuse_agree:{
        color:'white',
        textAlign:'center',
        fontSize:16
    },
});