import type { Profile } from "@cafe/common";
import { TimestampsBase } from "@cafe/common";
import { AuthModel, IAuth, IAccount } from './db';

export async function findOrCreateAuth(profile: Profile, account: string | undefined) {
    const auth = await AuthModel.findOneAndUpdate(
        { openid: profile.id, provider: profile.provider }, 
        { $setOnInsert: { 
            account,
            openid: profile.id, 
            provider: profile.provider 
        } },
        { new: true, upsert: true }
    );
    return auth;
}

export async function assignAuth(auth: IAuth, account: IAccount) {
    if (!auth.account && auth.account != account) {
        await AuthModel.findByIdAndUpdate(auth._id, { account: account });
    }
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