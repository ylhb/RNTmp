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

class Deep extends Component {
    static navigationOptions = {
        drawerLabel: 'Deep',
    }
    render() {
        return (
            <View style={styles.container}>
                <BasicHeaderBar
                    title='Deep'
                    navigation={this.props.navigation}
                />
                <Text>Deep</Text>
                <Button
                    activeOpacity={1}
                    onPress={() => {this.props.navigation.goBack();}}
                    title='Go Back'
                />
            </View>
        )
    }
}

export default Deep;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})