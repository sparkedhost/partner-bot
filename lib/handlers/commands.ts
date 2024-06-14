import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { CommandStorage } from '@/storage/commands';
import { getExtension } from '../helpers';
import { config } from '@/config';
import { Logger } from '../logger';

let DISCORD_REST = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

export class CommandHandler {
   private commands = new CommandStorage();
   private commandFiles: string[] = [];
   private logger = new Logger();

   constructor() {
      this.loadCommandFiles(join(__dirname, '../../commands'));
   }

   private loadCommandFiles(dir: string) {
      readdirSync(dir).forEach(file => {
         const fullPath = join(dir, file);
         if (statSync(fullPath).isDirectory()) {
            this.loadCommandFiles(fullPath);
         } else if (file.endsWith(`.${getExtension()}`)) {
            this.commandFiles.push(fullPath);
         }
      });
   }

   public async register() {
      this.loadCommands();

      try {
         let commands = await this.commands.getAllCommandsForRest();

         await DISCORD_REST.put(
            Routes.applicationGuildCommands(process.env.DISCORD_APP_ID!, process.env.GUILD_TOKEN!),
            { body: commands },
         );

         this.logger.system(`Successfully reloaded application (/) commands.`);
      } catch (error) {
         throw error;
      }
   }

   private loadCommands() {
      this.commandFiles.forEach(file => {
         let cmd = require(file);
         let cmdClass = new cmd.default();
         this.commands.addCommand({
            builder: cmdClass.command,
            path: file,
         });
      });
   }
}