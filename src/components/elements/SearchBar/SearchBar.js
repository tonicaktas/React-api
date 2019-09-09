import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome'
import './SearchBar.css';

class SearchBar extends Component {
    state = {
        value: ''
    }

    timeout = null;

    doSearch = (event) => {
        this.setState({value: event.target.value})
        // timeout så att funktionen inte kallas på varje keystroke, vi har halv sekund innan varje keystroke för search method ska köras 
        clearTimeout(this.timeout);

        this.timeout = setTimeout( () => {
            this.props.callback(this.state.value)
        },500)
    }


    render(){
        return(
            <div className="rmdb-searchbar">
                <div className="rmbd-searchbar-content"  >
                    <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
                    <input 
                    type="text"
                    className="rmdb-searchbar-input"
                    placeholder="Search"
                    onChange={this.doSearch}
                    value={this.state.value}
                    />

                </div>
                
            </div>
        )
    }
}

export default SearchBar;