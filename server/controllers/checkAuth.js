let checkAuth = passport.authenticate('jwt', { session: false })

module.exports = checkAuth;