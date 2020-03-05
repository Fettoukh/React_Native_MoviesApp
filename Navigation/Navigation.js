import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../components/search'
import FilmDetail from '../components/filmDetail'
import Favorites from '../components/Favorites'
import {StyleSheet , View ,Text , ActivityIndicator , ScrollView , Image , TouchableOpacity} from 'react-native'
import Test from '../components/Test'


const Stack = createStackNavigator();

function SearchStackNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{title: 'Rechercher'}}
        />
        <Stack.Screen 
            name="FilmDetail" 
            component={FilmDetail} />
      </Stack.Navigator>
  );
}

function FavoritesStackNavigator(){
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{title: 'Favoris'}}
        />
        <Stack.Screen 
            name="FilmDetail" 
            component={FilmDetail} />
      </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

function MoviesTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        activeBackgroundColor: '#DDDDDD', 
        inactiveBackgroundColor: '#FFFFFF',
        showLabel : false ,
        showIcon : true
      }}>
      {/* <Tab.Screen name="Test"
        component={Test}></Tab.Screen> */}
      <Tab.Screen name="Search" 
        component={SearchStackNavigator} 
        options={{tabBarIcon: () => {
          return <Image source= {require('../Images/ic_search.png')}
            style = {styles.icon}/>
        }}}
      />
      <Tab.Screen name="Favorites"
         component={FavoritesStackNavigator} 
         options={{tabBarIcon: () => {
          return <Image source= {require('../Images/ic_favorite.png')}
            style = {styles.icon}/>
        }}}
      />
    </Tab.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default MoviesTabNavigator