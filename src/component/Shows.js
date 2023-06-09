import React from 'react';
import './shows.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
  import Detail from "./Detail";
function Shows(props) {
    const {text}=props.Movie.show.summary;
    console.log(props.Movie.show);
    if(props.Movie.show.genres.length>2){
        props.Movie.show.genres.pop();
    }
    
  return (
    <div className='parents-1'>
        <div>
            <img src={props.Movie.show.image.medium} alt={props.Movie.score} />
        </div>
        <div className='parents-2'>
            <h3 className='parents-3'>{props.Movie.show.name}</h3>
            
            <p className='parents-5'>
                {props.Movie.show.language} . {props.Movie.show.premiered}
            </p> 
           
            <div className='parents-7'> 
                {props.Movie.show.genres.map((genre)=>(
                <span className='parents-8'> {genre} </span>))}
            </div>
            <Link to={`/Detail/${props.Movie.show.id}`}><button className='button-37'>More details...</button></Link>
        </div> 
    </div>
  )
}

export default Shows
