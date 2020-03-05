import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './components/search'
import MoviesTabNavigator from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <MoviesTabNavigator></MoviesTabNavigator>
      </Provider>
    )
  }
}

export default App


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
