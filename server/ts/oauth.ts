import { Strategy as TwitterStrategy } from 'passport-twitter'
import { Strategy as GithubStrategy } from 'passport-github'
import { Profile } from '@common/interfaces'
import passport from 'passport'
import config from './config'
import { findOrCreateAuth } from './authUtils'

export default function() : string[] {
  const auths = config.auths
  let usingAuths: string[] = []

  if (auths) {
    if (auths.twitter !== undefined) {
      passport.use(new TwitterStrategy({
        consumerKey: auths.twitter.key,
        consumerSecret: auths.twitter.secret,
        callbackURL: 'http://localhost:8080/auth/twitter/callback'
      }, (token, tokenSecret, profile, cb) => {
        console.log('hi')
        findOrCreateAuth(getProfile(profile as OAuthProfile, "twitter"), "")
        .catch((err) => {
          return cb(err, profile.id)
        })
      }));
    }
    
    if (auths.github !== undefined) {
      passport.use(new GithubStrategy({
        clientID: auths.github.key,
        clientSecret: auths.github.secret
      }, (accessToken, refreshToken, profile, cb) => {
        console.log(profile.id)
        console.log(accessToken)
        return cb(null, profile.id)
      }))
    }
    usingAuths = Object.keys(auths)
  }

  return usingAuths
}

export function getProfile(profile: OAuthProfile, provider: string) {
  return {
    id: profile.id,
    provider: provider,
    emails: [],
    name: profile.displayName,
    username: profile.username || profile.displayName,
    url: "",
    createdAt: new Date(),
    suspended: false
  }
}

export interface OAuthProfile {
  provider: string;
  id: string;
  displayName: string;
  username?: string | undefined;
  name?: string | {
      familyName: string;
      givenName: string;
      middleName?: string | undefined;
  } | undefined;
  emails?: Array<{
      value: string;
      type?: string | undefined;
  }> | undefined;
  photos?: Array<{
      value: string;
  }> | undefined;
}