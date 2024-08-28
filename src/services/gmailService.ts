import { google } from 'googleapis';
import { oAuth2Client } from '../config/gmailConfig';

export async function listMessages() {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  const res = await gmail.users.messages.list({ userId: 'me' });
  return res.data.messages || [];
}

export async function getEmailContent(messageId: string) {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  const res = await gmail.users.messages.get({ userId: 'me', id: messageId });
  const emailBody = res.data.payload?.body?.data;
  return Buffer.from(emailBody || '', 'base64').toString('utf-8');
}
