import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import MyProfile from "./components/MyProfile";
import Layout from "./Layout";

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN & REGISTER WITHOUT HEADER + FOOTER */}
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" /> : <Login onLogin={setCurrentUser} />}
        />

        <Route
          path="/register"
          element={currentUser ? <Navigate to="/" /> : <Register onRegister={setCurrentUser} />}
        />

        {/* HERE WE WRAP ALL PAGES WITH LAYOUT */}
        <Route element={<Layout currentUser={currentUser} logout={logout} />}>

          <Route
            path="/"
            element={currentUser ? (
              <PostList currentUser={currentUser} refreshKey={refreshKey} />
            ) : (
              <Navigate to="/login" />
            )}
          />

          <Route
            path="/create"
            element={<CreatePost currentUser={currentUser} onPostCreated={() => setRefreshKey(prev => prev + 1)} />}
            
          />

          <Route
            path="/profile"
            element={<MyProfile currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
