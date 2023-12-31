import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import NotePage from "./pages/NotePage";

function AppRouter() {
  return (
    // Wrap your App component with BrowserRouter and routes
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/notes" element={<NotePage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
