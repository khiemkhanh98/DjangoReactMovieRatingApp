export class API {
    static updateMovie(mov_id, body, token){
        // return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
        return fetch(`${process.env.REACT_APP_API_URL}/api/movies/${mov_id}/`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${token}`
      },
        body: JSON.stringify(body)
    }).then(resp => resp.json())
    }

    static createMovie(body, token){
        // return fetch('http://127.0.0.1:8000/api/movies/', {
        return fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${token}`
        },
        body: JSON.stringify(body)
    }).then(resp => resp.json())
    }

    static deleteMovie(mov_id, token){
        // return fetch(`http://127.0.0.1:8000/api/movies/${mov_id}/`, {
            return fetch(`${process.env.REACT_APP_API_URL}/api/movies/${mov_id}/`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${token}`
        }
    })
    }
    
    static loginUser(body){
        console.log(process.env.REACT_APP_API_URL)
        // return fetch('http://127.0.0.1:8000/auth/', {
            return fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(resp => resp.json())
    }

    static registerUser(body){
        // return fetch('http://127.0.0.1:8000/api/users/', {
            return fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(resp => resp.json())
    }

    static getMovies(token){
        // return  fetch('http://127.0.0.1:8000/api/movies/', {
            return fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `Token ${token}`
            }
          }).then(resp => resp.json())
        }
}