
/**
 * Created by liuxichao 2018/4/20.
 */
'use strict';

import React, {Component} from 'react';
import {AppRegistry, YellowBox,PermissionsAndroid} from 'react-native';
import MainPage from './src/pages/MainPage'
import SplashScreen from 'react-native-splash-screen'
import JPushModule from 'jpush-react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import Contacts from 'react-native-contacts'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader','VirtualizeList']);
export default class YunShu extends Component {
    constructor(props){
        super(props);
        this.state={
            contacts:[]
        };
        this._requestPermission();
    }
    componentWillMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
        JPushModule.initPush();
        JPushModule.getRegistrationID((res)=>{
            console.log('极光注册id'+res);
        });
        JPushModule.notifyJSDidLoad((num)=>{
            // console.log(num);
        });
        // 接受到消息事件监听
        JPushModule.addReceiveNotificationListener((event)=>{
            console.log(event);
        });
        JPushModule.setAlias('alias', success => {
            console.log(success);
        });
    }
    _requestPermission = async () => {
        const _this=this;
        let result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );
        // console.log(result);
        // this.setState({
        //     hasPermission: (result ? '授权成功' : '授权失败') + ' for ' +
        //     this.state.permission,
        // });
        if(result==='granted'){
            Contacts.getAll((err,contacts)=>{
                if (err) throw err;

                // contacts returned
                console.log(contacts);
                // _this.setState({
                //     contacts:contacts
                // })
            })
        }

    };
    render() {
        return (
            <Navigator
                initialRoute={{component: MainPage}}
                renderScene={(route, navigator) => {
                    return <MainPage navigator={navigator} {...route.args}/>
                }
                }
                onDidFocus={(route)=>{
                    console.log(route)
                }}
            />
        );
    }
    componentDidMount(){
        const currentDate = new Date();
        // 发送本地通知
        JPushModule.sendLocalNotification({
            buildId:1,
            id:1234834,
            content: '推送消息',
            extra: { key1: 'value1', key2: 'value2' },
            fireTime: currentDate.getTime() + 3000,
            title: '云数'
        });
        JPushModule.sendLocalNotification({
            buildId:1,
            id:1234893,
            content: '推送消息2',
            extra: { key1: 'value1', key2: 'value2' },
            fireTime: currentDate.getTime() + 500000,
            title: '云数'
        });
        // 获取信息
        JPushModule.getInfo((map) => {
            // console.log(map);
        });
    }
    componentWillUnmount(){
        JPushModule.removeReceiveNotificationListener(()=>{
            console.log('取消接受推送');
        });
    }
}
AppRegistry.registerComponent('Yunnsoo', () => YunShu);
