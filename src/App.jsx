// import PrivateRoute from "./components/PrivateRoute";


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import FormCreator from "./components/forms/CreateForm";
import FormViewer from "./components/forms/ViewResponses";
import FormResponses from "./components/forms/FormResponses";
import Setting from "./components/auth/Setting";
import FormBuilder from "./components/formbuilder/FormBuilder"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workspace/:id" element={<FormBuilder />} />
        <Route path="/form/view/:id" element={<FormViewer />} />
        <Route path="/form/responses/:id" element={<FormResponses />} />
      </Routes>
    </Router>
  );
};

export default App;





