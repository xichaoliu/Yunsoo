/**
 * Created by liuxichao on 2018/4/23.
 */
'use strict';
import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native'
import ApprList from './ApprList'
import CheckButton from './checkButton'
import FormJson from '../../assets/FormJson'
import WorkFlowJson from '../../assets/WorkFlowJson'
import RenderTit from './renderTit'
import DeviceStorage from '../../config/LocalStorage'
let CONTENTS={
    contents:[]
};// 主表
export default class ApprDetail extends Component {
    constructor(props){
        super(props);
        this.props=props;
        this.state={
            MasterTable:'',
            AttachedTable:''
        }
    }
    componentWillMount(){
        this.setState({
            MasterTable:FormJson[0].contents,
            AttachedTable:FormJson[0].details,
            WorkFlow:WorkFlowJson[0].workFlow.relateTitleList
        });
        FormJson[0].contents.map((item,index)=>{
            item.groupContent.map((gItem,index)=>{
                const cItem={
                    name:gItem.name,
                    value:gItem.value
                };
                CONTENTS.contents.push(cItem)
            })
        });
        DeviceStorage.save('primTable',CONTENTS)

    }
    render(){
        const _this=this;
        let  {navigate} = this.props.navigation;
        return (
                <View style={{width:'100%',height:'100%',backgroundColor:'#f0f0f0',position:'relative'}}>
                    <ScrollView style={{width:'100%',flex:1}}>
                        <RenderTit />
                        <View style={{
                            width:'100%',
                            backgroundColor:'white',
                            paddingLeft:20,
                            paddingTop:5,
                            paddingBottom:5,
                            marginBottom:5
                        }}>
                            <Text style={{fontSize:14,color:'blue'}}>{FormJson[0].approveType}</Text>
                            <Text style={{fontSize:12,color:'black',marginTop:5}}>
                                时间：{FormJson[0].approveDate}
                            </Text>
                        </View>
                        {
                            this.state.MasterTable.map((item,index)=>{
                                return  <ApprList
                                        title={item.groupName}
                                        key={index}
                                        itemList={item.groupContent}
                                        id={1}
                                        onChangeData={_this.changePostData}
                                />
                            })
                        }
                        <ApprList
                            title={'***数据链信息***'}
                            key={1314912}
                            id={0}
                            navigate={navigate}
                            details={this.state.AttachedTable}
                        />
                        <View style={{
                            width:'100%',
                            backgroundColor:'white',
                            marginBottom:5,
                            padding:20,
                        }}>
                            <TouchableHighlight
                                style={{width:100,height:100,borderRadius:50,marginRight:5}}
                                onPress={() =>
                                    navigate('ImgShow', { img: [{url:'http://pic35.photophoto.cn/20150529/0038038075710325_b.jpg'}] })}
                            >
                                <Image
                                    style={{width:100,height:150,marginRight:5}}
                                    source={{uri:'http://pic35.photophoto.cn/20150529/0038038075710325_b.jpg'}}
                                />
                            </TouchableHighlight>
                        </View>
                        {
                            this.state.WorkFlow.map((item,index)=>{
                                return  <WorkFlow
                                    checkData={item}
                                    key={index}
                                />
                            })
                        }
                    </ScrollView>
                    <CheckButton navigate={navigate}/>
                </View>
        )
    }
    componentDidMount(){}
    changePostData=(name,value)=>{
        // console.log(name+':'+ value);
        CONTENTS.contents.forEach((cValue,index,array)=>{
            if(cValue.name===name){
                if(cValue.value!==value){
                    array[index].value=value
                }
            }
        });
        DeviceStorage.update('primTable',CONTENTS)
    }
}
//工作流
class WorkFlow extends Component{
    constructor(props){
        super(props);
        this.props=props;
    }
    render(){
        return <View style={{width:'100%',paddingLeft:10,paddingTop:20,position:'relative'}}>
            <View style={{marginLeft:80}}>
                <Text>{this.props.checkData.ApprovePeople}</Text>
            </View>
            <View style={{width:'100%',flexDirection:'row'}}>
                <Image
                    style={styles.portrait}
                    source={{uri:'https://img.bosszhipin.com/beijin/mcs/useravatar/20180403/d16361e463b60c4e35296d3e0b6796f1b3daa038c295c4b4a5f974204be92a26_s.jpg'}}
                />
                <View style={styles.apprflow}>
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
                        <Text style={{color:'black',fontSize:16}}>{this.props.checkData.ApprovePeople}</Text>
                        <Text>{this.props.checkData.ApproveDate}</Text>
                    </View>
                    {this.props.checkData.fieldList.map((item,index)=>{
                        switch(item.name){
                            case 'StateContent':
                            case 'State':
                                return    <Text
                                    numberOfLines={1}
                                    key={index}
                                >
                                    {item.display}:{item.value}
                                </Text>;
                            default:break;
                        }
                    })}
                </View>
            </View>
        </View>
    }
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
    },
    portrait:{
        width:50,
        height:50,
        borderRadius:50
    },
    apprflow:{
        width:260,
        borderRadius:10,
        backgroundColor:'white',
        marginBottom:10,
        marginLeft:20,
        padding:10
    }
});