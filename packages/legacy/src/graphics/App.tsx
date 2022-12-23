import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { EventsListPage } from "./pages/eventsList";
import { TimerPage } from "./pages/timer";
import { LogoMark } from "./pages/logoMark";
import { SpotifyPage } from "./pages/spotify";
import { SidePopupPage } from "./pages/sidePopup";
import { AllEventsSlider } from "./pages/AllEventsSlider";
import { CornerSponsors } from "./pages/CornerSponsors";
// import styles from "./index.module.scss";

const App = () => (
  <Router basename="/bundles/royalhackaway-overlay/graphics">
    <Routes>
      <Route path="/eventsList.html" element={<EventsListPage />} />
      <Route path="/allEventsSlider.html" element={<AllEventsSlider />} />
      <Route path="/cornerSponsors.html" element={<CornerSponsors />} />
      <Route path="/logoMark.html" element={<LogoMark />} />
      <Route path="/timer.html" element={<TimerPage />} />
      <Route path="/spotify.html" element={<SpotifyPage />} />
      <Route path="/sidePopup.html" element={<SidePopupPage />} />
    </Routes>
  </Router>
);

export { App };
