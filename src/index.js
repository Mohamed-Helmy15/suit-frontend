import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Types from "./components/Types";
import NewSuit from "./components/NewSuit";
import Register from "./components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/suits",
    element: window.localStorage.getItem("token") ? <Home /> : <App />,
  },
  {
    path: "/suits/new",
    element: window.localStorage.getItem("token") ? <NewSuit /> : <App />,
  },
  {
    path: "/types",
    element: window.localStorage.getItem("token") ? <Types /> : <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
