import React, { createContext, useContext, useState } from "react";
import "./App.css";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import Routes from "./views/Routes";
import ContextComp from "./components/ContextComp";
import ResponsiveAppBar from "./components/Navbar";


function App() {
 
  return (
    <div>
      <header>
        <ContextComp>
          <BrowserRouter>
            <SnackbarProvider />
            
            <div style={{height:"100vh",backgroundImage:"url(doctorWallpaper.jpg)"}}>
           <ResponsiveAppBar/>
            <Routes />
            </div>
          </BrowserRouter>
        </ContextComp>
      </header>
    </div>
  );
}

export default App;
