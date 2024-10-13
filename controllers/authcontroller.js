const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Signup 

const signUp = async(req,res) => {
    let {firstName,lastName,email,password} = req.body

    try{
        const existUser = await User.findOne({email});
        if(existUser) return res.send(400).json({msg : 'User already exists'});

        console.log("user not Exist");

        bcrypt.genSalt(10, async (err, salt) => {
            if (err) {
                console.error('Error generating salt:', err);
                return; // or handle the error as needed
            }
        
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return; // or handle the error as needed
                }
        
                try {
                    const registerUser = await User.create({
                        firstName,
                        lastName,
                        email,
                        password: hash
                    });
                    console.log('User registered successfully:', registerUser);
                    
                } catch (error) {
                    console.error('Error creating user:', error);
                    
                }
            });
        });
     const payload = {
        user: { id: User.id }
    };

    jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 }, 
    (err, token) => {
        if (err) throw err;
        res.json({ token });
    }); 
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}

const login = async(req,res)=>{
    let {email,password} =req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg : 'Invalid Credential'});

        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = {
            user: { id: user.id }
        };
    
        jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 }, 
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        }); 

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}
module.exports = { signUp , login};