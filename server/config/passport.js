var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/userModel");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET_KEY;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ _id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "411862148314-lvdql6ef6tdg3ke99ocd7tfbbsk3dkbi.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/api/user/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
        };
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            done(null, user);
          } else {
            let nonGoogleUser = await User.findOne({
              email: profile.emails[0].value,
            });
            if (nonGoogleUser) {
              nonGoogleUser.googleId = profile.id;
              await nonGoogleUser.save();
            } else {
              user = await User.create(newUser);
              done(null, user);
            }
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
};
