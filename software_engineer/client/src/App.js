
import './App.css';
import {Fragment} from "react"

//components

import InputTicket from "./components/InputTicket"
import ListTicket from './components/ListTicket';

function App() {
  return (
    <Fragment>
    <div className="container">
      <InputTicket/>
      <ListTicket/>
      </div>
      
    </Fragment>
    
  );
}

export default App;


