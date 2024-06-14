import { GatewayIntentBits, type GatewayIntentBits as IntentType } from "discord.js";

export const intents: Array<IntentType> = [
   GatewayIntentBits.Guilds,
   GatewayIntentBits.GuildMessages,
   GatewayIntentBits.GuildMembers,
   GatewayIntentBits.GuildPresences,
   GatewayIntentBits.GuildMessageReactions,
   GatewayIntentBits.DirectMessages,
   GatewayIntentBits.DirectMessageReactions,
   GatewayIntentBits.GuildVoiceStates,
   GatewayIntentBits.MessageContent,
];