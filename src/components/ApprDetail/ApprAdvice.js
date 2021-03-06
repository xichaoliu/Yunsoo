/**
 * Created by liuxichao on 2018/4/24.
 */
'use strict';
import React, {Component} from 'react';
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    Modal, Alert
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import DeviceStorage from '../../config/LocalStorage'
import initDate from '../../config/setDate'
let FORM_POST_JSON={
    "tableName": "ERP_Customer", /*提交的主表名*/
    "submitDate":initDate(), /*提交时间*/
};
export default class ApprAdvice extends Component {
    constructor(props){
        super(props);
        this.state={
            avatarSource:[0],
            advice:'',
            approval:10,
            modalVisible:false
        };
        console.log(initDate());
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    render(){
        return (
            <View style={{width:'100%',height:'100%'}}>
                {this.reason()}
                <View style={styles.imgPick}>
                    <Text style={{color:'black',marginBottom:8,marginLeft:10}}>图片</Text>
                    <View style={{flexDirection:'row'}}>
                        {
                            this.state.avatarSource.map((item,index)=>{
                                const date=new Date().getTime();
                                return  <TouchableHighlight
                                    underlayColor="white"
                                    onPress={this._imgPicker.bind(this)}
                                    style={[styles.icon,{marginLeft:10}]}
                                    key={date}
                                >
                                    <Image
                                        style={styles.icon}
                                        source={item?item:require('../../assets/addPic.png')}
                                    />
                                </TouchableHighlight>
                            })
                        }
                    </View>
                </View>
              <View style={styles.button}>
                  <Button
                      onPress={this.confirm.bind(this)}
                      title="确认"
                      color="#1E90FF"
                      style={{margin:10,height:30,borderRadius:5,fontSize:16}}
                  />
              </View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this.setModalVisible(false)}}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={[styles.modalText,{color:'black'}]}>提交成功</Text>
                            <TouchableHighlight onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text  style={styles.modalText}>确定</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    confirm(){
        // console.log('确认');
        // const _this=this;
        // DeviceStorage.get('primTable').then((value)=>{
        //     console.log(value);
        //     Object.assign(FORM_POST_JSON,value);
        //     DeviceStorage.get('attTable').then((value)=>{
        //         Object.assign(FORM_POST_JSON,value);
        //         console.log(FORM_POST_JSON);
        //         _this.submit(FORM_POST_JSON)
        //     })
        // })
        this.submit();
    }
    submit=(value)=>{
        const {params}=this.props.navigation.state;//路由参数
        const _this=this;
        let approval=params.name?10:-10;
        // let postData=[value];// 审批流数据
        fetch(`http://192.168.31.155:8080/bdc/api?apiname=bdc.wf.updateTaskStatus&userid=erisa.qu&kid=fb6309027dee4e3485d57d04e71e992a&approval=${approval}&remark=${this.state.advice}`, {
            method: 'GET'
        })
            .then((res)=>{
                // console.log(res);
                return res.json();
            })
            .then((res)=>{
                console.log('提交',res);
                if(res.Data){
                    this.setModalVisible(true);
                }else{
                    Alert.alert('提示', '提交失败',[{text: '确定'}]);
                }
                // this.setModalVisible(true);

            })
    };
    _imgPicker(){
        let _this=this;
        //选择图片
        const options = {
            title: '选择图片',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'从本地选择',
            cancelButtonTitle:'取消',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                console.log(response);
                let source = {uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                _this.state.avatarSource.unshift(source);
                const srce=_this.state.avatarSource;
                _this.setState({
                    avatarSource:srce
                });
            }
        });
    }
    reason=()=>{
        const {params}=this.props.navigation.state;//路由参数
            return  <TextInput
                underlineColorAndroid="transparent"
                multiline={true}
                onChangeText={(value)=>{
                    this.setState({
                        advice:value
                    })
                }}
                placeholder={params.name?"请输入批准理由":"请输入拒绝理由"}
                style={[styles.inputText,{padding:20}]}
            />
    }
}

const styles=StyleSheet.create({
    inputText:{
        width:'100%',
        height:300,
        backgroundColor:'white',
        fontSize:14,
        textAlignVertical: 'top',
        marginBottom:5
    },
    imgPick:{
        width:'100%',
        backgroundColor:'white',
        padding:10
    },
    icon:{
        width:50,
        height:50
    },
    button:{
        width:'100%',
        height:50,
        padding:10,
        paddingBottom:20,
        position:'absolute',
        bottom:0,
        left:0
    },
    modalContainer:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,.5)'
    },
    modalContent:{
        width:200,
        height:100,
        backgroundColor:"white",
        borderRadius:20
    },
    modalText:{
        width:'100%',
        marginTop:15,
        fontSize:18,
        textAlign:'center'
    }
});