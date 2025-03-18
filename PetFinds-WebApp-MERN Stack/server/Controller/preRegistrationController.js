const PreRegistration = require('../Model/PreRegistration');
const sgMail = require('@sendgrid/mail');

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Pre-register a pet
const preRegisterPet = async (req, res) => {
  try {
    const { petType, breed, email } = req.body;

    // Save pre-registration to the database
    const preRegistration = await PreRegistration.create({ petType, breed, email });

    res.status(201).json({ message: 'Pre-registration successful', preRegistration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPreRegistrations = async (req, res) => {
  try {
    const preRegistrations = await PreRegistration.find().sort({ createdAt: -1 }); // Sort by latest first
    res.status(200).json(preRegistrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Notify users when a pet becomes available
const notifyUsers = async (petType, breed) => {
  try {
    // Find all pre-registrations for the pet type and breed
    const preRegistrations = await PreRegistration.find({ petType, breed, notified: false });

    // Send email to each user using SendGrid
    for (const preRegistration of preRegistrations) {
      const msg = {
        to: preRegistration.email,
        from: process.env.SENDER_EMAIL, // Your verified sender email
        subject: 'Your Pre-Registered Pet is Available!',
        text: `Good news! A ${petType} of breed ${breed} is now available for adoption. Visit Pawfinds to adopt!`,
        html: `<strong>Good news!</strong> A ${petType} of breed ${breed} is now available for adoption. Visit Pawfinds to adopt!`,
      };

      await sgMail.send(msg);

      // Mark the pre-registration as notified
      preRegistration.notified = true;
      await preRegistration.save();
    }
  } catch (error) {
    console.error('Error notifying users:', error);
  }
};

// New function to handle the /api/notify endpoint
const triggerNotifications = async (req, res) => {
  try {
    const { petType, breed } = req.body;

    // Call the notifyUsers function
    await notifyUsers(petType, breed);

    res.status(200).json({ message: 'Notifications sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePreRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the pre-registration
    const deletedPreRegistration = await PreRegistration.findByIdAndDelete(id);

    if (!deletedPreRegistration) {
      return res.status(404).json({ message: 'Pre-registration not found' });
    }

    res.status(200).json({ message: 'Pre-registration deleted successfully' });
  } catch (error) {
    console.error('Error deleting pre-registration:', error);
    res.status(500).json({ message: 'Failed to delete pre-registration' });
  }
};


module.exports = { preRegisterPet, triggerNotifications, getPreRegistrations, deletePreRegistration  };