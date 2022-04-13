import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList , Image, Button, Alert} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'

export default function Detail(props) {

    const movie = props.navigation.getParam('movie', null)
    const token = props.navigation.getParam('token', '')
    const [ highlight, setHighlight] = useState(0); 

    const rateClicked = () => {
        if (highlight >0 && highlight<6){
            fetch(`http://192.168.0.175:8000/api/movies/${movie.id}/rate_movie/`, { 
                method: 'POST',
                headers: {
                    'Authorization' : `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({stars:highlight})
            }).then(res => res.json())
            .then(res =>{ Alert.alert('Rating', res.message)})
            .catch(error => Alert.alert('Error',error))
            .then(() => {
                movie.avg_rating = highlight
                setHighlight(0)})
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.starContainer}>
                {   
                    [...Array(5)].map((e,i) => {
                        return <FontAwesomeIcon key={i} icon={faStar} style={movie.avg_rating>i ? styles.orange : styles.white} />
                    } )
                }
                <Text style={styles.white}>({movie.no_of_ratings})</Text>
            </View>
            <Text style={styles.description}>{movie.description}</Text>
            <View style={{borderBottomColor: 'white', borderBottomWidth: 2}}/>
            <Text style={styles.description}>Rate it !!!</Text>
            <View style={styles.starContainer}>
                {
                    [...Array(5)].map((e,i) => {
                        return <FontAwesomeIcon key={i} icon={faStar} style={highlight>i ? styles.purple : styles.grey} 
                            size={48} onPress={() => setHighlight(i+1)} />
                    } )
                }
            </View>
            <Button title='Rate' onPress={() => rateClicked()} style={styles.description} />
        </View>
    );
}

Detail.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('movie').title,
    headerStyle: {
        backgroundColor: 'orange'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24
    },
    headerRight: () =>  <Button title='Edit' color='orange' onPress={() => screenProps.navigation.navigate('Edit',
    {movie:screenProps.navigation.getParam('movie')})}/>,
    
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding: 10
  },

  starContainer : {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection : 'row'
  },

  orange : {
      color: 'orange'
  },

  white: {
      color: 'white'
  },

  grey : {
    color: 'grey'
},

purple: {
    color: 'purple'
},
  
  description: {
      fontSize: 20,
      color: 'white',
      padding: 10
  }
});
