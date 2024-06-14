import { App } from '@/app';
import { config } from "@/config";
import { verify_config } from './lib/preloaders/verify_config';
import { Logger } from './lib/logger';

export class Server {
   private logger = new Logger();

   constructor() {
      this.main();
   }

   private async main() {
      this.logger.text('Bootstrap: Executing preloaders...');
      verify_config();

      try {
         this.logger.system('Connecting to Discord bot application...');
         new App({ bot_token: config.DISCORD_TOKEN });
      } catch (error) {
         throw error;
      }
   }
}