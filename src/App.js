// src/App.js

import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Login from "./scenes/loginandregister";
import POSCashierPage from "./scenes/POS";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Optional: Persist authentication state using localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* Conditionally render Sidebar based on authentication */}
          {isAuthenticated && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {/* Conditionally render Topbar based on authentication */}
            {isAuthenticated && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              {/* Public Route */}
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} />
                  )
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/" />
                }
              />
              <Route
                path="/team"
                element={isAuthenticated ? <Team /> : <Navigate to="/" />}
              />
              <Route
                path="/POS"
                element={isAuthenticated ? <POSCashierPage /> : <Navigate to="/" />}
              />
              <Route
                path="/contacts"
                element={
                  isAuthenticated ? <Contacts /> : <Navigate to="/" />
                }
              />
              <Route
                path="/invoices"
                element={
                  isAuthenticated ? <Invoices /> : <Navigate to="/" />
                }
              />
              <Route
                path="/form"
                element={isAuthenticated ? <Form /> : <Navigate to="/" />}
              />
              <Route
                path="/bar"
                element={isAuthenticated ? <Bar /> : <Navigate to="/" />}
              />
              <Route
                path="/pie"
                element={isAuthenticated ? <Pie /> : <Navigate to="/" />}
              />
              <Route
                path="/line"
                element={isAuthenticated ? <Line /> : <Navigate to="/" />}
              />
              <Route
                path="/faq"
                element={isAuthenticated ? <FAQ /> : <Navigate to="/" />}
              />
              <Route
                path="/calendar"
                element={isAuthenticated ? <Calendar /> : <Navigate to="/" />}
              />
              <Route
                path="/geography"
                element={
                  isAuthenticated ? <Geography /> : <Navigate to="/" />
                }
              />
              {/* Catch-all Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
