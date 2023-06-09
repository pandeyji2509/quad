import './movie.css';
import React,{useEffect, useState} from 'react'
import Shows from "./Shows";
function Movie() {
    const [Movies, setMovie] = useState([]);


    const response = fetch("https://api.tvmaze.com/search/shows?q=all")
    .then(res=>res.json())
    .then(data=>{
        setMovie(data)
    }).catch(rej=>{
        console.log(rej);
    })
    // jsonData = Movies
    // setjobs(jsonData);

  return (
    <div>
      {
        Movies.length === 0 ? (
            <p>Jobs are fetching.....</p>
        ) : (
            Movies.map((Movie) =>
                <Shows Movie={Movie} />)
            )
        }
    </div>
  )
}

export default Movie

