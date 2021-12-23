import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { EventsListPage } from "./pages/eventsList"
// import styles from "./index.module.scss";

const App = () => (
  <Router basename="/bundles/royalhackaway-overlay/graphics">
    <Routes>
      <Route path="/eventsList.html" element={<EventsListPage />}/>
    </Routes>
  </Router>
)

export {
  App
}
