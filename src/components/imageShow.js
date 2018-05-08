/**
 * Created by sybil052 on 2017/7/6.
 * 照片大图预览
 */
import React, {Component} from 'react';
import {View,} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import aaa from '../assets/tex.jpg'

export default class ImageShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            imageIndex: 1,
        };
    }
    componentWillMount() {
        // 上个界面传来的照片集合
        const images = this.props.navigation.state.params.img;
        // const images = params.image;
        // const pageNum = params.num;
        console.log(this.props.navigation);
        console.log(images);
        this.setState({
            images: images,
            imageIndex: 1,
        });
    }
    render() {
        return (
            <View style={{width:'100%',height:'100%',backgroundColor:'black',alignItems:'center'}}>
                <ImageViewer
                    style={{width:'100%',height:100}}
                    imageUrls={this.state.images} // 照片路径
                    enableImageZoom={true} // 是否开启手势缩放
                    // index={this.state.imageIndex} // 初始显示第几张
                    failImageSource={{uri:aaa}} // 加载失败图片
                    onChange={(index) => {}} // 图片切换时触发
                    onClick={this.back.bind(this)}// 单击图片返回
                />
            </View>
        );
    }
    back(){
        // this.props.navigation.pop();
    }
}
