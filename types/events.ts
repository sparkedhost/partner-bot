export type Event = {
   name: string;
   type: string;
   once: boolean;
   path: string;
}

export type EventData = {
   name: string;
   type: string;
   once: boolean;
   run(...args: unknown[]): void | Promise<void>;
}
