import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Button,
    ScrollView,
    TouchableHighlight,
    ToastAndroid
} from 'react-native';
import BasicHeaderBar from '../components/BasicHeaderBar'
import Icon from 'react-native-vector-icons/EvilIcons'
import DialogAndroid from 'react-native-dialogs';
import * as SQLite from '../database/db'
import _ from 'lodash/array'
import * as constant from '../config/constant';

import GlobalConfig from '../config/GlobalConfig';

class IPSetting extends Component {
    static navigationOptions = {
        drawerLabel: 'IPSetting',
    }
    constructor(props) {
        super(props);
        this.state = {
            IPInUseKey: '',
            ipIndex: 0,
            ipName: ''
        };
        constant.IPS.forEach(item => {
            this.state[item] = '';
        })
        this.inputDialogOptions = {
            title: '',
            input: {
                hint: '',
                prefill: '',
                allowEmptyInput: false,
                callback: (value) => { callback(value) }
            },
            positiveText: '确定',
            negativeText: '取消'
        }
    }
    componentDidMount() {
        SQLite.queryParam(
            (obj) => {
                let { IPInUseKey } = obj;
                let ipIndex = constant.IPS.indexOf(IPInUseKey);
                let ipName = constant.IPS_ALIAS[IPInUseKey];
                let state = {};
                constant.IPS.forEach(item => {
                    state[item] = obj[item] || '';
                })
                this.setState({
                    ipIndex,
                    ipName,
                    ...state
                });
            }
        );
    }
    showInputDialog = (key, title, hint, prefill, allowEmptyInput) => {
        this.setInputDialogOptions(title, hint, prefill, allowEmptyInput, this.saveConfig(key));
        let dialog = new DialogAndroid();
        dialog.set(this.inputDialogOptions);
        dialog.show();
    }
    setInputDialogOptions(title, hint, prefill, allowEmptyInput, callback) {
        this.inputDialogOptions.title = title;
        this.inputDialogOptions.input.hint = hint;
        this.inputDialogOptions.input.prefill = prefill;
        this.inputDialogOptions.input.allowEmptyInput = !!allowEmptyInput;
        this.inputDialogOptions.input.callback = callback;
    }
    saveConfig = (key) => (value) => {
        let sqlParam = { [key]: value };
        GlobalConfig[key] = value;
        this.setState(sqlParam);
        SQLite.insertParam(sqlParam);
        ToastAndroid.show('保存成功！', ToastAndroid.SHORT);
    }
    doSelectIP() {
        let dialog = new DialogAndroid();
        dialog.set({
            title: '选择网络',
            selectedIndex: this.state.ipIndex,
            items: constant.IPS.map(item => constant.IPS_ALIAS[item]),
            itemsCallbackSingleChoice: (ipIndex, ipName) => {
                this.setState({
                    ipIndex,
                    ipName
                });
                let IPInUseKey = constant.IPS[ipIndex]
                SQLite.insertParam({ IPInUseKey });
                GlobalConfig.IPInUseKey = IPInUseKey;
                ToastAndroid.show('保存成功！', ToastAndroid.SHORT)
            },
            positiveText: '确定',
            negativeText: '取消'
        });
        dialog.show();
    }
    render() {
        const { ipName } = this.state;
        return (
            <View style={styles.container}>
                <BasicHeaderBar
                    title='IPSetting'
                    navigation={this.props.navigation}
                />
                <ScrollView style={StyleSheet.container}>
                    <View style={styles.settingBlock}>
                        {
                            constant.IPS.map((item, index) => {
                                return (
                                    <View key={index}>
                                        {index !== 0 ? <View style={styles.line}></View> : null}
                                        <TouchableHighlight
                                            underlayColor='#E5E5E5'
                                            onPress={this.showInputDialog.bind(this, `${item}`, constant.IPS_ALIAS[item], '', this.state[item], 1)}
                                        >
                                            <View style={styles.settingItem}>
                                                <Text style={styles.itemKey}>{constant.IPS_ALIAS[item]}</Text>
                                                <Text style={styles.itemValue}>{this.state[item] || '点击设置'}</Text>
                                                <Icon
                                                    name='chevron-right'
                                                    style={styles.itemIcon} />
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={styles.settingBlock}>
                        <TouchableHighlight
                            underlayColor='aliceblue'
                            onPress={this.doSelectIP.bind(this)}
                        >
                            <View style={styles.settingItem}>
                                <Text style={styles.itemKey}>当前网络</Text>
                                <Text style={styles.itemValue}>{ipName || '点击设置'}</Text>
                                <Icon
                                    name='chevron-right'
                                    style={styles.itemIcon} />
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default IPSetting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    settingBlock: {
        marginTop: 10,
        backgroundColor: '#fff',
    },
    settingItem: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    itemKey: {
        flex: 1,
        fontSize: 15,
        paddingLeft: 15,
        color: '#333',
        // backgroundColor: 'red'
    },
    itemValue: {
        flex: 3,
        textAlign: 'right',
        fontSize: 15,
        color: '#999',
        // backgroundColor: 'blue'
    },
    itemIcon: {
        fontSize: 23,
        color: '#999',
        marginRight: 8,
        paddingTop: 1
    },
    line: {
        height: 1,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#F0F0F0'
    }
})