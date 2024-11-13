// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import ToDoList from "./Pages/To-do-List";
import NotFoundPage from "./Pages/NotFound";
import ThemeToggle from "./components/ThemeToggle";
import { Toaster } from "./components/ui/toaster";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="p-4">
          <ThemeToggle />
          <Toaster></Toaster>
        </div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/to-do-list"
            element={
              <ProtectedRoute>
                <ToDoList />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
