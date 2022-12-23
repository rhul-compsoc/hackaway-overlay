import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

import "./scss/main.scss";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/900.css";
import "@fontsource/roboto";

const entry = document.getElementById("entry");

ReactDOM.render(<App />, entry);
