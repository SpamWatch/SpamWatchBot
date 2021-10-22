import { spamwatch } from '../deps.ts'

const SPAMWATCH_HOST = Deno.env.get('SPAMWATCH_HOST')!
const SPAMWATCH_API_KEY = Deno.env.get('SPAMWATCH_API_KEY')!

export const SpamWatch = new spamwatch.Client(SPAMWATCH_API_KEY, SPAMWATCH_HOST)