import { config, type ConfigOptions } from "@/config";
import { Logger } from "../logger";

const logger = new Logger();

export const verify_config = () => {
   logger.text("Preloader: Verifying config...");

   for (const variable in config) {
      if (!config[variable as ConfigOptions]) {
         throw new Error(`App: Missing config variable "${variable}". Please make sure to define it in the config.ts file (If you're using env, make sure to set it in your .env file as well).`);
      }
   }

   logger.text("Preloader: The config check has been passed.");

   return true;
};