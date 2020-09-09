import React, { useEffect } from "react";
import { useParams } from "react-router-dom"


export default function MoviePage() {
    const { movieId } = useParams()

    useEffect(() => {
        //call server api to fetch the relevant movie by imdbid
    }, [movieId])
    
    return <div>
        <h1> Movie Page</h1>
        <h2> Movie id: {movieId} </h2>
    </div>
}