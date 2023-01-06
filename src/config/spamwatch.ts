import { Client } from 'spamwatch-ts'

const SPAMWATCH_HOST = process.env.SPAMWATCH_HOST!
const SPAMWATCH_API_KEY = process.env.SPAMWATCH_API_KEY!

export const SpamWatch = new Client(SPAMWATCH_API_KEY, SPAMWATCH_HOST)
