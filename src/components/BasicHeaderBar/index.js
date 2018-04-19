import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'

export default class BasicHeaderBar extends Component {
    render() {
        const { left, title, navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    {
                        left ?
                        <TouchableNativeFeedback
                            onPress={() => { left.handlePress() }}
                        >
                            <View
                                style={styles.leftBtn}
                            >
                                <Icon name={left.IconName} size={30} color="#fff" />
                            </View>
                        </TouchableNativeFeedback> :
                        <TouchableNativeFeedback
                            onPress={() => { navigation.goBack() }}
                        >
                            <View
                                style={styles.leftBtn}
                            >
                                <Icon name="arrow-back" size={30} color="#fff" />
                            </View>
                        </TouchableNativeFeedback>
                    }
                </View>
                <Text
                    style={styles.title}
                >
                    {title}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 38,
        backgroundColor: '#2196F3',
        flexDirection: 'row'
    },
    left: {
        borderRadius: 25
    },
    leftBtn: {
        width: 50,
        paddingLeft: 10,
        paddingTop: 5,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        paddingTop: 6,
        paddingLeft: 8
    }
})