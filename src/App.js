import Home from "./pages/Home";
import Login from "./pages/Login";
import List from "./pages/List";
import SingleHotel from "./pages/SingleHotel";
import SingleRoom from "./pages/SingleRoom";
import NewUser from "./pages/NewUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { hotelInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/NewHotel";
import NewRoom from "./pages/NewRoom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="login" element={<Login />} />
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="users">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List columns={userColumns} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewUser inputs={userInputs} title="Add New User" />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="hotels">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List showViewButton={true} columns={hotelColumns} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":hotelId"
                  element={
                    <ProtectedRoute>
                      <SingleHotel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewHotel />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="rooms">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List showViewButton={true} columns={roomColumns} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":roomId"
                  element={
                    <ProtectedRoute>
                      <SingleRoom />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewRoom />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;
