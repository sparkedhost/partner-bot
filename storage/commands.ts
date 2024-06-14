import redis from '@/lib/redis';
import type { Command } from '@/types/commands';
import type { SlashCommandBuilder } from 'discord.js';

export class CommandStorage {
   private redis_key = 'discord_commands';

   async addCommand(cmd: Command): Promise<void> {
      const commandData = JSON.stringify(cmd);
      await redis.hSet(this.redis_key, cmd.builder.name, commandData);
   }

   async getCommand(cmdName: string): Promise<Command | null> {
      const commandData = await redis.hGet(this.redis_key, cmdName);
      if (commandData) {
         return JSON.parse(commandData);
      }
      return null;
   }

   async getAllCommands(): Promise<Command[]> {
      const commandsData = await redis.hGetAll(this.redis_key);
      return Object.values(commandsData).map((data) => JSON.parse(data));
   }

   async getAllCommandsForRest(): Promise<Array<{ command: SlashCommandBuilder }>> {
      const commandsData = await redis.hGetAll(this.redis_key);
      return Object.values(commandsData).map((data) => JSON.parse(data).builder);
   }

   async removeCommand(cmdName: string): Promise<void> {
      await redis.hDel(this.redis_key, cmdName);
   }
}
