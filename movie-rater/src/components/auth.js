import React, {useState,useEffect} from 'react';
import {API} from '../api-service';
import {useCookies} from 'react-cookie'

function Auth(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [token, setToken] = useCookies(['mr-token'])
    const [isLoginView, setIsLoginView] = useState(true)
    const [isWrongLogin, setWrongLogin] = useState(false)

    const loginClicked = () => {
        API.loginUser({username,password}).then(resp => setToken('mr-token',resp.token)).catch(error => console.log(error))
    }

    const registerClicked = () => {
        API.registerUser({username,password}).then(resp => loginClicked()).catch(error => console.log(error))
    }

    const isDisabled = username.length === 0 || password.length === 0

    useEffect( () => {
        if(token['mr-token'] && (token['mr-token'] !== 'undefined')) {
            window.location.href ='/movies'
            setWrongLogin(false)
        }
        else if(token['mr-token'] && (token['mr-token'] === 'undefined')) setWrongLogin(true)
    }, [token])

    return (
        <div  className="App">
            <header className="App-header">
                <h1>{isLoginView ? <h1>Login</h1> : <h1>Register</h1>}</h1>
            </header>
            <div  className="login-container">
                {console.log('ads',username)}
                <label htmlFor='username'> username </label><br/>
                <input id='username' type='text' placeholder='username' value={username} 
                onChange={evt => setUsername(evt.target.value)}/><br/>
                <label for='password'>password</label><br/>
                <input id='password' type='password' placeholder='password' value={password} 
                    onChange={evt => setPassword(evt.target.value)}/><br/>
                {isLoginView ? 
                    <button onClick={loginClicked} disabled={isDisabled}>Login</button> : 
                    <button onClick={registerClicked} disabled={isDisabled}>Register</button>}
                {(isLoginView && isWrongLogin) ? <p className='warning'>Your username/password is wrong. Please try again!</p> : <p></p>} 
                {isLoginView ? 
                    <p onClick={() => setIsLoginView(false)}>You do not have an account? Register here!</p> :
                    <p onClick={() => setIsLoginView(true)}>You already have an account? Login here</p>}
            </div>
        </div>
    )
}

export default Auth