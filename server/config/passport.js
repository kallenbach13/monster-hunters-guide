const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const { cartsService, usersService } = require('../services')
const isProduction = process.env.NODE_ENV === 'production'

passport.use(
    'login',
    new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        const user = await usersService.fetchUserByEmail(email);
        if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
        }

        if (!user.pwd_hash) {
          return done(null, false, { message: 'This email address is associated with a Google Login. Try Login with Google.'})
        }

        const match = await bcrypt.compare(password, user.pwd_hash)

        if (!match) {
        return done(null, false, { message: 'Incorrect email or password.' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
}))