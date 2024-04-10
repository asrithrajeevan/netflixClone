import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./Components/NavBar/NavBar.css";
import "./Components/NavBar/App.css";
import Banner from "./Components/Banner/Banner";
import "./Components/Banner/Banner.css";
import RowPost from "./Components/RowPost/RowPost.js";
import { action, originals, trending, ComedyMovies, HorrorMovies, RomanceMovie, Documentaries } from "./urls.js";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Banner />
            <RowPost  url = {originals} title={"Netflix Originals"} />
            <RowPost isSmaller url = {trending} title={"Trending Now"} />
            <RowPost isSmaller url = {action} title={"Action"} />
            <RowPost isSmaller url = {ComedyMovies} title={"Comedy Movies"} />
            <RowPost isSmaller url = {HorrorMovies} title={"Horror Movies"} />
            <RowPost isSmaller url = {RomanceMovie} title={"Romance Movie"} />
            <RowPost isSmaller url = {Documentaries} title={"Documentaries"} />
        </div>
    );
}

export default App;
