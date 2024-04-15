import React, { useState } from 'react'
import { API_KEY } from './Components/constants/constants';
import axios from 'axios';

const HandleMovieTrailer = (id, setMovieKey) => {
      axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(res=>{
        if(res.data.results.length !== 0){
          setMovieKey(res.data.results[0].key);
        }
  }).catch(err=>{
    console.log('error occured--->',err);
  })
}

export default  HandleMovieTrailer