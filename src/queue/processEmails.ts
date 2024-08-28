// src/queue/processEmails.ts

import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { emailQueue } from './emailQueue';

// Create a Redis client with connection options
const redisClient = new Redis({
  host: '127.0.0.1',
  port: 6379,
});

// Create a worker to process jobs from the emailProcessing queue
const worker = new Worker('emailProcessing', async job => {
  // Process the email job here
  console.log(`Processing email job: ${JSON.stringify(job.data)}`);
}, { connection: redisClient });

// Optional: Handle worker events
worker.on('error', (err) => {
  console.error('Worker encountered an error:', err);
});

export { worker };
