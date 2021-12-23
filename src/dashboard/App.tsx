import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { EventPickerPage } from "./pages/eventPicker"
import { EventsListPage } from "./pages/eventsList"
// import styles from "./index.module.scss";

const App = () => (
  <Router basename="/bundles/royalhackaway-overlay/dashboard">
    <Routes>
      <Route path="/eventsList.html" element={<EventsListPage />}/>
      <Route path="/eventPicker.html" element={<EventPickerPage />}/>
    </Routes>
  </Router>
)

export {
  App
}
