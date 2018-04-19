import React, { Component } from 'react';
import { connect } from 'react-redux'
import { RootStack } from '../navigation/RootStack'

class App extends Component {
    render() {
        return (
            <RootStack />
        )
    }
}

function mapStateToProps(state) {
    return {
        // login: state.login
    }
}

export default connect(mapStateToProps)(App);