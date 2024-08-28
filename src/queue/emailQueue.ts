

import { Queue } from 'bullmq';
import Redis from 'ioredis';

// Create a Redis client with connection options
const redisClient = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379', 10), // Provide a default value here
});

// Handle Redis connection events
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Create the email processing queue with Redis connection
const emailQueue = new Queue('emailProcessing', { connection: redisClient });

export { emailQueue };
