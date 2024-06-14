import { Server } from "@/server";

const main = () => {
   try {
      new Server();
   } catch (error) {
      console.error(`Bootstrap: ${error}`);
      process.exit(1);
   }
};

main();