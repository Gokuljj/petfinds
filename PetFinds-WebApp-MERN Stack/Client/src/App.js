
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Services from "./Components/Services/Services";
import Contact from "./Components/Contact/Contact";
import Pets from "./Components/Pets/Pets";
import AdoptForm from "./Components/AdoptForm/AdoptForm";
import AdminLogin from "./Components/AdminPanel/AdminLogin";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import PreRegister from "./Components/PreRegister/PreRegister";
import Notify from './Components/Notify/Notify';
import "./App.css";

const Layout = ({ children }) => (
  <>
    <Navbar title="PetFinds" />
    {children}
    <Footer title="PetFinds" />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
              <Home />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/" 
          element={
            <Layout>
              <Home description="Ensure you are fully prepared to provide proper care and attention to your pet before welcoming them into your home." />
            </Layout>
          } 
        />
        <Route 
          path="/services" 
          element={
            <Layout>
              <Services />
            </Layout>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <Layout>
              <Contact />
            </Layout>
          } 
        />
        <Route 
          path="/pets" 
          element={
            <Layout>
              <Pets />
            </Layout>
          } 
        />
        <Route 
          path="/adopt-form" 
          element={
            <Layout>
              <AdoptForm />
            </Layout>
          } 
        />
        <Route 
          path="/admin" 
          element={<AdminLogin />} 
        />
        <Route path="/preregister" element={<PreRegister />} />
        <Route path="/notify" element={<Notify />} />
      </Routes>
    </Router>
  );
};

export default App;

