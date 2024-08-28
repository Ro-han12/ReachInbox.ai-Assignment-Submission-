"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailQueue = void 0;
const bullmq_1 = require("bullmq");
const emailQueue = new bullmq_1.Queue('emailProcessing');
exports.emailQueue = emailQueue;
