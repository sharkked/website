import { findAccount, findAuthByOpenId } from "./db";
import type { IAccount, IAuth} from './db'
import type { Profile } from "../common/interfaces";

export async function findOrCreateAuth(profile: Profile, accountId: string | undefined): Promise<IAuth> {
  let auth = await findAuthByOpenId(profile.id, profile.provider)
  
  return auth!
}