const Patient = require('../modals/patient_user');
const Doctor = require('../modals/doctor_user');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const accessTokenSecret = 'my_secrect_key';
const saltRounds = 10;
const url = process.env.URL;
const email = require('../utils/email')
/**
GET SIGNIN DATA WITH JWT AUTH
**/
async function logInApi(req, res) {
    try {
        let resUser;
        let loginInData = {
            email: req.body.email,
            password: req.body.password,
        }
        if (req.body.purpose == "Doctor") {
            resUser = await Doctor.findOne({
                email: loginInData.email
            });
        } else {
            resUser = await Patient.findOne({
                email: loginInData.email
            });
        }
        if (resUser !== null) {

            let comPass = await bcrypt.compare(loginInData.password, resUser.password);
            if (comPass) {
                const user = {
                    id: resUser._id
                }
                const token = jwt.sign(user, accessTokenSecret, {
                    expiresIn: '20m'
                });
                if (req.body.purpose == "Doctor") {
                    await Doctor.updateOne({
                        _id: resUser._id
                    }, {
                        $set: {
                            status: true
                        }
                    });
                    res.json({
                        data: resUser,
                        status: true,
                        token: token
                    })
                } else {
                    await Patient.updateOne({
                        _id: resUser._id
                    }, {
                        $set: {
                            status: true
                        }
                    });

                    res.json({
                        data: resUser,
                        status: true,
                        token: token
                    })
                }
               
            }else{
                res.send({
                    status: false,
                    msg: "invalid credentials"
                })
            }

        } else {
            res.send({
                status: false,
                msg: "user not exist"
            })
        }
    } catch (err) {
        res.json({
            message: err
        })
    }
}
/**
FOR SIGNUP DATA
**/
async function signUpApi(req, res) {
    try {
        console.log("Step-1-",req.body);
        
        let savedUser;
        let password;
        if (req.body.password == req.body.confirmPassword) {
            password = req.body.password;
        } else {
            console.log('coming....');
            res.json({
                status: false,
                msg: "password is not matched"
            })
            return
        }
        if (req.body.purpose == "Doctor") {
            const doctor = new Doctor({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                mobile: req.body.mobile,
                email: req.body.email,
                password: await bcrypt.hash(password, saltRounds),
                cityofpractice: req.body.cityofpractice,
                typeofpractice: req.body.typeofpractice,
                areaofspecialisation: req.body.areaofspecialisation,
                status: req.body.status

            });
            savedUser = await doctor.save();
        } else {
            const patient = new Patient({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                mobile: req.body.mobile,
                dob: req.body.dob,
                email: req.body.email,
                gender: req.body.gender,
                password: await bcrypt.hash(password, saltRounds),
                address: req.body.address,
                city: req.body.city,
                country: req.body.country,
                pincode: req.body.pincode,
                status: req.body.status
            });
            savedUser = await patient.save();
        }
        res.json({
            status: true,
            data: savedUser
        })
    } catch (err) {
        res.json({
            message: err
        })
    }
}
/**
CHECK DUPLICATE EMAIL FOR SIGNUP
**/
async function checkDuplicateEmailApi(req, res) {
    try {
        if (req.body.email) {
            let checkEmail;
            if (req.body.purpose == "Doctor") {

                checkEmail = await Doctor.find({
                    email: req.body.email
                });
            } else {
                checkEmail = await Patient.find({
                    email: req.body.email
                });

            }
            if (checkEmail.length > 0) {
                res.json({
                    status: true
                })
            } else {
                res.json({
                    status: false
                })
            }
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
FORGOT PASSWORD
**/
async function forgotPasswordApi(req, res) {
    try {
        if (req.body.email) {
            let checkEmail;
            if (req.body.purpose == "Doctor") {
                checkEmail = await Doctor.find({
                    email: req.body.email
                });
            } else {
                checkEmail = await Patient.find({
                    email: req.body.email
                });
            }
            if (checkEmail.length > 0) {
                let userId = checkEmail[0]._id;
                if (userId) {
                    let tokenObj = {
                        emailurl: url + 'doc/resetpassword/' + userId,
                        purpose: "forgotPassword",
                        email: checkEmail[0].email,
                        subject: 'Doc | Reset Your Password'
                    }
                    console.log("coming....", tokenObj);
                    email.sendEmail(tokenObj)
                    console.log("email....", email);
                    res.status(200).json({
                        status: true,
                        data: checkEmail
                    });
                    if (req.body.purpose == "Doctor") {
                        await Doctor.updateOne({
                            _id: userId
                        }, {
                            $set: {
                                status: false
                            }
                        });
                    } else {
                        await Patient.updateOne({
                            _id: userId
                        }, {
                            $set: {
                                status: false
                            }
                        });
                    }
                }
            } else {
                res.json({
                    status: false
                })
            }
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

async function getProfileDatabyId(req, res) {
    try {
      
        let savedPost;
        if (req.query.purpose == "Doctor") {
            console.log(req.query);
            if (req.query.id) {
                savedPost = await Doctor.find({
                    _id: req.query.id
                });
            } else {
                savedPost = await Doctor.find();
            }
        } else {
            if (req.query.id) {
                savedPost = await Patient.find({
                    _id: req.query.id
                });

            } else {
                savedPost = await Patient.find();
            }
        }
        res.json({
            status: true,
            data: savedPost
        })
    } catch (err) {
        res.json({
            message: err
        })
    }
}
/**
CHANGE PASSWORD BY ID
**/
async function changePasswordApi(req, res) {
    try {
        let savedPost;
        let changePasswordObj = {
            id: req.body.id,
            changeOldPassword: req.body.changeOldPassword,
            updateNewPassword: req.body.updateNewPassword,
        }
        if (changePasswordObj.id) {

            if (req.body.purpose == "Doctor") {
                savedPost = await Doctor.findById(req.body.id);
                let camparepPassword = await bcrypt.compare(changePasswordObj.changeOldPassword, savedPost.password);
                if (camparepPassword) {
                 await Doctor.updateOne({
                        _id: changePasswordObj.id
                    }, {
                        $set: {
                            password: await bcrypt.hash(changePasswordObj.updateNewPassword, saltRounds)
                        }
                    });
                    res.json({
                        status: true,
                        data: savedPost
                    })
                } else {
                    res.json({
                        status: false
                    })
                }
            } else {
              
                savedPost = await Patient.findById(req.body.id);
                console.log(changePasswordObj.changeOldPassword, "coming...", savedPost.password);
                let camparepPassword = await bcrypt.compare(changePasswordObj.changeOldPassword, savedPost.password);
                console.log("step2...", camparepPassword);
                if (camparepPassword) {
                    await Patient.updateOne({
                        _id: changePasswordObj.id
                    }, {
                        $set: {
                            password: await bcrypt.hash(changePasswordObj.updateNewPassword, saltRounds)
                        }
                    });
                    res.json({
                        status: true,
                        data: savedPost
                    })
                } else {
                    res.json({
                        status: false
                    })
                }
            }
        }
    } catch (err) {
        res.json({
            message: err
        })
    }
}

/**
UPDATE PROFILE OF USER
**/
async function updateProfileApi(req, res) {
    try {
        let getDocdata;
        let userId=req.body.id?req.body.id:req.body._id
        if (req.body.purpose == "Doctor") {
            if (userId) {
                getDocdata = await Doctor.updateOne({
                    _id: userId
                }, {
                    $set: {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        mobile: req.body.mobile,
                        email: req.body.email,
                        cityofpractice: req.body.cityofpractice,
                        typeofpractice: req.body.typeofpractice,
                        areaofspecialisation: req.body.areaofspecialisation,
                    }
                });
                res.json({
                    status: true,
                    data: getDocdata
                })
            } else {
                res.json({
                    status: false
                })
            }
        } else {

            if (userId) {
                console.log('id',userId);
                getPatdata = await Patient.updateOne({
                    _id: userId
                }, {
                    $set: {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        mobile: req.body.mobile,
                        dob: req.body.dob,
                        email: req.body.email,
                        gender: req.body.gender,
                        address: req.body.address,
                        city: req.body.city,
                        country: req.body.country,
                        pincode: req.body.pincode,
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
        }

    } catch (err) {
        res.json({
            message: err
        })
    }
}
/**
RESET PASSWORD
**/

async function resetPasswordApi(req, res) {
    try {
        let getData;
        let resetPasswordObj = {
            password: req.body.password,
            id: req.body.id
        }
        console.log(resetPasswordObj.password, "get rest passwprd data", resetPasswordObj.id);
        if (resetPasswordObj.password && resetPasswordObj.id) {
            if (req.body.purpose == "Doctor") {
                console.log("step-2");
                getData = await Doctor.find({
                    _id: resetPasswordObj.id
                });
                console.log("get rest passwprd data", getData[0]);
                if (getData[0]._id) {
                    await Doctor.updateOne({
                        _id: getData[0]._id
                    }, {
                        $set: {
                            password: await bcrypt.hash(resetPasswordObj.password, saltRounds)
                        }
                    });
                    res.json({
                        status: true,
                        data: getData[0]
                    })
                } else {
                    res.json({
                        status: false
                    })
                }
            } else {
                console.log("step-2");
                getData = await Patient.find({
                    _id: resetPasswordObj.id
                });
                console.log("get rest passwprd data", getData[0]);
                if (getData[0]._id) {
                    await Patient.updateOne({
                        _id: getData[0]._id
                    }, {
                        $set: {
                            password: await bcrypt.hash(resetPasswordObj.password, saltRounds)
                        }
                    });
                    res.json({
                        status: true,
                        data: getData[0]
                    })
                } else {
                    res.json({
                        status: false
                    })
                }
            }
        }
        else {
            res.json({
                status: false
            })
        }
    }
    catch (err) {
        res.json({
            message: err
        })
    }

}


module.exports = {
    signUpApi,
    logInApi,
    checkDuplicateEmailApi,
    resetPasswordApi,
    forgotPasswordApi,
    changePasswordApi,
    updateProfileApi,
    getProfileDatabyId,
};