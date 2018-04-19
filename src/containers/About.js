import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Button
} from 'react-native';

import BasicHeaderBar from '../components/BasicHeaderBar'

class About extends Component {
    static navigationOptions = {
        drawerLabel: 'About',
    }
    render() {
        return (
            <View style={styles.container}>
                <BasicHeaderBar
                    title='About'
                    navigation={this.props.navigation}
                />
                <Text>About</Text>
                <Button
                    activeOpacity={1}
                    onPress={() => {this.props.navigation.goBack();}}
                    title='Go Back'
                />
            </View>
        )
    }
}

export default About;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})