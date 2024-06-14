import { Command } from "@/lib/command";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export default class PingCommand extends Command {
   public name = "ping";
   public command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Replies with Pong!");

   public async run(interaction: CommandInteraction) {
      // Example of easily logging to console with config name
      // Rather than having to import the config and do it every time
      // this.logger.system("Ping Pong!"); // Output: <config-name>: Ping Pong!

      await interaction.reply({ content: "Pong!", ephemeral: false });
   }
};