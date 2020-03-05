import React, { Component } from 'react'
import { StyleSheet , View , Button , TextInput, FlatList , Text , ActivityIndicator} from 'react-native'
import FilmItem from './filmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'
import { connect } from 'react-redux'
import FilmList from './FilmList'

export class search extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             films : [],
             isLoading : false
             
        }
        this.page = 0
        this.totalPages = 0
        this.serachedText ="" // pour ne pas render a chaque changement du input

        this._loadFilms = this._loadFilms.bind(this)
    }
    
    //Display another View : Film Detail View
    
    // _displayDetailForFilm = (idFilm) => {
    //     console.log("idFilm : " + idFilm)
    //     this.props.navigation.navigate("FilmDetail" , {idFilm : idFilm})
    // }

    // infinite scrolling
    _loadFilms() {
        this.setState({isLoading : true})
        if(this.searchText!="")
        {
            getFilmsFromApiWithSearchedText(this.searchText,this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films :  [...this.state.films , ...data.results], // this.state.films.concat(data.results)
                    isLoading : false
                })
            })
        }
    }

    _searchTextInputchange(text) {
        this.searchText = text
    }

    // pour afficher le loading en attendant l'affichage
    _displayLoading () {
        if(this.state.isLoading) {
            return (
                <View style = {styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    // pour renitialiser l'affichage des films dans le cas d'une nouvelle recherche
    _searchFilms() {
        this.page = 0
        this.total_pages = 0
        this.setState({
            films : []
        }, () => {
            this._loadFilms()
        })
        
    }

    render() {
        return (
            <View style = {styles.main_container}>
                <TextInput style = {styles.textInput} 
                    placeholder="Titre du film"
                    onChangeText = {(text) => this._searchTextInputchange(text)}
                    onSubmitEditing = {() => this._searchFilms()}>
                </TextInput>
                <Button title = "Rechercher" 
                     onPress={() => {this._searchFilms()}}>
                </Button>

                {/* Avant l'ajout du component Film List */}
                
                {/* <FlatList data={this.state.films}
                    extraData = {this.props.favoritesFilm} // pour que flat List se rerend a chaque fois que le state global favoriteFilm est modifié
                    
                    keyExtractor = {(item) => item.id.toString()}
                    renderItem={({item}) => 
                        <FilmItem movie={item}
                         // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
              isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                        displayDetailForFilm={this._displayDetailForFilm}
                        />
                    }
                    onEndReachedThreshold = {0.5}
                    onEndReached = {() => {
                        if(this.state.films.length >0 && this.page <this.totalPages) {
                            this._loadFilms()
                        }
                    }}
                /> */}

                {/* Apres l'ajout du component Film List */}
               
                <FilmList films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                    loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
                    page={this.page}
                    totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
                    favotireList = {false}
                />
                {this._displayLoading()}
            </View>

            //_________________________________________________________________________________________
            // <View style = {{ flex : 1 , backgroundColor : 'yellow' , flexDirection : 'row'}}>
            //     <View style = {{ flex : 1 , backgroundColor : 'red'}}></View>
            //     <View style = {{ flex : 1, backgroundColor : 'green'}}></View>
            // </View>

            //_________________________________________________________________________________________

            // <View style = {{ flex : 1 , backgroundColor : 'yellow' , alignItems : 'center' /*selon l'axe X*/ , justifyContent : 'center' /*selon l'axe Y*/}}>
            //     <View style = {{ height : 50 , width : 50 , backgroundColor : 'red'}}></View>
            //     <View style = {{ height : 50 , width : 50 , backgroundColor : 'green'}}></View>
            //     <View style = {{ height : 50 , width : 50 , backgroundColor : 'blue'}}></View>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container : { 
        flex : 1,
        },
    textInput : {
        
        height : 50 ,
        borderColor : '#000000' ,
        borderWidth : 1 ,
        paddingLeft : 5 
    },
    loading_container : {
        position : 'absolute',
        left : 0,
        right : 0,
        top : 70,
        bottom : 0,
        alignItems : 'center',
        justifyContent : 'center'
    }
})

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = state => {
    return {
      favoritesFilm: state.favoritesFilm
    }
  }
  
  export default connect(mapStateToProps)(search)
