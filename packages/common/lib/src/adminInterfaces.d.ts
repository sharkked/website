import type { DisplayLink } from "./interfaces";
export interface OriginInfoBase {
    ip: string;
    country: string;
    last?: Date;
}
export interface TimestampsBase {
    createdAt?: Date;
    updatedAt: Date;
}
export interface AccountBase<ID> extends TimestampsBase {
    name: string;
    birthdate?: Date;
    settings?: any;
    note?: string;
    noteUpdated?: Date;
    pfp?: string;
    pronouns?: string[];
    displayLinks?: DisplayLink[];
}
export interface AuthBase<ID> extends TimestampsBase {
    account?: ID;
    openId?: string;
    provider: string;
    name: string;
    url: string;
    emails?: string[];
    disabled?: boolean;
    lastUsed?: Date;
}
export interface OriginInfo extends OriginInfoBase {
}
export interface Timestamps extends TimestampsBase {
}
export interface Account extends AccountBase<string>, Document {
    nameLower?: string;
    auths?: Auth[];
}
export interface Auth extends AuthBase<string>, Document {
}
export interface OAuthProvider {
    name: string;
    key: string;
    secret: string;
}
//# sourceMappingURL=adminInterfaces.d.ts.map