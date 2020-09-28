const express = require('express');
var router = express.Router();
const controller = require("../controller/common");
const JWT = require('../utils/auth');
const email = require('../utils/email');

// Hr/admin deatils
router.post('/hrLogin', controller.hrLogin);
//Candidate deatils
// router.post('/addCandidateInfo',  JWT.authenticate,controller.addCandidateInfo);
// router.put('/updateCandidateInfo/:id',   JWT.authenticate,controller.updateCandidateInfo);
// router.delete('/deleteCandidateInfo/:id',  JWT.authenticate, controller.deleteCandidateInfo);
// router.get('/getCandidateInfo/:id',   JWT.authenticate,controller.getCandidateInfo);
// router.get('/getCandidateInfo',   JWT.authenticate,controller.getCandidateInfo);
// //Question & Answer with xlxs and csv
// router.post('/uploadQuestionSheet',  JWT.authenticate, controller.uploadQuestionSheet);
// router.post('/addSingleQuestion',  JWT.authenticate, controller.addSingleQuestion);
// router.get('/getQuestion/:id',   JWT.authenticate,controller.getQuestion);
// router.get('/getQuestion',   JWT.authenticate, controller.getQuestion);
// router.put('/updateQuestion/:id',  JWT.authenticate, controller.updateQuestion);
// router.delete('/deleteQuestion/:id',  JWT.authenticate, controller.deleteQuestion);
// //Send Quiz Link to candidate - and link expire after submit by candiate
// router.post('/sendQuizLinkToCandidatebyId',   JWT.authenticate, controller.sendQuizLinkToCandidatebyId);
// //Before quiz check login-password
// router.post('/checkCandidateLoginCredentials', controller.checkCandidateLoginCredentials);
// //After submit test show result and link expire and show the output on the hr dashboard
// router.post('/checkCandidateResultOutput', controller.checkCandidateResultOutput);


// router.post('/signUp', controller.signUpApi);
// router.get('/checkDuplicateEmail', controller.checkDuplicateEmailApi);
// router.post('/forgotPassword', controller.forgotPasswordApi);
// router.post('/resetPassword', controller.resetPasswordApi);
// router.post('/changePassword',  JWT.authenticate, controller.changePasswordApi);
// router.get('/getProfileData', controller.getProfileDatabyId);
// router.put('/updateProfile', JWT.authenticate,  controller.updateProfileApi);

module.exports = router;