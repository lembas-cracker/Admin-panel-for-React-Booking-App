import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContextProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SidebarProvider>
        <DarkModeContextProvider>
          <App />
        </DarkModeContextProvider>
      </SidebarProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
