const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


const ForgotPassword = async(req,res)=>{
    let { email} =req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(400).json({msg : "User does not exits"});
         
        const token =process.env.jwtSecret + existingUser.password;
        const jwttoken = jwt.sign({email:existingUser.email, id: existingUser._id},token,{expiresIn: 3600 });
        console.log(jwttoken);
        const link =`http://localhost:3000/resetpwd/${existingUser._id}/${jwttoken}` ;
        console.log(link);
         // Set up Nodemailer transporter
         const transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        // Email options
        const mailOptions = {
            from: "jobsyncportal27@gmail.com",
            to: email,
            subject: 'Password Reset Link',
            html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ msg: "Password reset link sent to your email!" });
    } catch (error) {
        console.error('error sending link',error);
    }
}

const ResetPassword = async(req,res) =>{
const {id,jwttoken} = req.params;
const{password} =req.body;

const existingUser = await User.findOne({_id : id});
if(!existingUser) return res.status(400).json({msg : "user doesn't exist"});
try {
    const token =process.env.jwtSecret + existingUser.password;
    const decoded = jwt.verify(jwttoken,token);
    console.log(decoded);
    if (decoded.id !== id) return res.status(400).json({ msg: 'Invalid token' });

        const user = await User.findById(id);
        if (!user) return res.status(400).json({ msg: 'User does not exist' });
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Update the user's password in the database
      existingUser.password = hashedPassword;
      await existingUser.save();
  
      res.status(200).json({ msg: "Password reset successfully!" });
    } 
    catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ msg: "Server error" });
    }
}

module.exports= {ForgotPassword, ResetPassword}