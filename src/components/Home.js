/**
 * Created by liuxichao on 2018/4/17.
 */
'use strict';
import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import JPushModule from "jpush-react-native/index";
import Navigator from '../pages/MainPage'
export default class Home extends Component {
    constructor(props){
        super(props);
        this.props=props;
        this.state={
            title:'Hello 云数app'
        }
    }
    render(){
        const  navigate  = this.props.navigation.navigate;
        // console.log(this.props.navigation);
        return (
            <View style={styles.container}>
                <View style={[styles.banner,{marginTop:0}]}><Text>banner(系统公告)</Text></View>
                 <View style={styles.item}>
                    <Text style={styles.itemTitle}>我的常用</Text>

                    <View style={styles.itemContainer} >
                        <TouchableHighlight
                        onPress={()=>{
                            navigate('Com');
                        }}
                        >
                            <View style={styles.itemList}>
                                <Image
                                    style={styles.icon}
                                    source={require('../assets/ic_launcher.png')}
                                />
                                <Text style={styles.itemFont}>审批</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={styles.itemList}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/ic_launcher.png')}
                            />
                            <Text style={styles.itemFont}>报表</Text>
                        </View>
                        <View style={styles.itemList}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/ic_launcher.png')}
                            />
                            <Text style={styles.itemFont}>任务</Text>
                        </View>
                        <View style={styles.itemList}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/ic_launcher.png')}
                            />
                            <Text style={styles.itemFont}>跟单任务</Text>
                        </View>
                    </View>
                </View>
                <View  style={styles.item}>
                    <Text style={styles.itemTitle}>智能ERP</Text>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemList}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/ic_launcher.png')}
                            />
                            <Text style={styles.itemFont}>面料开发</Text>
                        </View>
                        <View style={styles.itemList}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/ic_launcher.png')}
                            />
                            <Text style={styles.itemFont}>款式设计</Text>
                        </View>
                        <View style={styles.itemList}>
                            <Image
                                style={styles.icon}
                                source={require('../assets/ic_launcher.png')}
                            />
                            <Text style={styles.itemFont}>订单</Text>
                        </View>
                        <View style={{width:50, height:50, backgroundColor:'white'}}>
                            <Text style={styles.itemFont}>。。。</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    componentDidMount(){
        const _this=this;
        // 极光推送监听通知点击事件
        JPushModule.addReceiveOpenNotificationListener((map)=>{
            // console.log('消息点击事件',map);
            _this.props.navigation.navigate('Message');//点击状态栏消息，跳转到消息页面，此事件需要在navigation注册后调用
        });
    }
}
let styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'100%',
        height:'100%',
    },
    banner:{
        width:'100%',
        height:100,
        backgroundColor:'white',
        marginBottom:10,
        borderBottomWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    item:{
        borderBottomColor:'#666',
        borderBottomWidth:1,
        paddingBottom:10,
        marginBottom:10,
        paddingLeft:10,
        paddingRight:10
    },
    itemTitle:{
        fontSize:16,
        color:'black'
    },
    itemContainer:{
        flexDirection:'row',
        backgroundColor:"white",
        marginTop:10,
        width:'100%',
        justifyContent:'space-around'
    },
    itemList:{
        width:80,
        height:70,
        backgroundColor:'white',
        justifyContent:'space-between' ,
        alignItems:'center'
    },
    icon:{
        width:50,
        height:50
    },
    itemFont:{
      color:'black'
    }
});
