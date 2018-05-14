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
            title:'代办',
            undoList:[]
        };
    }
    componentWillMount(){
        this.getData();
    }
    render(){
        // console.log('Me的页面');
        const { navigate } = this.props.navigation;
        return (
           <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
               {
                   this.state.undoList.map((value,index)=>{
                       return  <UndoItem navigate={navigate} item={value} key={index}/>

                   })
               }
           </ScrollView>
        )
    }
    //获取审批数据
    getData(){
        fetch('http://192.168.31.155:8080/bdc/api?apiname=bdc.wf.GetWaitTasks&userid=erisa.qu&pageNum=1&pageCount=20', {
            method: 'GET'
        })
            .then((res)=>{
                // console.log(res);
                return res.json();
            })
            .then((res)=>{
                console.log('待审批列表',res.Data);
                if(res.Data.data){
                    this.setState({
                        undoList:res.Data.data
                    });
                }
            })
    }
}
class UndoItem extends Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.item,
            workflow:this.props.item.WorkFlow_FlowInstance
        }
    }
    render(){
        return  <TouchableHighlight
            underlayColor="white"
            onPress={() =>
             this.props.navigate('SDetail', { TkeyValue: this.state.workflow.TkeyValue,FormListTmpl:this.state.workflow.FormListTmpl })}
        >
            <View style={styles.content_item}>
                <Text style={{color:'black',width:'100%',fontSize:14}}>请求标题：<Text>{this.state.value.TkeyValue}</Text></Text>
                <Text style={styles.item_text}>发起人：<Text style={{color:'black'}}>{this.state.value.RealName}</Text></Text>
                <Text style={styles.item_text}>接受日期：<Text style={{color:'black'}}>{this.state.value.Modified}</Text></Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:30}}>
                    <Text style={{fontSize:12,color:'#666'}}>{this.state.value.Modified}</Text>
                    <View style={{width:'40%',flexDirection:'row',justifyContent:'flex-end'}}>
                        {/*<TouchableOpacity*/}
                        {/*activeOpacity={.8}*/}
                        {/*style={styles.button_refuse}>*/}
                        {/*<Text style={styles.refuse_text}>拒绝</Text>*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity
                            style={styles.button_agree}
                            activeOpacity={.8}
                            onPress={() =>
                                navigate('SDetail', { name: 'Jane' })}
                        >
                            <Text style={styles.refuse_agree}>审核</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
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