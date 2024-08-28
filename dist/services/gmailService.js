"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailContent = exports.listMessages = void 0;
const googleapis_1 = require("googleapis");
const gmailConfig_1 = require("../config/gmailConfig");
async function listMessages() {
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth: gmailConfig_1.oAuth2Client });
    const res = await gmail.users.messages.list({ userId: 'me' });
    return res.data.messages || [];
}
exports.listMessages = listMessages;
async function getEmailContent(messageId) {
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth: gmailConfig_1.oAuth2Client });
    const res = await gmail.users.messages.get({ userId: 'me', id: messageId });
    const emailBody = res.data.payload?.body?.data;
    return Buffer.from(emailBody || '', 'base64').toString('utf-8');
}
exports.getEmailContent = getEmailContent;
