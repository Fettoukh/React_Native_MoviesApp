import React, { Component } from 'react'
import { Animated , Dimensions,Image ,StyleSheet , View , Button , TextInput, FlatList , Text , TouchableOpacity } from 'react-native'


export class FadeIn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             positionLeft : new Animated.Value(Dimensions.get('window').width)
        }
    }

    componentDidMount () {
        Animated.spring(
            this.state.positionLeft,
            {
                toValue : 0,
                speed : 10,
                bounciness : 10
            }
        ).start()
    }
    render() {
        return (
            <Animated.View style={{left : this.state.positionLeft}}>
                {this.props.children}
            </Animated.View>

        )
    }
}

export default FadeIn
