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
let POST_DATA=[
    {
        "tableName": "ERP_Customer", /*提交的主表名*/
        "submitDate": date, /*提交时间*/
        "contents":[],
        "details":[]
    }
];
export default class AttachList extends Component {

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
        // this.props.onChangeItem('name','value');
        if(this.state.selected){
            const _this=this;
                return  <View>
                    {
                        this.props.itemList[0].Fields.map((item,index)=>{
                            return   <View style={styles.titleItem} key={index}>
                                <Text style={{width:'20%'}}>{item.display}</Text>
                                <DisType
                                    changeListItem={_this.props.onChangeItem}
                                    item={item}
                                    indexKey={_this.props.itemKey}
                                    valueObj={this.props.valueList}
                                />
                            </View>
                        })
                    }
                </View>
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
        for(const obj in this.props.valueObj){
            if(obj===this.props.item.name){
                if(this.props.item.dataType==='datetime'){
                    // noinspection JSUnfilteredForInLoop
                    this.setState({
                        dateValue:this.props.valueObj[obj]?this.props.valueObj[obj]:''
                    })
                }else{
                    this.setState({
                        itemValue:this.props.valueObj[obj]?this.props.valueObj[obj]:''
                    })
                }
            }
        }
    }
    render() {
        return <View style={{width:'60%'}}>
            {this.ChoseInput()}
        </View>
    }
    ChoseInput=()=>{
        if(this.props.item.dataType==='datetime'){
            // let item={
            //     name:this.props.item.name,
            //     value:this.props.item.value
            // };
            // POST_DATA[0].contents.push(item);
            this.props.changeListItem(this.props.item.name,this.props.item.value,this.props.indexKey);
            return  <View style={styles.textInput}>
                <TouchableHighlight
                    underlayColor="white"
                    onPress={this._showDateTimePicker}>
                    <TextInput
                        style={{width:'100%',padding:0}}
                        underlineColorAndroid="transparent"
                        maxLength={30}
                        editable={false}
                        defaultValue={this.state.dateValue?this.state.dateValue.toString():''}
                    />
                </TouchableHighlight>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
            </View>
        }else{
            if(!this.props.item.isShowInEdit){
                this.props.changeListItem(this.props.item.name,this.props.item.value);
            }
            return  <TextInput
                style={styles.textInput}
                underlineColorAndroid="transparent"
                onChangeText={(value)=>{
                    // console.log(value);

                    this.setState({
                        itemValue:value
                    });
                }}
                onBlur ={(value)=>{
                    let item={
                        name:this.props.item.name,
                        value:this.state.itemValue
                    };
                    this.props.changeListItem(this.props.item.name,this.state.itemValue,this.props.indexKey);
                }}
                maxLength={30}
                editable={this.props.item.isShowInEdit}
                value={this.state.itemValue?this.state.itemValue.toString():''}
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
        let item={
            name:this.props.item.name,
            value:dateString
        };
        for(let i in POST_DATA[0].contents){
            if(POST_DATA[0].contents[i].name===item.name){
                POST_DATA[0].contents[i]=item;
            }
        }
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