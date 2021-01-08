import React, { Component } from 'react'
import { View, TextInput, Button } from 'react-native'

export class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this);
    }

    onSignUp() {

    }

    render() {
        return (
            <View>
                <TextInput 
                    placeholder='name'
                    onChangeText={(name) => this.setState({ name:name })}
                    />
                <TextInput 
                    placeholder='email'
                    onChangeText={(email) => this.setState({ email:email })}
                    />
                <TextInput 
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password:password })}
                    />        

                <Button 
                    onPress={() => this.onSignUp()}
                    title="SignUp"
                    />    
            </View>
        )
    }
}
import { View, Text, }

export default Register
