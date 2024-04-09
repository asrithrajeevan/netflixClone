import React, { useEffect, useState } from "react";
import "./RowPost.css";
import axios from "../../axios";
import { API_KEY, imageUrl } from "../constants/constants";
import YouTube from "react-youtube";
import { originals } from "../../urls";
function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [moviesKey, setMovieId] = useState('');

    useEffect(() => {
      axios.get(originals).then((res) => {
          if (res.data) {
              setMovies(res.data);
              setMovies(res.data.results);
              console.log(res.data);
          }
      });
    }, []);
    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
      },
    };
    const handleMovie = (id) => {
      axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(res=>{
        if(res.data.results.length !== 0){
          setMovieId(res.data.results[0]);
        }
      }).catch(err=>{
        console.log('error occured');
      })
    };
    return (
        <div className="row">
            <h2>{props.title}</h2>
            <div className="posters">
                {movies.map((obj) => (
                    <img
                        onClick={() => handleMovie(obj.id)}
                        className={props.isSmaller ? "smallPoster" : "poster"}
                        src={`${imageUrl + obj.backdrop_path}`}
                        alt="poster"
                    />
                ))}
            </div>
            {moviesKey && <YouTube videoId={moviesKey.key} opts={opts} />}
        </div>
    );
}

export default RowPost;
