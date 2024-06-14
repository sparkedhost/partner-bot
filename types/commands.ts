import type { SlashCommandBuilder } from "discord.js";

export type Command = {
   builder: SlashCommandBuilder;
   path: string;
};

export type CommandData = {
   name: string;
   command: SlashCommandBuilder;
   run: (...args: unknown[]) => Promise<void>;
};