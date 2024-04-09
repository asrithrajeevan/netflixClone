import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./Components/NavBar/NavBar.css";
import "./Components/NavBar/App.css";
import Banner from "./Components/Banner/Banner";
import "./Components/Banner/Banner.css";
import RowPost from "./Components/RowPost/RowPost.js";
import { originals } from "./urls.js";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Banner />
            <RowPost url = {originals} title={"Netflix Originals"} />
            <RowPost title={"Action"} isSmaller={true} />
        </div>
    );
}

export default App;
