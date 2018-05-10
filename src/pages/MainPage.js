/**
 * Created by liuxichao on 2018/4/17.
 */
'use strict';
import React, {Component} from 'react';
import {StackNavigator, TabNavigator} from "react-navigation";
import Home from "../components/Home";
import Me from "../components/Me";
import Contact from "../components/Contacts";
import Scan from "../components/Scan";
import ApprDetail from "../components/ApprDetail/ApprDetail"
import ApprAdvice from "../components/ApprDetail/ApprAdvice"
import Undo from "../components/Undo";
import Done from "../components/Done"
import Notice from "../components/msg/Notice"
import Announce from "../components/msg/Announce"
import ImageShow from '../components/imageShow'
import MsgDetail from '../components/ApprDetail/MsgDetail'
import Icon from 'react-native-vector-icons/Ionicons';
import LoginPage from './LoginPage'
export default class MainPage extends Component {
    constructor(props){
        super(props);
        this.state={
            message:''
        }
    }
    render() {
        return (
            <MainNavigator/>
        )
    }
    componentDidMount(){}
}
// 审批导航栏
const Com=TabNavigator({
    Undo: {
        screen: Undo,
        navigationOptions: {  // 也可以写在组件的static navigationOptions内
            tabBarLabel:(aa)=>{
                return '待审批'
            },
            title:'审批',
        }
    },
    Notice: {
        screen: Done,
        navigationOptions: {
            tabBarLabel:'已审批',
            title:'审批',
        }
    }
}, {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'top', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否可以左右滑动切换tab
    tabBarOptions: {
        activeTintColor: '#1E90FF', // 文字和图片选中颜色
        inactiveTintColor: '#666', // 文字和图片未选中颜色
        showIcon: false, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#f9f9f9', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 16, // 文字大小
            margin:0,
            marginBottom:5,
            marginTop:5
        },
    },
});
// 消息导航栏
const MsgTab=TabNavigator({
    Undo: {
        screen: Announce,
        navigationOptions: {  // 也可以写在组件的static navigationOptions内
            tabBarLabel:(aa)=>{
                return '公司公告'
            },
            title:'公告',
        }
    },
    Notice: {
        screen: Notice,
        navigationOptions: {
            tabBarLabel:'审批消息',
            title:'审批消息',
        }
    }
}, {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'top', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否可以左右滑动切换tab
    tabBarOptions: {
        activeTintColor: '#1E90FF', // 文字和图片选中颜色
        inactiveTintColor: '#666', // 文字和图片未选中颜色
        showIcon: false, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#f9f9f9', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 16, // 文字大小
            margin:0,
            marginBottom:5,
            marginTop:5
        },
    },
});
// 首页导航栏
const TabNavigate = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {  // 也可以写在组件的static navigationOptions内
            tabBarLabel:'首页',
            title:'云数工场',
            tabBarIcon:({focused,tintColor}) => (
                <Icon name='md-home' size={30} color={focused?'#1E90FF':'#666'} />
            )
        }
    },
    Message: {
        screen: ()=>{
            return <MsgTab/>
        },
        navigationOptions: {
            tabBarLabel:'消息',
            title:'消息',
            tabBarIcon:({focused,tintColor}) => (
                <Icon name='md-mail' size={30} color={focused?'#1E90FF':'#666'} />
            )
        }
    },
    Scan: {
        screen: Scan,
        navigationOptions: {
            tabBarLabel:'扫一扫',
            title:'扫一扫',
            tabBarIcon:({focused,tintColor}) => (
                <Icon name='md-qr-scanner' size={30} color={focused?'#1E90FF':'#666'} />
            )
        },
    },
    Contacts: {
        screen: Com,
        navigationOptions: {
            tabBarLabel:'审批',
            title:'审批',
            tabBarIcon:({focused,tintColor}) => (
                <Icon name='md-contacts' size={30} color={focused?'#1E90FF':'#666'} />
            )
        },
    },
    Me: {
        screen: Me,
        navigationOptions: {
            tabBarLabel:'我的',
            title:'我的',
            tabBarIcon:({focused,tintColor}) => (
                <Icon name='md-person' size={30} color={focused?'#1E90FF':'#666'} />
            )
        },
    }
}, {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否可以左右滑动切换tab
    tabBarOptions: {
        activeTintColor: '#1E90FF', // 文字和图片选中颜色
        inactiveTintColor: '#666', // 文字和图片未选中颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#f9f9f9', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 14, // 文字大小
            margin:0,
            // marginTop:5
        },
    },
});
// 导航
 const HomeNavigator = StackNavigator(
    {
        Tabs:{screen:TabNavigate},
        Com:{screen:Com},
        SDetail:{
            screen:ApprDetail,
            navigationOptions: {
                title:'我的审批',
            }
        },
        Advice:{
            screen:ApprAdvice,
            navigationOptions: {
                title:'审批意见',
            }
        },
        ImgShow:{
            screen:ImageShow
        },
        MsgDetail:{
            screen:MsgDetail,
            navigationOptions: {
                title:'辅表审批',
            }
        }
    },
    {
        navigationOptions:{
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:'#1E90FF',
            },
            showIcon:true
        },
    });

const MainNavigator=StackNavigator(
    {
    LoginPage:{
        screen:LoginPage,
    },
    HomeNavigator:{screen:HomeNavigator}
},
{
    navigationOptions:{
        header:null
    }
}
);
