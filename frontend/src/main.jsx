import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./store";

import App from "./App.jsx";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrapping the entire application in StrictMode for additional development checks
  <React.StrictMode>
    {/* Providing the Redux store to the entire application using the Provider */}
    <Provider store={store}>
      {/* The main application component */}
      <App />
    </Provider>
  </React.StrictMode>
);
