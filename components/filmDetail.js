import React, { Component } from 'react'
import {Share , Platform ,Alert ,  StyleSheet , View ,Text , ActivityIndicator , ScrollView , Image , TouchableOpacity} from 'react-native'
import {getFilmDetailFromApi ,getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import {connect} from 'react-redux'
import EnlargeShrink from '../Animations/EnlargeShrink'

export class filmDetail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isLoading : true,
             film : undefined,
        }
        //this._toggleFavorite = this._toggleFavorite.bind(this)
         // Ne pas oublier de binder la fonction _shareFilm sinon, lorsqu'on va l'appeler depuis le headerRight de la navigation, this.state.film sera undefined et fera planter l'application
        this._shareFilm = this._shareFilm.bind(this)
    }

    _displayFloatingActionButton() {
      const { film } = this.state
      if (film != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
        return (
          <TouchableOpacity
            style={styles.share_touchable_floatingactionbutton}
            onPress={() => this._shareFilm()}>
            <Image
              style={styles.share_image}
              source={require('../Images/ic_share.png')} />
          </TouchableOpacity>
        )
      }
  }

    // Dès que le film est chargé, on met à jour les paramètres de la navigation (avec la fonction _updateNavigationParams) pour afficher le bouton de partage
  componentDidMount() {
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.route.params.idFilm)
    if (favoriteFilmIndex !== -1) { 
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex],
        isLoading:false
      }, () => { this._updateNavigationParams() })
      return
    }

    // Le film n'est pas dans nos favoris, on n'a pas son détail
      // On appelle l'API pour récupérer son détail
    this.setState({ isLoading: true })
    getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      }, () => { this._updateNavigationParams() })
    })
  }


    //Partager 

    _shareFilm () {
      const {film} = this.state
      Share.share({title : film.title , message : film.overview})
        .then(
            Alert.alert(
              'Succés',
              'Film Partagé',
              [
                {text : 'OK' , onPress : () => {}}
              ]
            )
        )
        .catch(err => 
            Alert.alert(
              'Echec',
              'Film non Partagé',
              [
                {text : 'OK' , onPress : () => {}}
              ]
            )
        )
    }

     // IOS : Fonction pour faire passer la fonction _shareFilm et le film aux paramètres de la navigation. Ainsi on aura accès à ces données au moment de définir le headerRight
    _updateNavigationParams() {
      this.props.navigation.setParams({
        shareFilm: this._shareFilm,
        film: this.state.film
    })
  }

  //Afficher le boutton de partage
    _displayFloatingActionButton() {
      const { film } = this.state
      if (film != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
        return (
          <TouchableOpacity
            style={styles.share_touchable_floatingactionbutton}
            onPress={() => this._shareFilm()}>
            <Image
              style={styles.share_image}
              source={require('../Images/ic_share.png')} />
          </TouchableOpacity>
        )
      }
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

    componentDidUpdate() {
      console.log(this.props.favoritesFilm)
    }

    // Ajout / supression des favoris
    _togglefavorite () {
      const action = {
        type : "TOGGLE_FAVORITE" ,
        value : this.state.film
      }
      this.props.dispatch(action)
    }

    _displayFavoriteImage() {
      var sourceImage = require('../Images/ic_favorite_border.png')
      var shouldEnlarge = false 
      if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
        // favoris
        sourceImage = require('../Images/ic_favorite.png')
        shouldEnlarge = true
      }
      return <EnlargeShrink shouldEnlarge={shouldEnlarge}>
                <Image 
                source={sourceImage}
                style = {styles.favorite_image}></Image>
            </EnlargeShrink>
              
    }

    
    // Affiche les detail du film
    _displayFilm() {
        const { film } = this.state
        if (film != undefined) {
          return (
            <ScrollView style={styles.scrollview_container}>
              <Image
                style={styles.image}
                source={{uri: getImageFromApi(film.backdrop_path)}}
              />
              <Text style={styles.title_text}>{film.title}</Text>
              <TouchableOpacity 
                onPress= {() => this._togglefavorite()}
                style = {styles.favorite_container}>
                  {this._displayFavoriteImage()}
                </TouchableOpacity>
              <Text style={styles.description_text}>{film.overview}</Text>
              <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
              <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
              <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
              <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
              <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                  return genre.name;
                }).join(" / ")}
              </Text>
              <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                  return company.name;
                }).join(" / ")}
              </Text>
              {this._displayFloatingActionButton()}
            </ScrollView>
          )
        }
      }
    
    render() {
        //console.log(this.props)
        // const idFilm = this.props.route.params.idFilm
        return (
            <View styles = {styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
                {/* {console.log("render" + this.state.film)} */}
                {/* <Text>{this.state.film.title}</Text> */}  
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container : {
        flex : 1 ,
    },
    loading_container : {
        position : 'absolute',
        left : 0,
        right : 0,
        top : 250,
        bottom : 0,
        alignItems : 'center',
        justifyContent : 'center'
    },
    scrollview_container : {  
    },
    image: {
        height: 169,
        margin: 5
      },
      title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
      },
      description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
      },
      default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
      },
      favorite_container: {
        alignItems: 'center',
      },
      favorite_image : {
        flex : 1,
        width : null,
        height : null
      },
      share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 50,
        height: 50,
        right: 30,
        bottom: 50,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
      },
      share_image: {
        width: 30,
        height: 30
      },
      share_touchable_headerrightbutton: {
        marginRight: 8
      }

})


const mapStateToProps = (state) => {
  return {
    favoritesFilm : state.favoritesFilm 
  }
}

export default connect(mapStateToProps)(filmDetail)
