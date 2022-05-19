import React from "react";
import "./App.css";
import Cribs from "./Cribs";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container-fluid mt-3">
        <Cribs />
      </div>
    </>
  );
}

export default App;
