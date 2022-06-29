import { Request } from 'express';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github';

export type OAuthProfileName = string | { familyName: string; givenName: string; };

export interface OAuthProfile {
	id?: string;
	name?: OAuthProfileName;
	username?: string;
	displayName?: string;
	emails?: { value: string; }[];
	provider: string;
	gender?: string;
	profileUrl?: string;
	_raw: string;
	_json: any;
}

export interface Strategy {
	new(
		options: any,
		callback: (
			req: Request,
			accessToken: string,
			refreshToken: string,
			profile: OAuthProfile,
			callback: VerifyCallback
    ) => void
  ) : any;
}

export interface OAuthProviderInfo {
	id: string;
	// name: string;
	// color: string;
	strategy: Strategy;
	auth?: any;
	connectOnly?: boolean;
	additionalOptions?: any;
}

const providerList: OAuthProviderInfo[] = [
  {
    id: "github",
    strategy: GithubStrategy,
  },
  {
    id: "google",
    strategy: GoogleStrategy,
  },
  {
    id: "twitter",
    strategy: TwitterStrategy,
  },
];

export const providers = providerList;
