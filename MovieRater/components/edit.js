import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList , Image, Button, TextInput} from 'react-native';

export default function Edit(props) {
    const movie = props.navigation.getParam('movie', {title:'',description:''})
    const [title,setTitle] = useState(movie.title)
    const [description,setDescription] = useState(movie.description)

    const saveMovie = () => {
        if (movie.id){
            fetch(`http://192.168.0.175:8000/api/movies/${movie.id}/`, {
            // fetch('http://127.0.0.1:8000/api/movies/', { 
                method: 'PUT',
                headers: {
                    'Authorization' : 'Token 2ea3ee1268d7d28577e1390b71c1ec40545e3ea7',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title:title, description:description})
            }).then(res => res.json())
            .then(movie => props.navigation.navigate('Detail', {movie: movie, title:movie.title}))
            .catch(error => console.log(error))
        }
        else {
            fetch(`http://192.168.0.175:8000/api/movies/`, {
            // fetch('http://127.0.0.1:8000/api/movies/', { 
                method: 'POST',
                headers: {
                    'Authorization' : 'Token 2ea3ee1268d7d28577e1390b71c1ec40545e3ea7',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title:title, description:description})
            }).then(res => res.json())
            .then(movie => props.navigation.navigate('MovieList'))
            .catch(error => console.log(error))
        }
    }      


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                onChangeText={text=>setTitle(text)}
                value={title}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={text=>setDescription(text)}
                value={description}
            />
            <Button onPress={()=>saveMovie()} title={movie.id ? 'Edit' : 'Add'}/>
        </View>
    );
}

const removeClicked = (props) => {
    const movie = props.navigation.getParam('movie')
    fetch(`http://192.168.0.175:8000/api/movies/${movie.id}/`, {
        // fetch('http://127.0.0.1:8000/api/movies/', { 
            method: 'DELETE',
            headers: {
                'Authorization' : 'Token 2ea3ee1268d7d28577e1390b71c1ec40545e3ea7',
                'Content-Type': 'application/json'
            },
        })
        .then(() => props.navigation.navigate('MovieList'))
        .catch(error => console.log(error))
}

Edit.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('movie').title ,
    headerStyle:{
         backgroundColor: 'orange'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24
    },
    headerRight: () =>  <Button title='Remove' color='orange' onPress={() => removeClicked(screenProps)}/>,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding: 10
  },
  
  label: {
      fontSize: 24,
      color: 'white',
      padding: 10
  },

  input : {
    backgroundColor: 'white',
    fontSize: 24,
    padding: 10,
    margin: 10
  },
});
