import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css'

const Notify = () => {
  const [petType, setPetType] = useState('');
  const [breed, setBreed] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/notify', {
        petType,
        breed,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send notifications.');
    }
  };

  return (
    <section className='post-pet-section'>
      <h2 className="custom-form-heading">Notify Users</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} >
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
        <button className='cta-button' type="submit">Notify Users</button>
      </form>
    </section>
  );
};


export default Notify;