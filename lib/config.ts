// Take the config and return a new version where the keys
// dont have a possibility of being undefined. we can assume
// all of these values will exist because of the config preloader.

export const registerConfig = <T extends string>(config: Record<T, string | undefined>): Record<T, string> => {
   let new_config = {} as Record<T, string>;

   for (const variable in config) {
      new_config[variable] = config[variable]!;
   }

   return new_config;
}