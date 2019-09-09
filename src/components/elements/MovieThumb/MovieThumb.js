import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieThumb.css';

const MovieThumb = (props) => { 
    return (
        <div className="rmdb-moviethumb"> 
            {props.clickable ? 
            //movieId och movieName hämtas från loopen i Home.js. Här skapar vi länk som skickas med i MovieThumb component
            <Link to={{pathname: `/${props.movieId}` , movieName: `${props.movieName}`}}>
                <img src={props.image} alt="moviethumb" />
            </Link>
                :
                <img src={props.image} alt="moviethumb" />

            }
        </div>
    )
}


MovieThumb.propTypes = {
    image: PropTypes.string,
    movieId: PropTypes.number,
    movieName: PropTypes.string
}

export default MovieThumb;