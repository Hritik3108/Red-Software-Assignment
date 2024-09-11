const { register, login } = require('../controllers/auth.controller');
const { isAuthenticatedUser, authorizeAdminRole } = require('../middleware/auth')

const express = require('express');
const router =  express.Router();

router.route('/api/register').post(register);
router.route('/api/login').post(login);

module.exports = router;