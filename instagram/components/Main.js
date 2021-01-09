import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        return (
            <View>
                <Text style={{flex:1 , justifyContent: 'center' , color: 'blue'}}> Already loggedIn ..Enjoy.. </Text>
            </View>
        )
    }
}

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(null, mapDispatchProps)(Main)
