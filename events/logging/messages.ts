import { Event } from "@/lib/event";
import type { ClientEvents, Message } from "discord.js";

export default class MessageLogs extends Event {
   public name = "MessageLogs";
   public type: keyof ClientEvents = "messageCreate";
   public once = false;

   public run(message: Message) {
      if (message.author.bot) return;

      return this.logger.system(`(User Msg): ${message.author.tag}: ${message.content}`);
   }
}