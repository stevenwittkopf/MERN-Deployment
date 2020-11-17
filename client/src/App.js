import './App.css';
import React from "react";
import {Router} from "@reach/router";
import CreatePetForm from "./components/createPetForm";
import EditPetForm from "./components/editPetForm";
import PetDetails from "./components/petDetails";
import PetTable from "./components/petTable";

function App() {
  return (
    <div className="App">
      <Router>
        <PetTable path="/"/>
        <CreatePetForm path="/pets/new"/>
        <PetDetails path="/pets/:id/"/>
        <EditPetForm path="/pets/:id/edit/"/>
      </Router>
    </div>
  );
}

export default App;
