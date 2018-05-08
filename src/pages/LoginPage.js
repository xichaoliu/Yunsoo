/**
 * Created by liuxichao on 2018/4/28.
 */
'use strict';
import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    CheckBox ,//只在Android端实现，IOS端暂未实现
    BackHandler
} from "react-native";
import {NavigationActions} from 'react-navigation'
export default class LoginPage extends Component{
    constructor(props){
        super(props);
        this.props=props;
        this.state={
            logIn:false
        };
        this.logIn=this.logIn.bind(this);
    }
    componentWillMount(){
        if(this.state.logIn){
            this.logIn();
        }
        // android 监听后退事件
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
            return true;
        });
    }
    render(){
        return <View style={styles.container}>
            <View style={styles.banner}>
                <Image
                    style={styles.banner_img}
                    source={require('../assets/ic_launcher.png')}
                />
            </View>
            <View style={styles.log_face}>
                <View style={styles.input_container}>
                    <View style={styles.input_item}>
                        <TextInput
                            style={styles.inputText}
                            underlineColorAndroid="transparent"
                            placeholder="用户名"
                        />
                    </View>
                    <View style={styles.input_item}>
                        <TextInput
                            style={styles.inputText}
                            underlineColorAndroid="transparent"
                            placeholder="请输入密码"
                        />
                    </View>
                    <View style={{width:'100%',marginBottom:15,flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            {/*<CheckBox/>*/}
                            <Text>
                                记住密码
                            </Text>
                        </View>

                        <TouchableHighlight
                            underlayColor="white"
                            onPress={() =>{}}
                        >
                            <Text>忘记密码</Text>
                        </TouchableHighlight>
                    </View>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="#1E90FF"
                    onPress={this.logIn.bind(this)}
                >
                    <View style={styles.button}>
                        <Text style={{color:'white',fontSize:18}} >登&nbsp;&nbsp;录</Text>
                    </View>
                </TouchableHighlight>
                </View>
            </View>
        </View>
    }
    logIn(){
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'HomeNavigator' })
            ]
        });
    //     // 通过fetch获取百度的错误提示页面
    //     fetch('https://www.baidu.com/search/error.html', {
    //         method: 'POST',
    //         body:'1111'
    //     })
    //         .then((res)=>{
    //             return res.text()
    //         })
    //         .then((res)=>{
    //             console.log(res)
    //         })
    //     console.log(this.props);
        // const { navigate } = this.props.navigation;
        //     navigate('HomeNavigator',{reset:true});
        this.props.navigation.dispatch(resetAction);
    }
}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%'
    },
    banner:{
      width:'100%',
      height:200,
        backgroundColor:'#1E90FF',
        justifyContent:'center',
        alignItems:'center'
    },
    banner_img:{
        width:100,
        height:100
    },
    log_face:{
        flex:1,
        backgroundColor:'white',
        paddingTop:40,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    input_container:{
        width:260,
    },
    input_item:{
        width:'100%',
        height:40,
        borderColor:'#aaa',
        borderRadius:40,
        borderWidth:1,
        marginBottom:10,
        paddingLeft:20,
        justifyContent:'center'
    },
    inputText:{
        width:'60%',
        padding:0,
    },
    button:{
        width:'100%',
        height:40,
        backgroundColor:'#1E90FF',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    }
});