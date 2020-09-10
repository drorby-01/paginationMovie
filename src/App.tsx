import React, { useEffect, useState } from 'react';
import './App.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import MoviesPage from './components/pages/movies-page';
import AboutPage from './components/pages/about-page';
import ConfigurationPage from './components/pages/configuration-page';
import FavoritePage from './components/pages/favorite-page';
import SearchResultPage from './components/pages/search-result-page';
import MoviePage from "./components/pages/movie-page"


import axios from "axios"
import { Link, Switch, Route, BrowserRouter as Router ,Redirect } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

// jsx element


const Routes: Array<IRoute> = [{ component: MoviesPage, path: "/", name: "Movies", exact: true, isVisible: true },
{ component: ConfigurationPage, path: "/configuration", name: "configuration", isVisible: true, exact: true },
{ component: AboutPage, path: "/about", name: "about", isVisible: true , exact: true },
{ component: FavoritePage, path: "/favorites", name: "favorites", isVisible: true , exact: true},
{ component: SearchResultPage, path: "/search-result", name: "Search Result", isVisible: true , exact: true },
{ component: MoviePage, path: "/movie/:movieId", name: "Movie page? do i need it?", isVisible: false , exact: true },
{component:MoviesPage,path:"/page/:search/:number" ,name: "MoviesPage", exact: true, isVisible: true }

];
// create function element
function App() {
    return <Router>
        <div className="container">
            <NavBarApp />
            <Switch>

                <RoutesConfiguration routes={Routes} />
                            
                       
            </Switch> 
        </div>
    </Router>
}

function PageNotFound(){
    return <div>Page Not Found</div>
}


interface IRoute {
    component: any,
    path: string,
    name?: string,
    exact?: boolean,
    isVisible: boolean
}
function RoutesConfiguration(props: { routes: Array<IRoute> }) {
    return <>{props.routes.map((route: IRoute) => <Route {...route} />)} </>
}


function NavBarApp() {

    const [userDetails, setUserDetails] = useState(null)
    const [flag, setFlag] = useState(null)

    async function getUserDetailsApi() {
        try {
            const { data } = await axios.get("https://randomuser.me/api/?results=1")
            const user = data.results[0]
            setUserDetails(user)
            const responseCountries = await axios.get(`https://restcountries.eu/rest/v2/name/${user.location.country}`)
            const [country] = responseCountries.data
            setFlag(country.flag);
        } catch{
            // alert no details
        } finally {
            // cancel loader
        }
    }
    useEffect(() => {
        getUserDetailsApi()
    }, [])

    // if (!userDetails) return null
    return (<Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movies Api</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {Routes.filter((route: IRoute) => route.isVisible).map((route: IRoute) => {
                    const { path, name } = route;
                    return <Link to={path}> {name} </Link>
                })}
            </Nav>
        </Navbar.Collapse>

        {userDetails ? <UserDetails user={userDetails} /> : < Spinner animation="border" role="status"> </Spinner>}
        {flag ? <Flagush f={flag} /> : < Spinner animation="border" role="status"> </Spinner>}
    </Navbar>)
}

function UserDetails(props: any) {
    return <div> {props?.user?.name?.last} </div>
}

function Flagush(props: any) {
    return <img src={props.f} height="50" width="50" />
}

export default App;
