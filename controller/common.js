const Admin = require("../modals/admin");
const JobSeeker = require("../modals/JobSeeker");
const Question = require("../modals/question");
const Answer = require("../modals/answer");
const JobSeekerCredential = require("../modals/JobSeekerCredential");
const ResultsSchema = require("../modals/results");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var CryptoJS = require("crypto-js");
const XLSX = require('xlsx');
const accessTokenSecret = "my_secrect_key";
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const csv = require('csv-parser');
const crptoKey = "secret_key_123"
//const saltRounds = 10;
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
FOR ADD SINGLE QUESTION
**/
async function addSingleQuestion(req, res) {
	try {
		let savedUser;
		const question = new Question({
			question_id: uuidv4(),
			"difficulty": req.body.difficulty,
			"category": req.body.category,
			"isMutipleSelection": req.body.isMutipleSelection,
			"question_content": req.body.question_content,
			"ans1": req.body.ans1,
			"ans2": req.body.ans2,
			"ans3": req.body.ans3,
			"ans4": req.body.ans4
		});
		savedUser = await question.save();
		const answer = new Answer({
			question_id: savedUser.question_id,
			correctAnswer: req.body.correctAnswer,
		})
		savedUser = await answer.save();
		if (savedUser) {
			res.json({
				status: true,
				data: savedUser,
			});
		} else {
			res.json({
				msg: "Something is wrong",
				status: false
			})
		}

	} catch (err) {
		res.json({
			message: err,
		});
	}
}
/**
GET QUESTION DETAILS
**/
async function getQuestion(req, res) {
	try {
		let question_id = req.params.id;
		let getdifficultyData = req.query.difficulty;
		let getData;
		if (question_id) {
			getData = await Question.find({
				question_id: question_id
			});
		} else if (getdifficultyData) {
			getData = await Question.find({
				difficulty: getdifficultyData
			});
		} else {
			getData = await Question.find();
		}
		if (getData.length) {
			res.json({
				status: true,
				data: getData
			})
		} else {
			res.json({
				msg: "Sorry, no result found.",
				status: false,
			})
		}
	} catch (err) {
		res.json({
			message: err
		})
	}
}
/**
FOR UPDATE QUESTION
**/
async function updateQuestion(req, res) {
	try {

		let question_id = req.params.id
		let getPatdata;
		if (question_id) {
			getPatdata = await Question.updateOne({
				question_id: question_id
			}, {
				$set: {
					"difficulty": req.body.difficulty,
					"category": req.body.category,
					"isMutipleSelection": req.body.isMutipleSelection,
					"question_content": req.body.question_content,
					"ans1": req.body.ans1,
					"ans2": req.body.ans2,
					"ans3": req.body.ans3,
					"ans4": req.body.ans4
				}
			});
			getPatdata = await Answer.updateOne({
				question_id: question_id
			}, {
				$set: {
					"correctAnswer": req.body.correctAnswer,
				}
			});
			res.json({
				status: true,
				data: getPatdata
			})
		} else {
			res.json({
				msg: "question_id not exist",
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
DELETE QUESTION
**/
async function deleteQuestion(req, res) {
	try {
		//here add/get the Question id
		let question_id = req.params.id
		let getPatdata;
		if (question_id) {
			getPatdata = await Question.findOneAndDelete({
				question_id: question_id
			});
			if (getPatdata == null) {
				res.json({
					status: false
				})
			} else {
				await Answer.findOneAndDelete({
					question_id: question_id
				});
				res.json({
					status: true,
					data: getPatdata
				})
			}
		} else {
			res.json({
				msg: "question_id not exist",
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
FOR ADD JOB SEEKER
**/
async function addJobSeekerInfo(req, res) {
	try {
		let savedUser;
		const jobSeeker = new JobSeeker({
			job_seeker_id: uuidv4(),
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
		if (savedUser.isQuizRequired === true || savedUser.isQuizRequired === "true") {
			let randomNumber = savedUser.contact ? savedUser.contact * 2 + 4 : savedUser.experience * 12 + 6;
			let password = "Mechlin@_" + randomNumber;
			//To add 2 days to current date
			const jsc = new JobSeekerCredential({
				job_seeker_id: savedUser.job_seeker_id,
				username: savedUser.email,
				password: CryptoJS.AES.encrypt(JSON.stringify(password), crptoKey).toString(),
				expireOn: new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000)),
				isExpired: false
			})
			await jsc.save();

		}
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
		let job_seeker_id = req.params.id
		let getPatdata;
		if (job_seeker_id) {
			getPatdata = await JobSeeker.updateOne({
				job_seeker_id: job_seeker_id
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
				msg: "job_seeker_id not exist",
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

		let job_seeker_id = req.params.id
		let getPatdata;
		if (job_seeker_id) {
			getPatdata = await JobSeeker.findOneAndDelete({
				job_seeker_id: job_seeker_id

			});
			res.json({
				status: true,
				data: getPatdata
			})
		} else {
			res.json({
				msg: "job_seeker_id not exist",
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
		let job_seeker_id = req.params.id;
		let getData;
		if (job_seeker_id) {
			getData = await JobSeeker.find({
				job_seeker_id: job_seeker_id
			});
		} else {
			getData = await JobSeeker.find();
		}
		if (getData) {
			res.json({
				status: true,
				data: getData,
			});
		} else {
			res.json({
				msg: "Something is wrong",
				status: false
			})
		}
	} catch (err) {
		res.json({
			message: err
		})
	}
}
//ADD JOB SEEKER DATA
async function uploadQuestionSheet(req, res) {
	try {
		if (req.files.db_xlsx) {
			let getExcelFileData = req.files.db_xlsx[0];
			if (!getExcelFileData) {
				res.status(400).json({
					status: false,
					message: 'You must provide a valid database file in request.'
				})
				return false;
			}
			let workbook = XLSX.readFile(getExcelFileData.path, { type: 'binary', cellDates: true, dateNF: 'yyyy-dd-mm;@' });
			let xlxsData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
			let jobSeekers = []
			let xlsxData;
			xlxsData.forEach(function (obj) {
				let jobSeeker = {};
				jobSeeker.question_id = uuidv4();
				jobSeeker.question_content = obj.Question_content;
				jobSeeker.ans1 = obj.Ans1;
				jobSeeker.ans2 = obj.Ans2;
				jobSeeker.ans3 = obj.Ans3;
				jobSeeker.ans4 = obj.Ans4;
				jobSeeker.difficulty = obj.Difficulty;
				jobSeeker.category = obj.Category;
				jobSeeker.isMutipleSelection = obj.IsMutipleSelection;
				jobSeeker.correctAnswer = obj.CorrectAnswer;
				jobSeekers.push(jobSeeker)

			})
			xlsxData = await Question.insertMany(jobSeekers);
			await Answer.insertMany(jobSeekers);
			fs.unlinkSync(getExcelFileData.path);
			if (xlsxData.length) {
				res.json({
					data: xlsxData,
					status: true
				})
			} else {
				res.json({
					msg: "Something is wrong",
					status: false
				})
			}
		} else {
			let getCsvFileData = req.files.db_csv[0];
			if (!getCsvFileData) {
				res.status(400).json({
					status: false,
					message: 'You must provide a valid database file in request.'
				})
				return false;
			}
			var jobSeekerCSVdDataArr = [];
			// open uploaded file
			const results = [];

			let csvData;
			fs.createReadStream(getCsvFileData.path)
				.pipe(csv())
				.on('data', (data) =>
					results.push(data)
				).on('end', async () => {

					results.map((obj) => {
						let jobSeekerCSVdData = {};
						jobSeekerCSVdData.question_id = uuidv4();
						jobSeekerCSVdData.question_content = obj.Question_content;
						jobSeekerCSVdData.ans1 = obj.Ans1;
						jobSeekerCSVdData.ans2 = obj.Ans2;
						jobSeekerCSVdData.ans3 = obj.Ans3;
						jobSeekerCSVdData.ans4 = obj.Ans4;
						jobSeekerCSVdData.difficulty = obj.Difficulty;
						jobSeekerCSVdData.category = obj.Category;
						jobSeekerCSVdData.isMutipleSelection = obj.IsMutipleSelection;
						jobSeekerCSVdData.correctAnswer = obj.CorrectAnswer;
						jobSeekerCSVdDataArr.push(jobSeekerCSVdData)
					})
					csvData = await Question.insertMany(jobSeekerCSVdDataArr);
					await Answer.insertMany(jobSeekerCSVdDataArr);
					fs.unlinkSync(getCsvFileData.path);
					if (csvData.length) {
						res.json({
							data: csvData,
							status: true
						})
					} else {
						res.json({
							msg: "Something is wrong",
							status: false
						})
					}
				});
		}
	} catch (err) {
		res.json({
			message: err
		})
	}
}

async function addIsQuizRequiredForJobSeeker(req, res) {
	try {
		console.log(req.body);
		let jsId = req.body.job_seeker_id
		let getPatdata;
		let getJSData;
		if (jsId) {
			getPatdata = await JobSeeker.updateOne({
				job_seeker_id: jsId
			}, {
				$set: {
					"isQuizRequired": true,
				}
			});
			getJSData = await JobSeeker.findOne({
				job_seeker_id: jsId
			}, { "email": 1 });
			//To add 2 days to current date
			const jsc = new JobSeekerCredential({
				job_seeker_id: jsId,
				username: getJSData.email,
				password: "password",
				expireOn: new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000)),
				isExpired: false
			})
			await jsc.save();
			res.json({
				status: true,
				data: getPatdata
			})
		} else {
			res.json({
				msg: "job_seeker_id not exist",
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
FOR ADD JOB SEEKER FINAL RESULT
**/
async function addJobSeekerFinalResult(req, res) {
	try {
		let jsId = req.body.job_seeker_id
		let savedUser;
		let getJSData;
		let total_question;
		let getData = {
			job_seeker_id: jsId,
			totalAttemptedQuestionArr: req.body.totalAttemptedQuestion
		}
		let k = 0;
		let j = 0;
		let wrong_answer = "";
		let correct_answer = "";
		total_question = getData.totalAttemptedQuestionArr.length;
		console.log(getData.totalAttemptedQuestionArr.length);
		for (i = 0; i < getData.totalAttemptedQuestionArr.length; i++) {

			console.log(getData.totalAttemptedQuestionArr[i]);
			getJSData = await Answer.findOne({
				question_id: getData.totalAttemptedQuestionArr[i].question_id
			}, { "correctAnswer": 1 });

			console.log(getJSData);

			if (getJSData.correctAnswer === getData.totalAttemptedQuestionArr[i].attemptedAnswer) {
				let passVal = k++;
				correct_answer = passVal + 1;

			} else {
				let wrongAnswer = j++;
				wrong_answer = wrongAnswer + 1;

			}

		}

		if (jsId) {
			const JSFinalResult = new ResultsSchema({
				job_seeker_id: jsId,
				total_question: total_question,
				wrong_answer: wrong_answer ? wrong_answer : 0,
				correct_answer: correct_answer ? correct_answer : 0
			});
			savedUser = await JSFinalResult.save();
			await JobSeekerCredential.updateOne({
				job_seeker_id: jsId
			}, {
				$set: {
					isExpired: true
				}
			});
			await JobSeekerCredential.updateOne({
				job_seeker_id: jsId
			}, {
				$set: {
					testGiven: true
				}
			});
			res.json({
				status: true,
				data: savedUser,
			});
		} else {
			res.json({
				msg: "job_seeker_id not exist",
				status: false,
			});
		}
	} catch (err) {
		res.json({
			message: err,
		});
	}
}
/**
check Candidate Login Credentials
**/
async function checkCandidateLoginCredentials(req, res) {
	try {
		let resUser;
		let loginInData = {
			job_seeker_id: req.body.job_seeker_id,
			username: req.body.username,
			password: req.body.password
		};
		resUser = await JobSeekerCredential.findOne({
			job_seeker_id: loginInData.job_seeker_id
		});
		if (resUser !== null) {
			var bytes = CryptoJS.AES.decrypt(resUser.password, crptoKey);
			var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			if (loginInData.password == decryptedData && loginInData.username == resUser.username) {
				res.send({
					status: true,
					data: resUser,
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
check Candidate Login Credentials
**/
async function checkCandidateLoginCredentials(req, res) {
	try {
		let resUser;
		let loginInData = {
			job_seeker_id: req.body.job_seeker_id,
			username: req.body.username,
			password: req.body.password
		};
		resUser = await JobSeekerCredential.findOne({
			job_seeker_id: loginInData.job_seeker_id
		});
		if (resUser !== null) {
			// Decrypt
			let bytes = CryptoJS.AES.decrypt(resUser.password, crptoKey);
			let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			console.log(decryptedData);
			if (loginInData.password == decryptedData && loginInData.username == resUser.username) {
				res.send({
					status: true,
					data: resUser,
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
send Quiz Login Credentials Via Email
**/
async function sendQuizLoginCredentialsViaEmail(req, res) {
	try {
		let job_seeker_id = req.body.job_seeker_id
		if (job_seeker_id) {
			let getData;
			getData = await JobSeekerCredential.find({
				job_seeker_id: job_seeker_id
			});
			if (getData.length > 0) {
				let userId = getData[0]._id;
				if (userId) {
					let bytes = CryptoJS.AES.decrypt(getData[0].password, crptoKey);
					let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
					let tokenObj = {
						emailurl: url + 'mechlin_quiz/login/' + userId,
						username: getData[0].username,
						password: decryptedData,
						purpose: "quizLoginJS",
						job_seeker_id, job_seeker_id,
						subject: 'Mechlin | Quiz Login Credential'
					}
					email.sendEmail(tokenObj, res)
				} else {
					res.json({
						msg: "job_seeker_id not exist",
						status: false
					})
				}
			} else {
				res.json({
					msg: "job_seeker_id not exist",
					status: false
				})
			}
		} else {
			res.json({
				msg: "job_seeker_id not exist",
				status: false
			})
		}
	} catch (err) {
		res.json({
			error: err,
			message: 'Internal Server Error'
		});
	}
}


module.exports = {
	sendQuizLoginCredentialsViaEmail,
	addJobSeekerFinalResult,
	updateQuestion,
	checkCandidateLoginCredentials,
	getQuestion,
	addJobSeekerInfo,
	hrLogin,
	deleteJobSeekerInfo,
	addSingleQuestion,
	deleteQuestion,
	uploadQuestionSheet,
	updateJobSeekerInfo,
	getJobSeekerInfo,
	addIsQuizRequiredForJobSeeker
};