const LocalStrategy = require('passport-local').Strategy

const User = require('../model/user')

module.exports = function(passport) {

	////////////////////////////////////////////////////////////
	// PASSPORT SESSION SETUP
	// required in order to keep persistent sessions
	// Passport also needs ability to serialize and deserialize users from session
	////////////////////////////////////////////////////////////

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user._id)
	})

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user)
		})
	})
	
	////////////////////////////////////////////////////////////
	// LOCAL SIGNUP
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'
	////////////////////////////////////////////////////////////

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'name',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, name, password, done) {
		// find a user whose username is the same as the forms username
		// we are checking to see if the user trying to login already exists
		User.findOne({ 'name' :  name }, function(err, user) {
			// if there are any errors, return the error
			if (err) {
				console.log(err)
				return done(err)
			}

			// check to see if theres already a user with that username
			if (user) {
                console.log('Signup attempt, username in use')
                return done(null, false, null)
                
			} else {

				console.log('passport-local-signup-function-findone-else')
				// if there is no user with that username
				// create the user
				var newUser = new User()

				// set the user's local credentials
				newUser.local.username = username
				newUser.local.password = newUser.generateHash(password) // use the generateHash function in our user model

				// save the user
				newUser.save()
				    done(null, newUser)	
				}

		})

	}))

	////////////////////////////////////////////////////////////
	// LOCAL LOGIN
	////////////////////////////////////////////////////////////

	passport.use('local-login', new LocalStrategy({

		usernameField : 'name',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, name, password, done) {
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
		User.findOne({ 'name' :  name }, (err, user) => {
			// if there are any errors, return the error before anything else
			if (err) {
				console.error(err)
				return done(err)
			}
			// if no user is found, return the message
            if (!user) {
				return done(null, false, { message: 'Unknown user ' + name })
			}
			// if the user is found but the password is wrong
            if (!user.validPassword(password)) {
				return done(null, false, { message: 'Password doesn\'t match for user ' + name })
			}
			// all is well, return successful user
			return done(null, user)
		})
	}))
}