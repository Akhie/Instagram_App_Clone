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
        const { currentUser } = this.props
        if(currentUser===undefined){
            return(
                <View>
                    <Text>LOADING ...</Text>
                </View>
            )
        }
        else{
            return (
                <View>
                    <Text style={{flex:1 , justifyContent: 'center' , color: 'blue'}}> Already loggedIn ..Enjoy.. </Text>
                    <Text style={{flex:1 , justifyContent: 'center' , color: 'blue'}}> Welcome {currentUser.name} </Text>
                </View>
            )
        }    
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main)
