import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './FourColGrid.css';

const FourColGrid = (props) => {


    //loopar iggenom children och hämtar ut varje child 
const renderElement = () => {
    const gridElements = props.children.map((element, i) => {
        return(
            <div key={i} className="rmdb-grid-element">
                {element}
            </div>
        )
    })
    return gridElements;
}

    return (
        <div className="rmd-grid">
            {props.header && !props.loading ? <h1>{props.header}</h1> : null}
            <div className="rmdb-grid-content">
                {renderElement()}
            </div>
        </div>
    )
}


FourColGrid.propTypes = {
    header: PropTypes.string,
    loading: PropTypes.bool 
}

export default FourColGrid;