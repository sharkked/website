import { Auth, findAccount, findAuthByOpenID } from "./db";
import type { IAccount, IAuth } from './db'
import type { Profile } from "@common/interfaces";
import { TimestampsBase } from "@common/adminInterfaces";

export async function findOrCreateAuth(profile: Profile, accountId: string | undefined): Promise<IAuth> {
  let auth = await findAuthByOpenID(profile.id, profile.provider)
  if (auth) {
    if (!auth) {
      throw new Error("made up bullshit error lol");
    }
  } else {
    auth = await createAuth(profile)
    await auth.save()
  }
  return auth
}

async function createAuth(profile: Profile) {
	if (!profile.id) {
		throw new Error('Missing profile ID');
	}

	return await Auth.create(<IAuth>{
		//account,
		openId: profile.id,
		provider: profile.provider,
		name: profile.username,
		url: profile.url,
		emails: profile.emails || [],
		lastUsed: new Date(),
	});
}

export interface AuthBase<ID> extends TimestampsBase {
  account?: ID,
  openId?: string,
  provider: string,
  name: string,
  url: string,
  emails?: string[],
  disabled?: boolean,
  lastUsed?: Date
}