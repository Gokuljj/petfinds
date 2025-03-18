import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const PreRegistrations = () => {
  const [preRegistrations, setPreRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPreRegistration, setSelectedPreRegistration] = useState(null);
  const [preRegistrationDetailsPopup, setPreRegistrationDetailsPopup] = useState(false);
  const [selectedPetType, setSelectedPetType] = useState('');

  // Fetch pre-registrations from the backend
  const fetchPreRegistrations = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/preregistrations');
      setPreRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching pre-registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreRegistrations();
  }, []);

  // Display details of a specific pre-registration
  const displayPreRegistrationDetails = (preRegistration) => {
    setSelectedPreRegistration(preRegistration);
    setPreRegistrationDetailsPopup(true);
  };

  // Close the pre-registration details popup
  const closePreRegistrationDetailsPopup = () => {
    setPreRegistrationDetailsPopup(false);
    setSelectedPreRegistration(null);
  };

  // Handle filter change
  const handlePetTypeChange = (event) => {
    setSelectedPetType(event.target.value);
  };

  // Send notification to a pre-registered user
  const sendNotification = async (preRegistrationId) => {
    try {
      const response = await axios.post('http://localhost:4000/api/notify', {
        petType: selectedPreRegistration.petType,
        breed: selectedPreRegistration.breed,
      });

      if (response.status === 200) {
        alert('Notification sent successfully!');
        // Update the pre-registration status in the UI
        const updatedPreRegistrations = preRegistrations.map((pr) =>
          pr._id === preRegistrationId ? { ...pr, notified: true } : pr
        );
        setPreRegistrations(updatedPreRegistrations);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again.');
    }
  };

  // Delete a pre-registration
  const deletePreRegistration = async (preRegistrationId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/preregistrations/${preRegistrationId}`);
      if (response.status === 200) {
        alert('Pre-registration deleted successfully!');
        // Remove the deleted pre-registration from the UI
        const updatedPreRegistrations = preRegistrations.filter((pr) => pr._id !== preRegistrationId);
        setPreRegistrations(updatedPreRegistrations);
      }
    } catch (error) {
      console.error('Error deleting pre-registration:', error);
      alert('Failed to delete pre-registration. Please try again.');
    }
  };

  // Filter pre-registrations based on selected pet type
  const filteredPreRegistrations = selectedPetType
    ? preRegistrations.filter((pr) => pr.petType === selectedPetType)
    : preRegistrations;

  return (
    <div>
      {/* Dropdown filter for pet type */}
      <div className="dropdown-container" style={{ textAlign: 'right', marginBottom: '20px' }}>
        <select className='req-filter-selection' onChange={handlePetTypeChange} value={selectedPetType}>
          <option value="">All Pre-Registrations</option>
          {[...new Set(preRegistrations.map((pr) => pr.petType))].map((petType) => (
            <option key={petType} value={petType}>
              {petType}
            </option>
          ))}
        </select>
      </div>

      {/* Display pre-registrations */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredPreRegistrations.length > 0 ? (
        filteredPreRegistrations.map((pr) => (
          <div key={pr._id} className='form-container'>
            <div>
              <h2 className='clickable-pet-name' onClick={() => displayPreRegistrationDetails(pr)}>
                {pr.petType} - {pr.breed}
              </h2>
            </div>
            <div className='form-child-container'>
              <p><b>Email:</b> {pr.email}</p>
              <p><b>Notified:</b> {pr.notified ? 'Yes' : 'No'}</p>
              {/* Delete Button */}
              <button 
                onClick={() => deletePreRegistration(pr._id)}
                className='delete-btn'
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No pre-registrations available.</p>
      )}

      {/* Pre-registration details popup */}
      {preRegistrationDetailsPopup && selectedPreRegistration && (
        <div className='popup'>
          <div className='popup-content'>
            <div className='pet-view-card'>
              <div className='pet-card-details'>
                <h2>{selectedPreRegistration.petType} - {selectedPreRegistration.breed}</h2>
                <p><b>Email:</b> {selectedPreRegistration.email}</p>
                <p><b>Notified:</b> {selectedPreRegistration.notified ? 'Yes' : 'No'}</p>
              </div>
            </div>
            {/* Send Notification Button */}
            <button
              onClick={() => sendNotification(selectedPreRegistration._id)}
              className='send-notification-btn'
              disabled={selectedPreRegistration.notified} // Disable if already notified
            >
              {selectedPreRegistration.notified ? 'Notification Sent' : 'Send Notification'}
            </button>
            <button onClick={closePreRegistrationDetailsPopup} className='close-btn'>
              Close <i className="fa fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreRegistrations;