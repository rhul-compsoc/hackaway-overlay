import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { EventPickerPage } from "./pages/eventPicker";
import { EventsListPage } from "./pages/eventsList";
import { LivePage } from "./pages/live";
import { SidePopupPage } from "./pages/sidePopup";
import { SpotifyPage } from "./pages/spotify";
import { TimerPage } from "./pages/timer";
import Twitter from "./pages/twitter";
// import styles from "./index.module.scss";

const App = () => (
  <Router basename="/bundles/royalhackaway-overlay/dashboard">
    <Routes>
      <Route path="/eventsList.html" element={<EventsListPage />} />
      <Route path="/eventPicker.html" element={<EventPickerPage />} />
      <Route path="/timer.html" element={<TimerPage />} />
      <Route path="/spotify.html" element={<SpotifyPage />} />
      <Route path="/sidePopup.html" element={<SidePopupPage />} />
      <Route path="/live.html" element={<LivePage />} />
      <Route path="/twitter.html" element={<Twitter />} />
    </Routes>
  </Router>
);

export { App };
