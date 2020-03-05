import React, { Component } from 'react'
import { Animated , Dimensions,Image ,StyleSheet , View , Button , TextInput, FlatList , Text , TouchableOpacity } from 'react-native'
import {getImageFromApi} from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'

export class filmItem extends Component {
    
    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {
          // Si la props isFilmFavorite vaut true, on affiche le 🖤
          return (
            <Image
              style={styles.favorite_image}
              source={require('../Images/ic_favorite.png')}
            />
          )
        }
      }

    render() {
        const displayDetailForFilm = this.props.displayDetailForFilm
        return (
        <FadeIn>
        <TouchableOpacity 
            style = {styles.main_container}
            onPress = { () => displayDetailForFilm(this.props.movie.id)}>
            <Image style = {styles.image}
                source = {{uri:getImageFromApi(this.props.movie.poster_path)}}
            />
            <View style = {styles.content_container}>
                <View style = {styles.header_container}>
                    {this._displayFavoriteImage()}
                    <Text style = {styles.title_text}>{this.props.movie.title}</Text>
                    <Text style = {styles.vote_text}>{this.props.movie.vote_average}</Text>
                </View>
                <View style = {styles.description_container}>
                    <Text style = {styles.description_text} numberOfLines={6}>{this.props.movie.overview}</Text>
                </View>
                <View style = {styles.date_container}>
                    <Text style={styles.date_text}>Sorti le : {this.props.movie.release_date} </Text>
                </View>
            </View>
        </TouchableOpacity>
        </FadeIn>

            // <View style={{flex : 1 , backgroundColor : 'green' ,  flexDirection : 'row'}}>
            //     <View style={{flex : 1 , backgroundColor : 'blue' }}>
            //         <Text>Image</Text>
            //     </View>
            //     <View style={{flex : 3 , backgroundColor : 'orange' , }}>
            //         <View style={{flex : 1 ,flexDirection : 'row'}}>
            //             <View style = {{flex : 3}}>
            //                 <Text>Titre du film : {this.props.movie.title}</Text>
            //             </View>
            //             <View style = {{flex : 1 ,backgroundColor : 'white'}}>
            //                 <Text>Vote : {this.props.movie.vote_average}</Text>
            //             </View>
            //         </View>
            //         <View style={{flex : 3 , backgroundColor : 'red'}}>
            //             <Text>Description : {this.props.movie.overview}</Text>
            //         </View>
            //         <View style={{flex : 1 , backgroundColor : 'violet'}}>
            //             <Text>Date de Sortie : {this.props.movie.release_date}</Text>
            //         </View>
            //     </View>
            // </View>
        )
    }
}

const styles = StyleSheet.create ({
    main_container : {
        height : 190,
        flexDirection : 'row'
    },
    image : {
        width : 120,
        height : 180 ,
        margin : 5,
        backgroundColor:'gray'
    },
    content_container : {
        flex : 1,
        margin : 5
    },
    header_container : {
        flex : 3 ,
        flexDirection : 'row'
    },
    title_text : {
        flex : 1 ,
        fontWeight : 'bold',
        fontSize : 20,
        flexWrap : 'wrap',
        paddingRight : 10
    },
    vote_text : {
        fontWeight :'bold',
        fontSize : 26,
        color : '#666666'
    },
    description_container : {
        flex : 7
    },
    description_text : {
        fontStyle : 'italic',
        color : '#666666'
    },
    date_container : {
        flex : 1
    },
    date_text : {
        textAlign : 'right',
        fontSize : 14
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
      }
})
export default filmItem
