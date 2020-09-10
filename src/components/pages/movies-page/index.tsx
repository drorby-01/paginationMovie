import React, { useState, useEffect } from 'react';

import CustomHeader from '../../header';

import MovieList from '../../movie-list';
import { IMovie } from '../../movie';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import {useHistory} from "react-router-dom"
import axios from "axios";
import { getAllByTestId } from '@testing-library/react';
import Filter from '../../filter';
import { StarColors } from "../../rank"
import Configuration from '../../configuration';


function MoviesPageInternal() {
    const history = useHistory()
    const [moviepage,setMoviePage] =useState({page:1})
    const initialMovies: Array<any> | null = []
    const initialDeletedMovies: Array<any> = []
    const [searchMovieApi,setSearchMovieApi]= useState({searchMovie:"scream"})
    const [movies, setMovies] = useState(initialMovies)
    const [deletedMovies, setDeletedMovies] = useState(initialDeletedMovies)
    const [starsColor, setStarsColor] = useState(StarColors.secondary);
    const [alertConfig, setAlertConfig] = useState({ show: false, message: "" })
    // const [getter, setter] = useState(Initial State)
    const [isLoading, setLoader] = useState(true)


    async function getMoviesApi(searchValue: string = "" ,pageNumber:number) {
        setLoader(true)
        try {
            history.push(`/page/${searchValue}/${pageNumber}`)
            const moviesUrl = `http://www.omdbapi.com/?s=${searchValue}&apikey=4f7462e2&page=${pageNumber}`
            const { data } = await axios.get(moviesUrl);
            if (data.Response === "False") throw Error("No Data From Api")
            setMovies(data.Search)
        } catch ({ message }) {
            setAlertConfig({ show: true, message })
            //@ts-ignore
            setMovies([])
            clearErrorMessage()
        } finally {
            setLoader(false)
        }
    }


    function clearErrorMessage() {
        setTimeout(() => {
            setAlertConfig({ show: false, message: "" })
        }, 2000);
    }
    useEffect(() => {
        //this code will run: cases:
        // on initial render
        // on any chnage in the array params
        getMoviesApi("scream",1)
        
    }, [starsColor])

    function clearMovies() {
        setMovies([])
    }

    function revert() {
        const deletedMoviesCopy = [...deletedMovies];
        if (!deletedMoviesCopy.length) return;
        const getLastRevertMovie = deletedMoviesCopy[0];
        deletedMoviesCopy.splice(0, 1)
        setMovies([...movies, getLastRevertMovie])
        setDeletedMovies([...deletedMoviesCopy])
    }

    function addMovie() {
        setMovies([...movies]) //example to show state - data[0] = from FORM
    }


    function deleteMovie(moovieId: string): void {
        const moviesCopy = [...movies]
        const [index, m] = getMoviesData()
        moviesCopy.splice(index, 1);
        setMovies(moviesCopy)
        setDeletedMovies([...deletedMovies, m])
        function getMoviesData(): Array<any> {
            const index = movies.findIndex(m => m.imdbID === moovieId);
            const movie = movies.find(m => m.imdbID === moovieId);
            return [index, movie]

        }
    }
    function filterOperationApi(value: string) {
        
        setSearchMovieApi({searchMovie: value})
        setMoviePage({page:1})
        getMoviesApi(value,1)
        
    }

    function filterOperation(value: string) {
        if (!value) return setMovies(movies);
        const filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(value))
        setMovies(filteredMovies)
    }
    
    async function movieNextPage(){
    
       //const [moviepage,setMoviePage] =useState({moviedefault:true,page:1})
       setMoviePage({page:++moviepage.page})
       getMoviesApi(searchMovieApi.searchMovie,moviepage.page)
    //    const {data}= await axios.get(`http://www.omdbapi.com/?s=${searchMovieApi.searchMovie}&plot=short&apikey=4f7462e2&page=${moviepage.page}`)
    //    setMovies(data.Search)
       history.push(`/page/${searchMovieApi.searchMovie}/${moviepage.page}`)
       
    }

    async function moviePrevPage(){
        
        
        
        if(moviepage.page > 1)
        {   
            setMoviePage({page:--moviepage.page})
            getMoviesApi(searchMovieApi.searchMovie,moviepage.page)
            // const {data}= await axios.get(`http://www.omdbapi.com/?s=${searchMovieApi.searchMovie}&plot=short&apikey=4f7462e2&page=${moviepage.page}`)
            // setMovies(data.Search)    
            history.goBack()
        }
        
    }

    const { show, message } = alertConfig;
    return <div className="container">
        <div>
            {show && <Alert key={1} variant={"danger"}>
                {message}
            </Alert>}
        </div>
        <Configuration setColorInGlobalState={setStarsColor} color={starsColor} />
        <Filter filterOperation={filterOperationApi} />
        <CustomHeader style={{ color: "green" }} text={"Movies"} />
        <div className="row">
            <Filter filterOperation={filterOperation} />
            <Button onClick={() => setMovies([])} > clear filter</Button>
        </div>
        <div className="row">
            <Button onClick={clearMovies} > clear Movies</Button>
            <Button onClick={addMovie} > Add movie</Button>
            <Button onClick={revert}  > revert</Button>
            <Button onClick={movieNextPage} variant="primary" className="offset-lg-5">next page</Button>
            <Button onClick={moviePrevPage} variant="primary" >prev page</Button>
        </div>
        <div>
            {isLoading ?
                < Spinner animation="border" role="status"> </Spinner>
                : <MovieList noDataMessage="No Data for you firend" movies={moviesAdapter(movies)} configuration={{ starsColor }} />
            }
        </div>
        
    </div >

    function moviesAdapter(movies: Array<any>): Array<IMovie> {
        return movies.map((movie: any) => {
            const { Title, Year, rank, Poster, imdbID, Type } = movie;
            return { deleteMovie, baseAdditionalInfoUrl: "http://imdb.com/title", title: Title, year: Year, poster: Poster, type: Type, id: imdbID, rate: rank }
        })
    }

}

export default function MoviesPage() {
    return <MoviesPageInternal />
}