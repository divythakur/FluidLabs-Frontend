import React from "react";
import "./App.css";
import { SnackbarProvider } from "notistack";
import { BrowserRouter,  } from "react-router-dom";
import Routes from "./views/Routes";
 

function App() {
  return (
    <div>
      <header>
        <BrowserRouter>
          <SnackbarProvider />
          <Routes />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
