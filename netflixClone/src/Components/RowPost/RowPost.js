import React, { useEffect, useState } from "react";
import "./RowPost.css";
import axios from "../../axios";
import { API_KEY, imageUrl } from "../constants/constants";
import YouTube from "react-youtube";
import { Documentaries, trending } from "../../urls";

const HandleModal = ({moviesKey, closeModal}) =>{
  const opts = {
    height:500,
    width:1300,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  return(
    <div className="modal">
      <div style={{display: 'flex', justifyContent: 'flex-end', paddingTop:20}}>
        <span onClick={closeModal} class="material-symbols-outlined close">close</span>
      </div>
      <div className="videoContainer" style={{display: 'flex', justifyContent:'center', marginTop:20}}>
        <YouTube videoId={moviesKey} opts={opts} />
      </div>
    </div>
  )
}
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

    
  const handleMovie = (id) => {
    console.log(id);
      axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(res=>{
        if(res.data.results.length !== 0){
          setMovieId(res.data.results[0].key);
        }
      }).catch(err=>{
        console.log('error occured');
      })
    };
    
    const handlModal = (obj) => {
      handleMovie(obj.id)
      document.body.style.overflow = 'hidden'; // hiding the scroll home scrollbar from the modal component
      setModal(!modal)
    }
    const closeModal = () => {
      document.body.style.overflow = 'scroll'; // enable the home scroll
      setModal(!modal)
    }
    console.log('modal-->',modal);
    return (
      <div>
        {modal?
          <div className="modalBackground">
            <HandleModal closeModal={closeModal} moviesKey={moviesKey} />
          </div>
          :
          <>
          <h2 id="title">{props.title}</h2>
          <div className="row">
            <div className="posters">
              {movies.map((obj) => (
                <div style={{flexDirection:'column'}}>
                  {obj.backdrop_path? 
                  <>
                  <img
                    onClick={() => handlModal(obj)} 
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
      </div>
    );
}

export default RowPost;
