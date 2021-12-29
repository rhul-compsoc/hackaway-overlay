import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { EventPickerPage } from "./pages/eventPicker";
import { EventsListPage } from "./pages/eventsList";
import { SidePopupPage } from "./pages/sidePopup";
import { SpotifyPage } from "./pages/spotify";
import { TimerPage } from "./pages/timer";
// import styles from "./index.module.scss";

const App = () => (
  <Router basename="/bundles/royalhackaway-overlay/dashboard">
    <Routes>
      <Route path="/eventsList.html" element={<EventsListPage />} />
      <Route path="/eventPicker.html" element={<EventPickerPage />} />
      <Route path="/timer.html" element={<TimerPage />} />
      <Route path="/spotify.html" element={<SpotifyPage />} />
      <Route path="/sidePopup.html" element={<SidePopupPage />} />
    </Routes>
  </Router>
);

export { App };
