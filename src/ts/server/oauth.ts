import { Strategy as TwitterStrategy } from 'passport-twitter'
import passport from 'passport'
import config from './config'
import { Account } from './db'

export default passport.use(new TwitterStrategy({
    consumerKey: config.auths!.twitter.key,
    consumerSecret: config.auths!.twitter.secret,
    callbackURL: 'http://localhost:8080/auth/twitter/callback'
  }, (token, tokenSecret, profile, cb) => {
    console.log(profile.id)
    console.log(token)
    return cb(null, profile.id)
  }))