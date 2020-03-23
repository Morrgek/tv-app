import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import 'core-js/es/set';
import React from 'react';
import './App.scss';
import Tvset from "./componets/TVset/Tvset";

//import '../node_modules/font-awesome/css/font-awesome.min.css'

function App() {
  return (
    <Tvset/>
  );
}

export default App;
