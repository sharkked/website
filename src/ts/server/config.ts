import config from "../../../config.json";

export interface OAuthConfig {
  name: string,
  key: string,
  secret: string
}

export interface AppConfig {
  name?: string
  description?: string,
  port: number,
  db: string,
  auths?: { [key: string]: OAuthConfig }
}

export default config as AppConfig