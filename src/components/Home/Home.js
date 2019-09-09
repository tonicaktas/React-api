import React, {Component} from 'react';
import HeroImage from '../elements/HeroImage/HeroImage';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE} from '../../config';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';

import './Home.css';

class Home extends Component {
    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: ''
    }

 
    componentDidMount()  {
        // kolla om vi har redan sparad data i localStorage innan vi börjar hämta data 
        if(localStorage.getItem('HomeState')){
            //hämta data från localStorage
            // TAr stiringen från localStorage och konverterar den tillbaka till state object
            const state = JSON.parse(localStorage.getItem('HomeState'));
            this.setState({...state});

        } else {
            this.setState({ loading: true});
            // specifiera url från vart vi hämtar data
            const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
            // Hämtar data
            this.fetchItems(endpoint);
        }
        
    }

    searchItems = (searchTerm) => {
        let endpoint = '';
        this.setState ({
            movies: [], 
            loading:true,
            searchTerm
        })
        if(searchTerm === ""){
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        }
        this.fetchItems(endpoint);
    } 


    

    loadMoreItems = () => {
        let endpoint = '';
        this.setState({loading: true});

        //om search fältet är tom visa populära filmer
        if (this.state.searchTerm === ''){
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
        }
        this.fetchItems(endpoint);
    }






    fetchItems = (endpoint) => {
        //hämtar data med fetch(). fetch returnar 'promise'. Promise är nått som kommer resolvas i framtiden, vi kan vänta att den ska resolvas med then()
        fetch(endpoint)
        //convertera resultat till json 
        .then(result => result.json())

        .then(result => {
            this.setState({
                //kopiera gamla movies och appendar nya till den 
                movies: [ ...this.state.movies, ...result.results ],
                //kolla om HeroImage finns, om inte så lägger vi till första bilden som står i tur
                heroImage: this.state.heroImage || result.results[0],
                loading: false,
                currentPage: result.page,
                totalPages: result.total_pages

            }, ()=> {
                //if satsen är för att inte spara searchTerm i localStorage 
                if (this.state.searchTerm === ''){
                    //spara hämtad dat i localStorage för att slippa hämta den flera gånger
                localStorage.setItem('HomeState', JSON.stringify(this.state));
                }
                
            })
        })
        .catch(error => console.error('Error:', error))
    }




//class somponent user render -> return method
    render(){
        const { movies, heroImage, loading, currentPage, totalPages, searchTerm } = this.state;

        return(
            <div className="rmbd-home">
                {/* kolla om heroImage finns, om ja visa denna om inte visa null */}
                {heroImage ?
                <div>
                    <HeroImage
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                        title={heroImage.original_title}
                        text={heroImage.overview} 
                        />

                
                    <SearchBar callback={this.searchItems}/>
                </div>  : null }
                <div className="rmbd-home-grid">
                <FourColGrid 
                    header={this.state.searchTerm ? 'Search Result' : 'Popular Movies'}
                    loading={this.state.loading}>

                    {this.state.movies.map ((element, i) => { 
                        return <MovieThumb
                        key={i}
                        clickable={true}
                        image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                        movieId={element.id}
                        movieName={element.original_title}
                      />
                    })}

                    </FourColGrid>
                    {this.state.loading ? <Spinner /> : null}
                    {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ?
                    <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} /> : null }
                </div>


                
                
                
                
            </div>
        )
    }
}

export default Home;