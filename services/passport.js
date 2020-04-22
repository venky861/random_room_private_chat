const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const keys = require("../config/keys.json")
const mongoose = require("mongoose")
const User = mongoose.model("google")
const jwt = require("jsonwebtoken")

passport.serializeUser((user, done) => {
  console.log("serialize user")
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id)
  console.log("deserialize user")
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      //  console.log(profile)
      const user = await User.findOne({ googleId: profile.id })

      if (user) {
        done(null, user)
      } else {
        let user = await new User({
          googleId: profile.id,
          email: profile._json.email,
          name: profile._json.name,
          photos: profile.photos,
        })
        user.save()

        done(null, user)
      }
    }
  )
)
