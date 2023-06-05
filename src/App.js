import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./Login/LogIn";
import Admin from "./Admin/Admin";
import MainMenu from "./MainMenu/Main_menu";
import ChooseCar from "./Choose_car/Choose_car";
import Stream from "./Stream/Stream";
import Settings from "./Stream/Settings/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainMenu />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/choose_car" element={<ChooseCar />} />
        <Route path="/stream" element={<Stream />}/>
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
