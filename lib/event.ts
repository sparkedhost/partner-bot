import { Logger } from "./logger";
import type { ClientEvents } from "discord.js";

export abstract class Event {
   public abstract name: string;
   public abstract type: keyof ClientEvents;
   public abstract once: boolean;
   public abstract run(...args: unknown[]): void | Promise<void>;
   public logger = new Logger();
}