import React, { Component } from 'react'
import {View , StyleSheet , Platform , Animated} from 'react-native'
import HelloWorld from './HelloWorld'

export class Test extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             topPosition : new Animated.Value(0)
        }
    }
    
    componentDidMount() {
        // Animated.timing(
        //     this.state.topPosition,
        //     {
        //         toValue : 100 ,
        //         duration : 3000
        //     }
        // ).start()
        Animated.spring(
            this.state.topPosition,
            {
                toValue : 100 ,
                speed : 4,
                bounciness : 30
            }
        ).start()
    }
    render() {
        return (
            <View style = {styles.main_container}>
                <Animated.View style = {[styles.subviewContainer , {top : this.state.topPosition}]}>
                    <HelloWorld></HelloWorld>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container : {
        flex : 1 ,
        justifyContent : 'center',
        alignItems : 'center'
    },
    subviewContainer : {
        // backgroundColor : Platform.OS === 'ios' ? 'red' : 'blue',
        ...Platform.select({
            ios : {
                backgroundColor : 'red'
            },
            android : {
                backgroundColor : 'blue'
            }
        }),
        height : 100 ,
        width : 100

    
    }
})

export default Test
