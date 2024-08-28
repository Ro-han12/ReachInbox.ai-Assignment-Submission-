// src/app.ts

import express from 'express';
import { addEmailJob } from './services/emailService';

const app = express();
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;
  try {
    await addEmailJob(to, subject, body);
    res.status(200).send('Email job added to the queue.');
  } catch (error) {
    res.status(500).send('Error adding email job.');
  }
});

export { app };
