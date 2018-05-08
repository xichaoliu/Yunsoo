/**
 * Created by liuxichao on 2018/4/26.
 */
'use strict';
import React, {Component} from 'react';
import {ScrollView, View,FlatList,Text,StyleSheet,TouchableHighlight} from 'react-native'
import CheckButton from './checkButton'
import RenderTit from './renderTit'
import AttachList from './AttachList'
import DeviceStorage from '../../config/LocalStorage'
let DETAIL={
    details:[]
};//辅表
export default class MsgDetail extends Component{
    constructor(props){
        super(props);
        this.props=props;
        const {params}=this.props.navigation.state;//路由参数
        let index=params.id;
        console.log(params);
        this.state={
            itemList:params.data[index].relateList,
            index:params.id,
            data:params.data
        };
        // 拼接辅表数据
        params.data.map((item,index)=>{
            let relateItem={
                relateTableName:item.relateName,
                relateList:[]
            };
            item.relateList.map((rItem,rIndex)=>{
                let listItem={
                    fieldList:[]
                };
                rItem.fieldList.map((fItem,fIndex)=>{
                    let item={
                        name:fItem.name,
                        value:fItem.value
                    };
                    listItem.fieldList.push(item);
                });
                relateItem.relateList.push(listItem)
            });
            DETAIL.details.push(relateItem);
        });
        // console.log('postData',DETAIL);
        DeviceStorage.update('attTable',DETAIL)

    }
    render(){
        const { navigate } = this.props.navigation;
        return (
            <View style={{width:'100%',height:'100%',backgroundColor:'#f0f0f0',position:'relative'}}>
                <RenderTit/>
                <HorizeList data={this.state.data} id={this.state.index} onSelect={this.setListData.bind(this)}/>
                <ScrollView style={{width:'100%',flex:1}}>
                    {
                       this.state.itemList.map((item,index)=>{
                            return <AttachList
                                    onChangeItem={this.changePostData}
                                    title={`${item.sortNO}     ${item.display}:${item.value}`}
                                    itemList={item.fieldList}
                                    key={index}
                                    itemKey={index}
                            />
                        })
                    }
                </ScrollView>
                <CheckButton navigate={navigate}/>
            </View>
        )
    }
    setListData=(data,index)=>{
        // console.log('选中数据',data);
        this.setState({
            itemList:data,
            index:index
        })
    };
    changePostData=(name,value,index)=>{
        // const item = {
        //     name:name,
        //     value:value
        // }
        const item=DETAIL.details[this.state.index].relateList[index].fieldList;
        item.forEach((arrValue,index,array)=>{
            if(arrValue.name=== name){
                if(arrValue.value!==value){
                    array[index].value=value;
                }
            }
        });
        DeviceStorage.update('attTable',DETAIL)

    }
}
class HorizeList extends Component{
    constructor(props){
        super(props);
        this.props=props;
        this.state={
            id:this.props.id
        }
    }
    render(){
        return <View style={{width:'100%',height:50}}>
            <FlatList
                data={this.props.data}
                keyExtractor={(item, index) => index+''}
                getItemLayout={(data, index) => ( {length: 100, offset: 100 * index, index} )}
                initialScrollIndex={this.props.id}
                renderItem={this.renderTopicItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{width:'100%',height:50}}
            />
        </View>
    }
    renderTopicItem=({index,item})=>{
        return <TouchableHighlight
            underlayColor="rgba(0,0,0,0)"
            onPress={() =>{
                this.setState({
                    id:index
                });
                this.props.onSelect(item.relateList,index)
            }
                }>
                    <View style={[styles.relateName,{borderColor:index===this.state.id?'#f26':'black'}]}>
                        <Text style={{fontSize:15,color:index===this.state.id?'#f26':'#000'}}>{item.relateName}</Text>
                    </View>
            </TouchableHighlight>
    }
}
const styles=StyleSheet.create({
   relateName:{
       width:100,
       height:30,
       borderWidth:2,
       margin:5,
       backgroundColor:'white',
       justifyContent:'center',
       alignItems:'center'
   }
});