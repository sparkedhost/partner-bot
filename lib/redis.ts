import { createClient } from 'redis';
import { Logger } from './logger';

const redis = createClient();
const logger = new Logger();

redis.connect().then(() => {
   logger.system('Successfully connected to Redis!');
});

export default redis;