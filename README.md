# SpamWatch Bot

Reporting and information bot for [SpamWatch](https://t.me/SpamWatch). See me in action at https://t.me/SpamWatchBot.

# Development

This bot was created using [grammY](https://grammy.dev) and TypeScript. To build the bot for production just use `npm build` and then run the bot with `node dist/main.js`. Running in development can be done with `npm start`.

### Environment Variables

#### BOT_TOKEN
The API token given by @BotFather on Telegram.

#### SPAMWATCH_HOST
The host to use for the SpamWatch API.

#### SPAMWATCH_API_KEY
The API key to use for the SpamWatch API.

#### REPORT_CHAT_ID
The chat in which to send reports. Reports can be forwarded to the bot, or created using the `/report` command. The bot will then send them on to the given chat. The bot does need to be in the chat to send messages to it of course.

#### ADMIN_CHAT_ID
The chat where unban requests are forwarded. This may also be used for other things, such as logging in the future.

#### SUPER_ADMIN_IDS
A comma separated list of admins that should be able to reply to unban requests.

#### LOGGLY_TOKEN
API token for [Loggly](https://loggly.com). This is used for logging event to the cloud and is not necessary for running the bot.

#### LOGGLY_SUBDOMAIN
Subdomain for Loggly.

#### LOGGLY_TAGS
A comma separated list of tags to use with Loggly.
