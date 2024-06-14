// any config variable used by the app should be defined here
// i would recommend still using env for this, but just integrate them here

import { registerConfig } from "./lib/config";

const options = {
   NAME: process.env.NAME,
   DISCORD_TOKEN: process.env.DISCORD_TOKEN,
   DISCORD_APP_ID: process.env.DISCORD_APP_ID,
   GUILD_TOKEN: process.env.GUILD_TOKEN,
};

export const config = registerConfig<ConfigOptions>(options);

export type ConfigOptions = keyof typeof options;
