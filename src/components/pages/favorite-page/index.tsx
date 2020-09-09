import React, { useState, useEffect } from 'react';

import CustomHeader from '../../header';

import MovieList from '../../movie-list';
import { IMovie } from '../../movie';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import axios from "axios";
import { getAllByTestId } from '@testing-library/react';
import Filter from '../../filter';
import { StarColors } from "../../rank"
import Configuration from '../../configuration';



export default function FavoritePage() {
    return <h1> FavoritePage </h1>
}