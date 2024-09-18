const jwt = require('jsonwebtoken');
const config = require ('dotenv').config;

config();

// app need security by giving access where the auth need
// office will register => give an id => token (json web token, jwt)
// resources will access with token

// middleware is a function that runs before the request is processed
// if login, must has token, standard auth, send back the token to us

// request and response object
const auth = async (req, res, next) => {
    try {
        const jwtSecret = process.env.JWT_SECRET; // use secret to create the token
        const token = req.headers['authorization'];
        const splittedToken = token?.split(' '); // delimiter => ' ' | splitting by space
		const bearer = splittedToken?.[0]; 
		const jwtToken = splittedToken?.[1];

        if (bearer !== 'Bearer') { // Other than this => 'Bearer' 
            const err = new Error('unauthorised user');
            err.statusCode = 401;
            throw err;
        }
        
        const decodedToken = await jwt.verify(jwtToken, jwtSecret);
        const userId = decodedToken.id; // if expired
        req.id = userId;

        next();
    } catch (error) {
        const message = error?.message;
        const statusCode = error?.statusCode;
        res.status(statusCode ?? 400).json({
            message,
            succeeded: false,
            data: null,
        });
    }
};

module.exports = { auth }; 