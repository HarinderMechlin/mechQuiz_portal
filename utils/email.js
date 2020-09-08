const nodemailer = require("nodemailer");


const emailSender = "abhishekcdc2020@gmail.com";
const sendEmail = async function (data, res) {
    try {
        switch (data.purpose) {
            case 'forgotPassword':
                let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>TotalHousehold PRO</title>
            </head>
            <style type="text/css">
                /* FONTS */
                @media screen {
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 400;
                        src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 700;
                        src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 400;
                        src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 700;
                        src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                    }
                }
                /* CLIENT-SPECIFIC STYLES */
                body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
                img { -ms-interpolation-mode: bicubic; }
        
                /* RESET STYLES */
                img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
                table { border-collapse: collapse !important; }
                body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
        
                /* iOS BLUE LINKS */
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }
        
                /* ANDROID CENTER FIX */
                div[style*="margin: 16px 0;"] { margin: 0 !important; }
            </style>
            </head>
            <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <!-- LOGO -->
                    <tr>
                        <td bgcolor="#efe7e3" align="center">
                            <table border="0" cellpadding="0" cellspacing="0" width="480" >
                                <tr>
                                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                                    <!--     // <a href="#" target="_blank">
                                        //     <img  src="" width="150" style="display: block;  font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
                                        // </a> -->
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- HERO -->
                    <tr>
                    <td bgcolor="#efe7e3" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="480" >
                            <tr>
                                <td bgcolor="#ff4213" align="left" valign="top" style="padding: 20px 30px 20px 30px; border-radius: 4px 4px 0px 0px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 20px;">
                                    <h1 style="font-size: 18px; font-weight: 700; margin: 0; color: #fff; line-height:22px; letter-spacing: 1px;">Reset password.</h1>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- COPY BLOCK -->
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px; border-radius: 0px 0px 4px 4px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="480" >
                            <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 10px 30px 10px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 20px;" >
                                    <p style="margin-bottom: 10px;">You recently requested to reset your password.<br>Click the button below to reset it.</p>
                                    <p style="margin: 0; font-style: italic; color: #5599ff;">(If you did not request a password reset,please ignore this email or reply to let us know.)</p>
                                </td>
                            </tr>
                            <!-- BULLETPROOF BUTTON -->
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="left" style="padding: 10px 30px 30px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" bgcolor="#ff4213" style="border-radius: 4px;"><a href="${data.emailurl}" target="_blank" style="font-size:16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 10px 15px; display: inline-block;">Reset Password</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                    <!-- SUPPORT CALLOUT -->
                    <tr>
                        <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="480" >
                                <!-- HEADLINE -->
                                <tr>
                                    <td bgcolor="#fff9f5" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                                        <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                                        <p style="margin: 0;"><a href="" target="_blank" style="color: #ff4213;">We’re here, ready to talk</a></p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- FOOTER -->
                    <tr>
                        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="480" >
        
                                <!-- PERMISSION REMINDER -->
                                <tr>
                                    <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" ><br>
                                        <p style="margin: 0;">If you have any problem, please contact us.</a>.</p>
                                    </td>
                                </tr>
        
                                <!-- ADDRESS -->
                                <tr>
                                    <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                                        <p style="margin: 0;">Copyright © TotalHousehold PRO 2020.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
        
            </body>
            </html>`;

                // Only needed if you don't have a real mail account for testing
                let testAccount = await nodemailer.createTestAccount();

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: testAccount.user, // generated ethereal user
                        pass: testAccount.pass, // generated ethereal password
                    },
                });
                let info = await transporter.sendMail({
                    to: emailSender,
                    from: emailSender,
                    subject: data.subject,
                    html: html
                });
                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
    } catch (error) {
        console.log("email-sending-error", error);
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

module.exports = {
    sendEmail
}