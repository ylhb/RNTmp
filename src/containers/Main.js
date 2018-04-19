import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Button,
    TouchableNativeFeedback,
    StatusBar
} from 'react-native';

import BasicHeaderBar from '../components/BasicHeaderBar'

import Icon from 'react-native-vector-icons/MaterialIcons'

class Main extends Component {
    static navigationOptions = {
        drawerLabel: 'Main',
    }
    render() {
        return (
            <View style={styles.container}>
                <BasicHeaderBar
                    title='Main'
                    navigation={this.props.navigation}
                    left={{IconName: 'menu', handlePress: () => {this.props.navigation.navigate('DrawerToggle')}}}
                />
                <Text>Main</Text>
                <Button
                    activeOpacity={1}
                    onPress={() => { this.props.navigation.navigate('DrawerToggle'); }}
                    title='Drawer'
                />
                <Button
                    activeOpacity={1}
                    onPress={() => { this.props.navigation.navigate('About'); }}
                    title='About'
                />
            </View>
        )
    }
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})