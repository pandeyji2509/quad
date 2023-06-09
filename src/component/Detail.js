import React, { useEffect, useState } from 'react'
import './detail.css';
import { useParams } from 'react-router';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
function Detail() {
  // const [summ,setsumm]=useState([]);
  // const [jobs, setjobs] = useState([]);
  // let { id } = useParams();
  // // let headers = new Headers();
  // // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  // // headers.append('Access-Control-Allow-Credentials', 'true');
  // // headers.append('Content-Type', 'application/json');
  // // headers.append('Accept', 'application/json'); 
  //     const response = fetch("https://api.tvmaze.com/search/shows?q=all",{
  //         // headers: headers,
  //         // credentials: 'include',
  //     })
  //     .then(res=>res.json())
  //     .then(data=>{
  //         setjobs(data);
  //     }).catch(rej=>{
  //         console.log(rej);
  //     });
  //     console.log(jobs);
  // console.log("s",summ);
  // const key = { id };
  // console.log(key);
  // jobs.map((job)=>{
  //     console.log(key.id,job.show.id);
  //         if(key.id===job.show.id){
  //             console.log ("hii");   
  //             console.log("ll",job.show.summary);
  //         }
  //         console.log("pa",job.show);
  // })

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summ, setsumm] = useState();
  const [load, setload] = useState(true);
  let { id } = useParams();
  const key = { id };
  useEffect(() => {
    setLoading(true)
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then(response => response.json())
      .then(json => setUsers(json))
      .finally(() => {
        setLoading(false)
      })

  }, []);

  useEffect(() => {
    for (var i = 0; i < users.length; i++) {
      console.log(users[i].show.id, parseInt(key.id));
      if (users[i].show.id === parseInt(key.id)) {
        console.log(users[i].show.image.medium);
        setsumm(users[i]);
        if (users[i].show !== null) {
          setload(false);
          console.log(load)
        }
      }
    }
  }, [users])

  return (
    <div className="App">
      {load ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className='p-1'>
            <div>
              <img src={`${summ.show.image.medium}`} alt="movie.jpg" />
            </div>
            <div className='p-2'>
              <h3 className='p-3'>{`${summ.show.name}`}</h3>

              <p className='p-5'>
                <div dangerouslySetInnerHTML={{ __html: `${summ.show.summary}` }} />
              </p>
              <Link to={`/Book-ticket/${key.id}`}><button className='button-37'>Book Tiket</button></Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}


// return (
// <div>
//   Hii
//   {/* <div dangerouslySetInnerHTML={{__html:`${summary.show.summary}`}}/> */}
// </div>
//   )
// }
export default Detail;
