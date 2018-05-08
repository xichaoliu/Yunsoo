/**
 * Created by liuxichao on 2018/4/24.
 */
'use strict';
import React, {Component} from 'react';
import {
    ART,
    Dimensions,
    PixelRatio,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
const {Surface, Shape, Path, Group} = ART;

const {width, height} = Dimensions.get('window');

const T_WIDTH = 7;
const T_HEIGHT = 4;

const COLOR_HIGH = '#00bea9';
const COLOR_NORMAL = '#333';

const LINE = 1 / PixelRatio.get();
let date=new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();

export default class ApprList extends Component {

    constructor(props) {
        super(props);
        this.props=props;
        this.state={
            selectedIndex:1,
            selected:false,
        }
    }
    componentDidMount() {}
    render() {
        return (
            <View style={{flex: 1,width:'100%',backgroundColor:'white',marginBottom:5}}>
                <View style={styles.topMenu}>
                    <TopMenuItem onSelect={this.onSelect} title={this.props.title}/>
                </View>
                {this.renderList()}
            </View>
        );
    }
    renderList(){
        const _this=this;
        if(this.state.selected){
            if(this.props.id){
                return  <View>
                    {
                        this.props.itemList.map((item,index)=>{
                         return   <View style={styles.titleItem} key={index}>
                                <Text style={{width:'20%'}}>{item.display}</Text>
                                 <DisType
                                    item={item}
                                    itemChange={_this.props.onChangeData}
                                 />
                            </View>
                     })
                    }
                </View>
            }else{
                return <View>
                    {
                        this.props.details.map((item,index)=>{

                            return <TouchableHighlight
                                    underlayColor="#eee"
                                    onPress={()=>{
                                        this.props.navigate('MsgDetail',{data:this.props.details,id:index});
                                    }}
                                    key={index}
                                >
                                    <View style={styles.titleIm} >
                                        <Text style={{width:'40%'}}>@{item.relateName}@</Text>
                                    </View>
                                </TouchableHighlight>
                        })
                    }
                </View>
            }
        }
    };
    onSelect=(state)=>{
        this.setState({
            selected:state
        })
    }
}
class TopMenuItem extends Component{
    constructor(props){
        super(props);
        this.state={
            selected:false
        }
    }
    render(){
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={styles.item}>
                    <Text
                        style={this.state.selected ? styles.menuTextHigh : styles.menuText}
                        numberOfLines={1}
                    >{this.props.title}</Text>
                    <Triangle selected={this.state.selected}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    onPress=()=>{
        this.props.onSelect(!this.state.selected);
        this.setState({// 修改状态用setSate方法
            selected:!this.state.selected
        });
    }
}
class Triangle extends React.Component {// 下拉三角组件
    constructor(props){
        super(props);
    }
    render() {
        let path;
        let fill;
        if (this.props.selected) {
            fill = COLOR_HIGH;
            path = new Path()
                .moveTo(T_WIDTH / 2, 0)
                .lineTo(0, T_HEIGHT)
                .lineTo(T_WIDTH, T_HEIGHT)
                .close();
        } else {
            fill = COLOR_NORMAL;
            path = new Path()
                .moveTo(0, 0)
                .lineTo(T_WIDTH, 0)
                .lineTo(T_WIDTH / 2, T_HEIGHT)
                .close();
        }
        return (
            <Surface width={T_WIDTH} height={T_HEIGHT}>
                <Shape d={path} stroke="#00000000" fill={fill} strokeWidth={0}/>
            </Surface>
        )
    }
}
// 列表数据类型判断渲染
class DisType extends Component{
    constructor(props){
        super(props);
        this.props=props;
        this.state={
            dateValue:'',
            isDateTimePickerVisible: false,
            itemValue:''
        }
    }
    componentWillMount(){
        if(this.props.item.dataType==='datetime'){
            this.setState({
                dateValue:this.props.item.value
            })
        }else{
            this.setState({
                itemValue:this.props.item.value
            })
        }
    }
    render() {
        return <View style={{width:'60%'}}>
            {this.ChoseInput()}
        </View>
    }
    ChoseInput=()=>{
        const _this=this
        if(this.props.item.dataType==='datetime'){
            return  <View style={styles.textInput}>
                <TouchableHighlight
                    underlayColor="white"
                    onPress={this._showDateTimePicker}>
                    <TextInput
                        style={{width:'100%',padding:0}}
                        underlineColorAndroid="transparent"
                        maxLength={30}
                        editable={false}
                        value={this.state.dateValue.toString()}
                        // editable={false}

                    />
                </TouchableHighlight>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked.bind(this)}
                    onCancel={this._hideDateTimePicker}
                />
            </View>
        }else{
            return  <TextInput
                style={styles.textInput}
                underlineColorAndroid="transparent"
                onChangeText={(value)=>{
                    this.setState({
                        itemValue:value
                    });
                }}
                onBlur ={()=>{
                    if(this.props.item.value!==this.state.itemValue){
                        this.props.itemChange(this.props.item.name,this.state.itemValue)
                    }
                }}
                maxLength={30}
                editable={this.props.item.isShowInEdit}
                value={this.state.itemValue.toString()}
            />
        }
    };
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        // console.log('A date has been picked: ', date);
        const dateString=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();// 月份+1运算需加小括号
        this.setState({
            dateValue:dateString
        });
        this.props.itemChange(this.props.item.name,dateString);
        this._hideDateTimePicker();
    };
}

const styles = StyleSheet.create({
    titleItem: {
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginBottom:5,
        marginTop:5
    },
    titleIm:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5,
        marginTop:5,
        paddingLeft:20,
        paddingBottom:5,
        borderBottomWidth:0
    },
    tableItem: {
        height: 43,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: LINE,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tableItemText: {fontWeight: '300', fontSize: 14},
    row: {
        flexDirection: 'row'
    },

    item: {
        width:'100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    menuTextHigh: {
        width:'75%',
        marginRight: 3,
        fontSize: 15,
        color: COLOR_HIGH
    },
    menuText: {
        width:'75%',
        marginRight: 3,
        fontSize: 15,
        color: COLOR_NORMAL
    },
    textInput:{
        width:'100%',
        height:30,
        borderWidth:1,
        borderColor:'black',
        padding: 0,
        paddingLeft:5
    },
    topMenu: {
        width:'100%',
        flexDirection: 'row',
        height: 40,
        backgroundColor:'white'
    }
});