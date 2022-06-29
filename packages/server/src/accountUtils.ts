import { Profile } from "passport";
import { IAuth, IAccount, AccountModel } from "./db";
import { findAccount } from "./db";
import { assignAuth } from "./authUtils";


export async function createAccount(auth: IAuth, profile: Profile) {
  const account = await AccountModel.create({
      username: profile.username,
  })
  return await AccountModel.findById(account);
}

export async function findOrCreateAccount(auth: IAuth, profile: Profile) {
  let account: IAccount | undefined = undefined;
  if (auth.account) {
      account = await AccountModel.findById(auth.account)   
  }

  if (!account) {
      account = await createAccount(auth, profile);
  }
  
  assignAuth(auth, account);
  AccountModel.updateOne({ _id: account}, { $addToSet: { auths: auth } } ).exec()

  return account;
}


export async function findOrCreateAsccount(auth: IAuth): Promise<IAccount | undefined> {
  let account: IAccount | undefined = undefined
  let isNew = false

  if (auth.account) {
    account = await findAccount(auth.account)
  }

  return account
}