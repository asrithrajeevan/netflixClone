import React, { useEffect, useState } from "react";
import "./RowPost.css";
import axios from "../../axios";
import { API_KEY, imageUrl } from "../constants/constants";
import YouTube from "react-youtube";
function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [moviesKey, setMovieId] = useState('');
    const [modal, setModal] = useState(false);
    // const [windows, setWindow] = useState({height:window.innerWidth,width:window.innerHeight});

    useEffect(() => {
      axios.get(props.url).then((res) => {
          if (res.data) {
              setMovies(res.data);
              setMovies(res.data.results);
              // console.log(res.data);
          }
      });
    }, []);
    const opts = {
      height:500,
      width:1400,
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };
    const handleMovie = (id) => {
      axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(res=>{
        // console.log('data-->',res.data.results[0].key)
        if(res.data.results.length !== 0){
          setMovieId(res.data.results[0].key);
        }
      }).catch(err=>{
        console.log('error occured');
      })
    };
    const handlModal = (id) => {
      handleMovie(id)
      setModal(!modal)
    }
    const closeModal = () => {
      setModal(!modal)
    }
    // console.log('moviesKey -->',moviesKey);
    return (
      <>
        {modal?
            <div className="modal container-fluid">
              <div className="modal-content container-fluid">
                <div className="closeButtonDiv material-symbols-outlined">
                    <span onClick={closeModal} class="material-symbols-outlined close">close</span>
                </div>
                <div className="videoContainer">
                  <YouTube videoId={moviesKey} opts={opts} />
                </div>
              </div>
            </div>

            :
          <>
            <div className="row">
              <h2>{props.title}</h2>
              <div className="posters">
                {movies.map((obj) => (
                  <div style={{flexDirection:'column'}}>
                    {obj.backdrop_path? 
                    <>
                    <img
                      onClick={() => handlModal(obj.id)}
                      className={props.isSmaller ? "smallPoster" : "poster"}
                      src={`${imageUrl + obj.backdrop_path}`}
                      alt="poster"
                    />
                    <h5 style={{textAlign:'center', color:'#48494b', margin:15}}>{obj.title? obj.title : obj.original_name}</h5>
                    </>
                    : null}
                  </div>
                  
                ))}
              </div>
            </div>
          </>
          }
      </>
    );
}

export default RowPost;
