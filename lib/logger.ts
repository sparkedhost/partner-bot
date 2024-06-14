import { config } from "@/config";

export class Logger {
   public system(message: string) {
      console.log(`${config.NAME} - ${message}`);
   }

   public text = (message: string) => {
      console.log(message);
   };

   public error = (message: string) => {
      console.error(message);
   };

   public warn = (message: string) => {
      console.warn(message);
   };

   public info = (message: string) => {
      console.info(message);
   };

   public debug = (message: string) => {
      console.debug(message);
   };

   public trace = (message: string) => {
      console.trace(message);
   };
}