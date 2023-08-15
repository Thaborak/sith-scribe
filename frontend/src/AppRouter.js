import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import NotePage from "./components/NotePage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/notes" element={<NotePage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
