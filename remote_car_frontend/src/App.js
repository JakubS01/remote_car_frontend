import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./Login/LogIn";
import Admin from "./Admin/Admin";
import MainMenu from "./MainMenu/Main_menu";
import ChooseCar from "./Choose_car/Choose_car";
import Stream from "./Stream/Stream";
import Settings from "./Stream/Settings/Settings";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
      <Route
          exact
          path="/"
          element={
            <ProtectedRoute protected_route={false} admin_route={false}>
              <MainMenu />
            </ProtectedRoute>
          } />
          <Route
          path="/login"
          element={
            <ProtectedRoute protected_route={false} admin_route={false}>
              <LogIn />
            </ProtectedRoute>
          } />
        <Route
          path="/admin"
          element={
            <ProtectedRoute protected_route={true} admin_route={true}>
              <Admin />
            </ProtectedRoute>
          } />
        <Route
          path="/choose_car"
          element={
            <ProtectedRoute protected_route={true} admin_route={false}>
              <ChooseCar />
            </ProtectedRoute>
          } />
        <Route
          path="/stream"
          element={
            <ProtectedRoute protected_route={true} admin_route={false}>
              <Stream />
            </ProtectedRoute>
          } />
        <Route
          path="/setting"
          element={
            <ProtectedRoute protected_route={true} admin_route={false}>
              <Settings />
            </ProtectedRoute>
          } />
      </Routes>
    </Router>
  );
}

export default App;
