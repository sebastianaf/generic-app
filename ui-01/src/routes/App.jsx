import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboart from "../pages/Dashboart";
import Page404 from "../pages/Page404";
import Practice from "../pages/Practice";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path={`/login`} element={<Login />} />
      <Route exact path={`/practice`} element={<Practice />} />
      <Route exact path={`/dashboart`} element={<Dashboart />} />

      {/* Route corrections */}
      <Route exact path={`/`} element={<Navigate to={`/dashboart`} />} />
      <Route path={`*`} element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);

export default App;
