import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    ToastAndroid
} from 'react-native';
import * as SQLite from '../database/db'
import * as constant from '../config/constant';

class Login extends Component {
    static navigationOptions = (props) => {
        return {
            header: null
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            password: '',
            loginBtnDisabled: false,
            modalVisible: false
        };
    }
    doLogin() {
        console.log('doLogin');
        ToastAndroid.show(constant.getURL(constant.login), ToastAndroid.SHORT);
        this.setState({ modalVisible: true });
        SQLite.insertParam({name: 'name'});
        setTimeout(() => {
            this.setState({ modalVisible: false });
            this.props.navigation.replace('Drawer');
        }, 1000 * 2);
    }
    render() {
        const { loginBtnDisabled, code, password, modalVisible } = this.state;
        return (
            <ScrollView
                // contentContainerStyle={styles.container}
                style={StyleSheet.container}
                keyboardShouldPersistTaps='handled'
            >
                <KeyboardAvoidingView behavior="padding" >
                    <View style={styles.loginBox}>
                        <View style={styles.head}>
                            <Image
                                style={{ width: 21, height: 18, marginTop: 7 }}
                                source={require('../images/smile.png')}>
                            </Image>
                            <Text style={styles.headText}>欢迎来到LunaTmp</Text>
                        </View>
                        <View style={styles.input}>
                            <TextInput
                                underlineColorAndroid='transparent'
                                ref='userinput'
                                placeholder='输入用户名'
                                placeholderTextColor="#bbb"
                                style={styles.inputText}
                                returnKeyType={'next'}
                                value={code}
                                onChangeText={(code) => this.setState({ 'code': code })}
                            />
                        </View>
                        <View style={styles.input}>
                            <TextInput
                                underlineColorAndroid='transparent'
                                ref='pwdinput'
                                secureTextEntry={true}
                                placeholder='输入密码'
                                placeholderTextColor="#bbb"
                                style={styles.inputText}
                                value={password}
                                onChangeText={(password) => this.setState({ 'password': password })}
                            />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button
                                activeOpacity={1}
                                style={styles.btn}
                                onPress={this.doLogin.bind(this)}
                                disabled={loginBtnDisabled}
                                title='登  录'
                            />
                        </View>
                        <View style={{ flexDirection: 'row', height: 25, width: '100%' }}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => { this.props.navigation.navigate('IPSetting'); }}
                                style={[{ position: "absolute", bottom: -10, right: 0 }]}
                            >
                                <View>
                                    <Text>设置</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => { }}
                >
                    <View style={styles.loadingBox}>
                        <View style={styles.loading}>
                            <ActivityIndicator
                                size="large"
                                color="#188afa"
                                style={{ marginTop: 12 }}
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20
    },
    loginBox: {
        position: 'relative',
        width: "88%",
        height: 280,
        marginTop: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'column',
    },
    head: {
        flexDirection: 'row',
        height: 80,
    },
    headText: {
        fontSize: 20,
        color: '#1b1b1b',
        paddingLeft: 5,
    },
    input: {
        flexDirection: 'row',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        zIndex: 0,
        marginBottom: 10
    },
    inputText: {
        height: 25,
        fontSize: 16,
        textAlign: 'left',
        flex: 1,
        color: '#888',
        padding: 0,
    },
    btn: {
        height: 65,
        width: '100%',
        backgroundColor: '#188afa',
        alignItems: 'center',
        borderRadius: 6,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    loadingBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',        
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    loading: {
        width: '88%',
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 5,
    }
});