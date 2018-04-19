import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    Alert
} from 'react-native';
import { DrawerItems, NavigationActions } from 'react-navigation';

class DrawerContent extends Component {
    static navigationOptions = (props) => {
        return {
            header: null
        }
    };
    render() {
        console.log('props', this.props)
        return (
            <View>
                <View
                    style={{
                        backgroundColor: '#f50057',
                        height: 140,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 30 }}>Header</Text>
                </View>
                <DrawerItems {...this.props} />
                <View
                    style={{
                        backgroundColor: '#fff',
                        height: 40,
                        // alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TouchableNativeFeedback
                        onPress={() => {
                            console.log(this.props)
                            Alert.alert(
                                '确定要退出登录吗？',
                                '',
                                [
                                    { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                    { text: '确定', onPress: () => {
                                        const resetAction = NavigationActions.reset({
                                            index: 0,
                                            actions: [NavigationActions.navigate({ routeName: 'Login' })],
                                          });
                                          this.props.navigation.dispatch(resetAction)
                                    } },
                                ],
                                { cancelable: false }
                            )
                        }}
                    >
                        <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 15, }}>
                            <Text style={{ color: '#000', fontSize: 13, fontWeight: 'bold' }}>Logout</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }
}

export default DrawerContent;