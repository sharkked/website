import config from "@/config.json";

export interface AppConfig {
  name?: string;
  description?: string;
  port: number;
  db: string;
  auths?: { [key: string]: unknown};
}

export default config as AppConfig