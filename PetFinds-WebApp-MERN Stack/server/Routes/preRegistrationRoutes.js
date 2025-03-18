const express = require('express');
const router = express.Router();
const { preRegisterPet, triggerNotifications, getPreRegistrations, deletePreRegistration } = require('../Controller/preRegistrationController');

router.post('/preregister', preRegisterPet);
router.get('/preregistrations', getPreRegistrations);
router.post('/notify', triggerNotifications);
router.delete('/preregistrations/:id', deletePreRegistration);

module.exports = router;