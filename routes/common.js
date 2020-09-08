const express = require('express');
var router = express.Router();
const controller = require("../controller/common");
const JWT = require('../utils/auth')

router.post('/login', controller.logInApi);
router.post('/signUp', controller.signUpApi);
router.get('/checkDuplicateEmail', controller.checkDuplicateEmailApi);
router.post('/forgotPassword', controller.forgotPasswordApi);
router.post('/resetPassword', controller.resetPasswordApi);
router.post('/changePassword',  JWT.authenticate, controller.changePasswordApi);
router.get('/getProfileData', JWT.authenticate, controller.getProfileDatabyId);
router.put('/updateProfile', JWT.authenticate,  controller.updateProfileApi);

module.exports = router;