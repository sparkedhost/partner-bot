import type { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Logger } from "./logger";

export abstract class Command {
   public abstract name: string;
   public abstract command: SlashCommandBuilder;
   public abstract run(interaction: CommandInteraction): void | Promise<void>;
   public logger = new Logger();
}