const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/User.js')

const { validationResult } = require('express-validator');

module.exports = {
	//@route     POST /users/signup
	//@decription  create new user
	//@access      Public
	signup: async (req, res) => {
		const { username, email, password } = req.body
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.array().map(error => error.msg)[0] });
		}
		try {
			let user = await User.findOne({ email })
			if (user) {
				return res.status(400).json({ msg: 'User already exists' })
			}
			user = new User({
				username,
				email,
				password
			})
			await user.save()
			const token = jwt.sign({
				sub: user.id
			}, process.env.JWT_SECRET,
				{ expiresIn: '15m' })
			res.status(200).json({
				token: token
			})

		} catch (err) {
			res.status(500).json({
				msg: error.msg
			})
		}
	},
	getUser: (req, res) => {
		//console.log(req.user)
		User.findOne({ email: req.user.email })
			.select('-password')
			.populate('paymentPlan')
			.then(user => {
				res.status(200).json({ user })
			})
			.catch(err => {
				res.status(500).json({ error: err.message })
			})
	},
	//@route     POST /users/signin
	//@decription  login user
	//@access      Public
	signin: (req, res) => {
		const { email, password } = req.body
		//we receive the email and password from the client
		User.findOne({ email })
			.then(user => {
				//if we find a user with that email,we now compare if the passwords match
				if (user) {
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) {
							res.status(400).json({ msg: 'User not found' })
						}
						if (isMatch) {
							const token = jwt.sign({
								sub: user.id
							}, process.env.JWT_SECRET,
								{ expiresIn: '1d' })
							res.status(200).json({
								user: user,
								token: token
							})
						} else {
							res.status(400).json({
								msg: 'User not found,Please try again'
							})
						}
					})
				}
			}).catch(err => {
				res.status(400).json({
					msg: err.message
				})
			})
	},
}