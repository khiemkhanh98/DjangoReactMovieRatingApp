import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import {useCookies} from 'react-cookie'

function MovieDetails(props){
    const [highlighted, setHighlighted] = useState(-1)
    let mov = props.movie
    const highlightRate = high => evt => {
        setHighlighted(high);
    }
    const [token, setToken] = useCookies(['mr-token'])

    const rateClicked = rate => evt => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${token['mr-token']}`
      },
        body: JSON.stringify({stars: rate + 1})
    }).then(() => getdetails()).catch(error => console.log(error))
    }

    const getdetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/ `, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${token['mr-token']}`
      },
    }).then(resp => resp.json()).then(resp => props.updateMovie(resp) ).catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            {mov ? (
                <div>
                    <h1>{mov.title}</h1>
                    <p>{mov.description}</p>
                    {
                        [...Array(5)].map((e,i) => {
                            return <FontAwesomeIcon key={i} icon={faStar} className={mov.avg_rating>i ? 'orange' : '' }/>
                
                        } )
                    }
                    ({mov.no_of_ratings})

                    <div className = 'rate-container'>
                        <h2>Rate it</h2>
                        {
                            [...Array(5)].map((e,i) => {
                                return <FontAwesomeIcon key={i} icon={faStar} className={highlighted>i-1 ? 'purple' : '' }
                            onMouseEnter={highlightRate(i)}
                            onMouseLeave={highlightRate(-1)}
                            onClick={rateClicked(i)}
                            />
                            } )
                        }
                    </div>
                </div>      
            ) : null}
        </React.Fragment>
    )
}

export default MovieDetails;