const express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({
	dest: 'uploads'
})
const controller = require("../controller/common");
const JWT = require('../utils/auth');
// Hr/admin 
router.post('/hrLogin', controller.hrLogin);
router.post('/hrRegistration', controller.hrRegistration);
//JobSeeker Deatils
router.post('/addJobSeekerInfo', controller.addJobSeekerInfo);
router.post('/addIsQuizRequiredForJobSeeker', controller.addIsQuizRequiredForJobSeeker);
router.put('/updateJobSeekerInfo/:id', controller.updateJobSeekerInfo);
router.delete('/deleteJobSeekerInfo/:id', controller.deleteJobSeekerInfo);
router.get('/getJobSeekerInfo/:id', controller.getJobSeekerInfo);
router.get('/getJobSeekerInfo', controller.getJobSeekerInfo);
router.post('/checkCandidateResultOutput', controller.checkCandidateResultOutput);
//Question & Answer with xlxs and csv
router.post('/uploadQuestionSheet', upload.fields([{
	name: 'db_xlsx',
	maxCount: 1
}, {
	name: 'db_csv',
	maxCount: 1
}]), controller.uploadQuestionSheet);
router.post('/addSingleQuestion', controller.addSingleQuestion);
router.get('/getQuestion/:id', controller.getQuestion);
router.get('/getQuestion', controller.getQuestion);
router.put('/updateQuestion/:id', controller.updateQuestion);
router.delete('/deleteQuestion/:id', controller.deleteQuestion);
router.get('/getQuizQuestionByExpAndProfile/:id', controller.getQuizQuestionByExpAndProfile);
//Send Quiz Link to candidate - and link expire after submit by candiate --JWT.authenticate,
router.post('/sendQuizLoginCredentialsViaEmail', controller.sendQuizLoginCredentialsViaEmail);
//Before quiz check login-password
router.post('/checkCandidateLoginCredentials', controller.checkCandidateLoginCredentials);
module.exports = router;