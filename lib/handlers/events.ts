import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { getExtension } from '../helpers';
import type { Client } from 'discord.js';

export class EventHandler {
   private eventFiles: string[] = [];
   private client: Client | null = null;

   constructor({ client }: { client: Client }) {
      this.loadEventFiles(join(__dirname, '../../events'));
      this.client = client;
   }

   private loadEventFiles(dir: string) {
      readdirSync(dir).forEach(file => {
         const fullPath = join(dir, file);
         if (statSync(fullPath).isDirectory()) {
            this.loadEventFiles(fullPath);
         } else if (file.endsWith(`.${getExtension()}`)) {
            this.eventFiles.push(fullPath);
         }
      });
   }

   public async register() {
      this.loadEvents();
   }

   private loadEvents() {
      this.eventFiles.forEach(file => {
         let event = require(file);
         let eventClass = new event.default();
         if (eventClass.once) {
            this.client!.on(eventClass.type, eventClass.run);
         } else {
            this.client!.on(eventClass.type, (...args) => {
               eventClass.run(...args);
            });
         }
      });
   }
}