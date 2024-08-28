// src/services/emailService.ts

import { emailQueue } from '../queue/emailQueue';

async function addEmailJob(to: string, subject: string, body: string) {
  await emailQueue.add('sendEmail', { to, subject, body });
}

export { addEmailJob };
