import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList , Image, TouchableOpacity, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovieList(props) {
    const [movies,setMovies] = useState([])
    let token = null;
    
    const getData = async () => {
        token = await AsyncStorage.getItem('MR_Token')
        if (token){
            getMovies();
        } else {
            props.navigation.navigate('Auth')
        }
    }

    useEffect( () => {
        getData()
    }, [])

    const getMovies = () => {
        fetch('http://192.168.0.175:8000/api/movies/', {
        // fetch('http://127.0.0.1:8000/api/movies/', { 
            method: 'GET',
            headers: {
                'Authorization' : `Token ${token}`,
            }
        }).then(res => res.json()).then(res => setMovies(res)).catch(error => console.log(error))
    }

    const movieclicked = (movie) => {
        props.navigation.navigate('Detail', {movie: movie, title:movie.title, token:token})
    }

    return (
        <View >
            <Image source={require('../assets/MR_logo.png')} style={{width:'100%',height:135}} 
            resizeMode='contain'/>
            <FlatList 
                data = {movies}
                renderItem = {({item}) => (
                    <TouchableOpacity onPress={() => movieclicked(item)}>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.title}</Text> 
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor = {(item, index) => index.toString()} 
            />
        </View>
    );
}

MovieList.navigationOptions = screenProps => ({
    title: 'List of movies',
    headerStyle: {
        backgroundColor: 'orange'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24
    },
    headerRight: () =>  <Button title='Add new' color='orange' 
        onPress={() => screenProps.navigation.navigate('Edit',{movie:{title: '', description: ''}})} />,
    
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  item : {
    flex:1,
    padding: 10,
    height: 50,
    backgroundColor: '#282C35'
  },

  itemText: {
    color: '#fff',
    fontSize: 24
  }

});
