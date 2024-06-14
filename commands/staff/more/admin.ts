import { Command } from "@/lib/command";
import { PermissionFlagsBits } from "discord.js";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export default class SomeRandomCommand extends Command {
   // Example of a command that isnt global and checks for specific permissions
   // This wont only restrict the command from being used but also its visibility

   // You can also nest command files as deep as you"d like, the command handler
   // will read every file under the commands directory and load them all. Since discord uses
   // the name set by the command builder, you can name the file and class name anything youd like

   public name = "admin";
   public command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("This command works for admins only!")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

   public async run(interaction: CommandInteraction) {
      await interaction.reply({ content: "Wow you are an admin amazing!", ephemeral: false });
   }
};