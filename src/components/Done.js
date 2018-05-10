/**
 * Created by liuxichao on 2018/4/17.
 */
'use strict';
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native'

export default class Done extends Component{
    constructor(props){
        super(props);
        this.state={
            doneList:[]
        }
    }
    componentWillMount(){
        this.getDoneList();
    }
    render(){
        return (
            <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
                {
                    this.state.doneList.map((value,index)=>{
                        return  <DoneItem item={value} key={index}/>

                    })
                }
            </ScrollView>
        )
    }
    //获取已审批列表
    getDoneList(){
        fetch('http://192.168.31.155:8080/bdc/api?apiname=bdc.wf.GetHandedTasks&userid=erisa.qu&pageNum=1&pageCount=20', {
            method: 'GET'
        })
            .then((res)=>{
                // console.log(res);
                return res.json();
            })
            .then((res)=>{
                console.log('已审批',res)
                if(res.Data.data){
                    this.setState({
                        doneList:res.Data.data
                    });
                }
            })
    }
}
class DoneItem extends Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.item
        }
    }
    render(){
        return <View style={styles.content_item}>
                <Text style={{color:'black',width:'100%',fontSize:14}}>请求标题：<Text>{this.state.value.Title}</Text></Text>
                <Text style={styles.item_text}>发起人：<Text style={{color:'black'}}>{this.state.value.CreatedBy}</Text></Text>
                <Text style={styles.item_text}>接受日期：<Text style={{color:'black'}}>{this.state.value.Modified}</Text></Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:30}}>
                    <Text style={{fontSize:12,color:'#666'}}>{this.state.value.Modified}</Text>
                    <View style={{width:'40%',flexDirection:'row',justifyContent:'flex-end'}}>
                        {/*<TouchableOpacity*/}
                        {/*activeOpacity={.8}*/}
                        {/*style={styles.button_refuse}>*/}
                        {/*<Text style={styles.refuse_text}>拒绝</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </View>
            </View>
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