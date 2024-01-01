import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Random from "./pages/randomNumber";
import Error from "./pages/Error";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Random />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
