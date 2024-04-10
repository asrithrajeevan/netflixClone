import React, { useEffect, useState } from 'react'
import axios  from '../../axios'
import {API_KEY, imageUrl} from '../constants/constants'
const Banner = () => {
  const [movies, setMovies] = useState()
  useEffect(()=>{
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then(res=>{
      if(res.data){
        setMovies(res.data.results[Math.floor(Math.random() * 20)])
      }else{
        console.log('Empty array')
      }
    })
  },[])
  return (
    <div className='banner' style={{backgroundImage: `url(${movies? imageUrl+movies.backdrop_path:''})`}}>
      <div className='content'>
        <h1 className='title'>{movies? movies.name? movies.name : movies.title : ''}</h1>
        <div className='banner_buttons'>
          <button className='button'>Play</button>
          <button className='button'>My list</button>
        </div>
        <h1 className='description'> {movies? movies.overview : ''}</h1>
      </div>
      <div className="fad_bottom"></div>
    </div>
  )
}

export default Banner
