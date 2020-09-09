import React from "react"
import Movie, { IMovie } from "../movie/";
import css from "./style.module.css";


interface IProps {
    movies: Array<IMovie>
    noDataMessage?: string;
    configuration: any
}
// movies: Array<Partial<IMovie>>

export default function MovieList(props: IProps) {
    console.log("Component MovieList rendered")
    const { movies, noDataMessage = "No Data" } = props
    if (!movies.length) return <h1> {noDataMessage}</h1>
    return <div className={"row"}>
        {movies.map((movie, ind) => { return <Movie key={movie.id + ind} {...movie} configuration={props.configuration} /> })}
    </div>
}  