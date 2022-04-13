import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList , Image, Button, TextInput,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Auth(props) {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [regView,setRegView] = useState(false)

    useEffect(() => {
        getData()
    },[])

    const toggleView = () => {
        setRegView(!regView)
    }
    const auth = () => {
        if (regView){
            fetch(`http://192.168.0.175:8000/api/users/`, {
            // fetch('http://127.0.0.1:8000/api/movies/', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username,password})
            }).then(res => res.json())
            .then(res => {
                    setRegView(false)
                })
            .catch(error => console.log(error))}
        else {
            fetch(`http://192.168.0.175:8000/auth/`, {
            // fetch('http://127.0.0.1:8000/api/movies/', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username,password})
            }).then(res => res.json())
            .then(res => {
                if (res.non_field_errors) {
                    console.log('allert')
                    Alert.alert('Error', 'Wrong Password/Username')} 
                else {saveData(res.token)
                    props.navigation.navigate('MovieList')}
                })
            .catch(error => console.log(error))
        }
    }      

    const saveData = async (token) => {
        await AsyncStorage.setItem('MR_Token', token)
    }
    
    const getData = async () => {
        const token = await AsyncStorage.getItem('MR_Token')
        if (token) {
            console.log('token', token)
            props.navigation.navigate('MovieList')}
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={text=>setUsername(text)}
                value={username}
                autoCapitalize={'none'}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text=>setPassword(text)}
                value={password}
                autoCapitalize={'none'}
                secureTextEntry={true}
            />
            <Button onPress={()=>auth()} title={regView ? 'Register' : 'Login'}/>
            <TouchableOpacity onPress={() => toggleView()}>
                {regView ? <Text style={styles.viewText}>Already have an account? Go back to login</Text>: 
                <Text style={styles.viewText}>Don't have an account? Register here.</Text>}
                
            </TouchableOpacity>
        </View>
    );
}

Auth.navigationOptions = screenProps => ({
    title: 'Login',
    headerStyle:{
         backgroundColor: 'orange'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24
    },
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

  viewText: {
      color:'white',
      fontSize: 20,
      paddingTop: 30,
      paddingLeft: 10,
      paddingRight: 10
  },
});
