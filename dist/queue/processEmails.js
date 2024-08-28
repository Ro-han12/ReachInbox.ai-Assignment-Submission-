"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.worker = void 0;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const gmailService_1 = require("../services/gmailService");
const openaiConfig_1 = require("../config/openaiConfig");
// Create a new Redis connection
const connection = new ioredis_1.default({
    host: 'localhost',
    port: 6379, // replace with your Redis port
});
// Define the queue with the correct connection
const emailQueue = new bullmq_1.Queue('emailProcessing', { connection });
// Setup a QueueScheduler to handle stalled jobs
new bullmq_1.QueueScheduler('emailProcessing', { connection });
// Define a worker to process the jobs
const worker = new bullmq_1.Worker('emailProcessing', async (job) => {
    const messages = await (0, gmailService_1.listMessages)();
    for (const message of messages) {
        const content = await (0, gmailService_1.getEmailContent)(message.id || '');
        const context = await openaiConfig_1.openai.createChatCompletion({
            model: 'gpt-4',
            messages: [{ role: 'user', content }],
        });
        const reply = await generateReply(context?.data.choices[0].message?.content || '');
        // Send the reply using Gmail API (code not shown, but similar to fetching email)
    }
}, { connection }); // Ensure worker uses the correct queue connection
exports.worker = worker;
// Function to generate a reply using OpenAI
async function generateReply(context) {
    const response = await openaiConfig_1.openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
            { role: 'system', content: 'Generate a polite email reply based on the following context.' },
            { role: 'user', content: context },
        ],
    });
    return response.data.choices[0].message?.content;
}
