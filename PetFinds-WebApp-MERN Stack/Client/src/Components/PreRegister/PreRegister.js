import React, { useState } from 'react';
import axios from 'axios';
import adoptPet from "../Services/images/adoptPet.png";
import { Link } from "react-router-dom";

const PreRegister = () => {
  const [petType, setPetType] = useState('');
  const [breed, setBreed] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/preregister', {
        petType,
        breed,
        email,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Pre-registration failed. Please try again.');
    }
  };

  return (
    <section className='post-pet-section'>
      <h2 className="custom-form-heading">Pre-Register for a Pet</h2>
      {message && <p>{message}</p>}
      <img src={adoptPet} alt="Happy Pet" />
      <form onSubmit={handleSubmit}>
        <div className='preregister-input-box'>
          <label>Pet Type:</label>
          <input
            type="text"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            required
          />
        </div>
        <div className='preregister-input-box'>
          <label>Breed:</label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </div>
        <div className='preregister-input-box'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='cta-button'>Pre-Register</button>
      </form>

      <div className="pet-adoption-container">
        <h2 className='custom-form-heading'>Pet Adoption</h2>
        <p>
        Welcome to our pet adoption program! Adopting a pet is a wonderful way
        to bring joy and companionship into your life.
        </p>

        <h3>Benefits of Pet Adoption</h3>
        <ul>
        <li style={{listStyle:"none"}}>Provide a loving home to a pet in need</li>
        </ul>

        <h3>Adoption Process</h3>
        <ul>
        <li style={{listStyle:"none"}}>Fill out an adoption application</li>
        </ul>

      <Link to="/pets">
        <button className="cta-button" style={{margin: "50px"}}>Find Your Perfect Pet</button>
      </Link>
      </div>
    </section>
  );
};

export default PreRegister;