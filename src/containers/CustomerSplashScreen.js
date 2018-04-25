import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions
} from 'react-native';

import GlobalConfig from '../config/GlobalConfig';
import * as SQLite from '../database/db'

const { width, height } = Dimensions.get('window');

const splashImg = require('../images/splashDemo.png');//加载图片

class SplashScreen extends Component {
    static navigationOptions = (props) => {
        return {
            header: null
        }
    };
    constructor(props) {
        super(props);
        this.state = {  //这是动画效果
            bounceValue: new Animated.Value(1)
        };
    }
    componentDidMount() {
        Animated.timing(
            this.state.bounceValue, { toValue: 1.1, duration: 1000 }
        ).start();
        this.timer = setTimeout(() => {
            let startTime = (new Date()).getTime();
            SQLite.queryParam((obj) => {
                console.log(obj, (new Date()).getTime() - startTime);
                try {
                    if (obj != null && Object.keys(obj).length !== 0) {
                        GlobalConfig.code = obj.code;
                        for (attr in obj) {
                            GlobalConfig[attr] = obj[attr];
                        }
                        if (obj.name !== null && obj.name !== '' && obj.name !== undefined) {
                            this.props.navigation.replace('Drawer');
                        } else {
                            this.props.navigation.replace('Login');
                        }
                    } else {
                        this.props.navigation.replace('Login');
                    }
                } catch (e) {
                }
            });
        }, 1000);
    }
    componentWillUpdate = () => {
        clearTimeout(this.timer);
    }
    render() {
        return (
            <Animated.Image
                style={{
                    width: width,
                    height: height,
                    transform: [{ scale: this.state.bounceValue }]
                }}
                source={splashImg}
            />
        );
    }
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});