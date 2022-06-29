import { Document, Types } from "mongoose";
import {
  getModelForClass,
  index,
  prop,
  Ref,
  ReturnModelType
} from "@typegoose/typegoose";

export interface IAuth extends Auth, Document { }
export interface IAccount extends Account, Document { }

// Schema

@index({ updatedAt: 1 })
@index({ provider: 1, openid: 1 }, { unique: true })
export class Auth {
  @prop({ required: true, ref: () => Account })
  public account!: Ref<Account> | undefined;

  @prop({ required: true })
  public openid!: string;

  @prop({ required: true })
  public provider!: string;

  @prop()
  public name?: string | 
  {
    firstName: string;
    lastName: string;
  };

  @prop()
  url?: string | undefined;

  @prop()
  emails?: string[] | undefined;

  @prop({ default: false })
  disabled?: boolean;

  // @prop()
  // settings?: { type: Schema.Types.Mixed, default: () => ({}) },
  public static async findByAccount(this: ReturnModelType<typeof Auth>, account: Ref<Account>) {
    return this.find({ account }).exec();
  }
}

export class Account {
  @prop({ required: true, default: "New User" })
  public name!: string;
  
  @prop({ required: true, index: true, unique: true})
  public username!: string;

  @prop()
  public birthdate?: Date;

  //settings: [String],
  
  @prop()
  public note?: string;

  @prop()
  public noteUpdated?: Date;

  @prop()
  public pfp?: string;

  @prop()
  public pronouns?: string[];

  //displayLinks: DisplayLink[]

  @prop({ required: true, ref: () => Auth, default: [] })
  public auths!: Ref<Auth>[];
}

// Models

export const AuthModel = getModelForClass(Auth, {
  schemaOptions: { timestamps: true },
})

export const AccountModel = getModelForClass(Account, {
  schemaOptions: { timestamps: true },
})

function nullToUndefined(item: any) {
  return item === null ? undefined : item;
}

// Helper functions

export type ID = Types.ObjectId | string;

export type FindAuth = (authId: ID, accountId: ID, fields?: string) => Promise<IAuth | undefined>

export const findAuthByOpenID = (openId: string, provider: string): Promise<IAuth | undefined> =>
	AuthModel.findOne({ openId, provider }).exec().then(nullToUndefined)

export const findAuth: FindAuth = (auth, account, fields) =>
	AuthModel.findOne({ _id: auth, account }, fields).exec().then(nullToUndefined)

export const findAccount = (account: ID, projection?: string): Promise<IAccount | undefined> => 
  AccountModel.findById(account, projection).exec().then(nullToUndefined)