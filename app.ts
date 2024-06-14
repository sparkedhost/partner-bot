import { CommandStorage } from "@/storage/commands";
import { Client } from "discord.js";
import { Logger } from "./lib/logger";
import { CommandHandler } from "./lib/handlers/commands";
import { EventHandler } from "./lib/handlers/events";
import { intents } from "./intents";

let bot = new Client({
   intents: intents,
});

export class App {
   private client = bot;
   private commands = new CommandStorage();
   private logger = new Logger();

   constructor({ bot_token }: { bot_token: string }) {
      try {
         this.login(bot_token);
      } catch (error) {
         throw error;
      } finally {
         this.init();
      }
   };

   private init() {
      this.ready();
      this.commandListener();
      this.eventListener();
      this.error();
   };

   private login(token: string) {
      this.client.login(token);
   };

   private ready() {
      this.client.on("ready", (cli) => {
         this.logger.system(`Logged in as ${cli.user.tag}!`);
      });
   };

   private async eventListener() {
      try {
         this.logger.system("Loading and preparing all events...");
         await new EventHandler({ client: this.client }).register();
      } catch (error) {
         throw error;
      }
   }

   private async commandListener() {
      try {
         this.logger.system("Loading and syncing all slash commands...");
         await new CommandHandler().register();
      } catch (error) {
         throw error;
      }

      this.client.on("interactionCreate", async (interaction) => {
         try {
            if (!interaction.isCommand()) return;

            const name = interaction.commandName;
            const cmd = await this.commands.getCommand(name);
            if (!cmd) return;

            const commandFile = require(cmd.path);
            const cmdClass = new commandFile.default();
            await cmdClass.run(interaction);
         } catch (err) {
            console.error(err);
         }
      });
   }

   private error() {
      this.client.on("error", (error) => {
         throw error;
      });
   };
};
