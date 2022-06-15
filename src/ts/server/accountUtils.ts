import { findAccount } from "./db";
import type { IAccount, IAuth} from './db'

export async function findOrCreateAccount(auth: IAuth): Promise<IAccount | undefined> {
  let account: IAccount | undefined = undefined
  let isNew = false

  if (auth.account) {
    account = await findAccount(auth.account)
  }

  return account
}