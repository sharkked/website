import { model, Types, Document, Schema } from 'mongoose'
import type { AuthBase, AccountBase } from '../common/adminInterfaces'

export interface IAuth extends AuthBase<Types.ObjectId>, Document { }

export interface IAccount extends AccountBase<Types.ObjectId>, Document {
  auths?: IAuth[]
}

const authSchema = new Schema({
  account: { type: Schema.Types.ObjectId, index: true, ref: 'Account' },
  openId: String,
  provider: String,
  name: String,
  url: String,
  emails: [String],
  disabled: Boolean,
  settings: { type: Schema.Types.Mixed, default: () => ({}) },
  lastUsed: Date,
}, { timestamps: true })

authSchema.index({ updatedAt: 1 })
authSchema.index({ openId: 1, provider: 1 }, { unique: true })

const accountSchema = new Schema({
  name: String,
  birthdate: Date,
  //settings: [String],
  note: String,
  noteUpdated: Date,
  pfp: String,
  pronouns: [String]
  //displayLinks: DisplayLink[]
})

accountSchema.virtual('auths', {
  ref: 'Auth',
  localField: '_id',
  foreignField: 'account'
})

function nullToUndefined(item: any) {
  return item === null ? undefined : item;
}

export const Auth = model<IAuth>('Auth', authSchema)
export const Account = model<IAccount>('Account', accountSchema)

export type ID = Types.ObjectId | string;

export type FindAuth = (authId: ID, accountId: ID, fields?: string) => Promise<IAuth | undefined>

export const findAuthByOpenId = (openId: string, provider: string): Promise<IAuth | undefined> =>
	Auth.findOne({ openId, provider }).exec().then(nullToUndefined)

export const findAuthByEmail = (emails: string[]): Promise<IAuth | undefined> =>
	Auth.findOne({ emails: { $in: emails } }).exec().then(nullToUndefined)

export const findAuth: FindAuth = (auth, account, fields) =>
	Auth.findOne({ _id: auth, account }, fields).exec().then(nullToUndefined)

export const findAccount = (account: ID, projection?: string): Promise<IAccount | undefined> => 
  Account.findById(account, projection).exec().then(nullToUndefined)