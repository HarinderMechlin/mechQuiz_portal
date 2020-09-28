const Admin = require("../modals/admin");
const JobSeeker = require("../modals/JobSeeker");
//const Doctor = require('../modals/doctor_user');
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const accessTokenSecret = "my_secrect_key";
const saltRounds = 10;
const url = process.env.URL;
const email = require("../utils/email");
/**
GET SIGNIN DATA WITH JWT AUTH
**/
async function hrLogin(req, res) {
	try {
		let resUser;
		let loginInData = {
			user_name: req.body.user_name,
			type: req.body.type,
			email: req.body.email,
			password: req.body.password,
		};
		resUser = await Admin.findOne({
			email: loginInData.email,
		});
		if (resUser !== null) {
			let comPass = await bcrypt.compare(
				loginInData.password,
				resUser.password
			);
			if (comPass) {
				const user = {
					id: resUser._id,
				};
				const token = jwt.sign(user, accessTokenSecret, {
					expiresIn: "20m",
				});
				await Admin.updateOne({
					_id: resUser._id
				}, {
					$set: {
						status: true,
					},
				});
				res.json({
					data: resUser,
					status: true,
					token: token,
				});
			} else {
				res.send({
					status: false,
					msg: "invalid credentials",
				});
			}
		} else {
			res.send({
				status: false,
				msg: "user not exist",
			});
		}
	} catch (err) {
		res.json({
			message: err,
		});
	}
}
/**
FOR ADD JOB SEEKER
**/
async function addJobSeekerInfo(req, res) {
	try {
		console.log("Step-1-", req.body);
		let savedUser;
		const jobSeeker = new JobSeeker({
			name: req.body.name,
			email: req.body.email,
			address: req.body.address,
			contact: req.body.contact,
			profile: req.body.profile,
			experience: req.body.experience,
			duration: req.body.duration,
			isQuizRequired: req.body.isQuizRequired,
			quizMailReceived: req.body.quizMailReceived,
			testGiven: req.body.testGiven,
			resultMailReceived: req.body.resultMailReceived,
			status: req.body.status
		});
		savedUser = await jobSeeker.save();
		res.json({
			status: true,
			data: savedUser,
		});
	} catch (err) {
		res.json({
			message: err,
		});
	}
}
/**
FOR UPDATE  JOB SEEKER
**/
async function updateJobSeekerInfo(req, res) {
	try {

		let userId = req.params.id
		let getPatdata;
		if (userId) {
			getPatdata = await JobSeeker.updateOne({
				_id: userId
			}, {
				$set: {
					name: req.body.name,
					email: req.body.email,
					address: req.body.address,
					contact: req.body.contact,
					profile: req.body.profile,
					experience: req.body.experience,
					duration: req.body.duration,
					isQuizRequired: req.body.isQuizRequired,
					quizMailReceived: req.body.quizMailReceived,
					testGiven: req.body.testGiven,
					resultMailReceived: req.body.resultMailReceived,
					status: req.body.status
				}
			});
			res.json({
				status: true,
				data: getPatdata
			})
		} else {
			res.json({
				status: false
			})
		}
	} catch (err) {
		res.json({
			message: err
		})
	}
}
/**
DELETE JOB SEEKER
**/
async function deleteJobSeekerInfo(req, res) {
	try {

		let userId = req.params.id
		let getPatdata;
		if (userId) {
			getPatdata = await JobSeeker.findOneAndDelete({
				_id: userId

			});
			res.json({
				status: true,
				data: getPatdata
			})
		} else {
			res.json({
				status: false
			})
		}
	} catch (err) {
		res.json({
			message: err
		})
	}
}
/**
GET JOB SEEKER
**/
async function getJobSeekerInfo(req, res) {
	try {
		let userId = req.params.id;
		let getData;
		if (userId) {
			getData = await JobSeeker.find({
				_id: userId
			});

		} else {
			getData = await JobSeeker.find();
		}

		res.json({
			status: true,
			data: getData
		})
	} catch (err) {
		res.json({
			message: err
		})
	}
}
/**
FOR ADD SINGLE QUESTION
**/
async function addSingleQuestion(req, res) {
	try {
		console.log("Step-1-", req.body);
		let savedUser;
		const jobSeeker = new JobSeeker({
			name: req.body.name,
			email: req.body.email,
			address: req.body.address,
			contact: req.body.contact,
			profile: req.body.profile,
			experience: req.body.experience,
			duration: req.body.duration,
			isQuizRequired: req.body.isQuizRequired,
			quizMailReceived: req.body.quizMailReceived,
			testGiven: req.body.testGiven,
			resultMailReceived: req.body.resultMailReceived,
			status: req.body.status
		});
		savedUser = await jobSeeker.save();
		res.json({
			status: true,
			data: savedUser,
		});
	} catch (err) {
		res.json({
			message: err,
		});
	}
}
module.exports = {

	addJobSeekerInfo,
	hrLogin,
	deleteJobSeekerInfo,
  addSingleQuestion,
	// resetPasswordApi,
	// forgotPasswordApi,
	// changePasswordApi,
	updateJobSeekerInfo,
	getJobSeekerInfo,
};