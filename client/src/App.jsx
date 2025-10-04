import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./Pages/Navbar";
import LandingPage from "./Pages/LandingPage";
import CreateSession from "./Pages/CreateSession";
import MemberForm from "./Pages/MemberForm";
import StartHost from "./Pages/StartHost";


function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-session" element={<CreateSession />} />
        <Route path="/join" element={<MemberForm />} />
        <Route path="/start" element={<StartHost />} />
      </Routes>
    </>
  );
}

export default App;
