"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oAuth2Client = void 0;
const googleapis_1 = require("googleapis");
const oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'http://localhost:3000/oauth2callback');
exports.oAuth2Client = oAuth2Client;
