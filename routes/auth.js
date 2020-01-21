
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
    Router
} = require('express');
const User = require('../models/User');
const config = require('config'); 
const {
    check,
    validationResult
} = require('express-validator');
const router = Router();

router.post(
    '/register', [
        check('email', 'The email is incorrect').isEmail(),
        check('password', 'The minimum length of the password is 6 symbols').isLength({
            min: 2
        })
    ],
    async (req, res) => {
        const {
            email,
            password 
        } = req.body

        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Please enter the right data for regestration'
                })
            }
            const { email, password } = req.body;
            const user = await User.findOne({
                email
            })

            if (user) {
                res.status(400).json({ message:'The user is already exist'})
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({
                email,
                password: hashedPassword
            })
            await newUser.save();
            res.status(201).json({
                message: 'The user has been created'
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong, Please try again'
            })
        }
    })


router.post('/login', 
[check('email', 'Enter the correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Please try again'
                })
            }
            const {
                email,
                password
            } = req.body;
           
            const user = await User.findOne({
                email
            });
            if (!user) {
                return res.status(400).json({
                    message: 'The user was not found'
                })

            }
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({message:'The password is incorrect'})
            }
            const token = jwt.sign(
                {
                userId:user.id },
                config.get('secretkey'),
                { expiresIn: '4h'}  
        )
        res.json({token, userId:user.id})
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong, Please try again'
            })
        }
    })

module.exports = router;