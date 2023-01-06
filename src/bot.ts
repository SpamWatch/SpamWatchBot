import winston from 'winston'
import { hydrate } from "@grammyjs/hydrate";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
import { hydrateScene } from "basic-scene";
import { Bot, BotError, GrammyError, HttpError, session } from "grammy";
import { BOT_TOKEN, BotContext, SessionData } from "./constants";
import I18nMiddleware from "./middleware/i18n.middleware"

if (!BOT_TOKEN) {
  throw new Error("No BOT_TOKEN found");
}

export const bot = new Bot<BotContext>(BOT_TOKEN);

bot.use(async (ctx, next) => {
  if (ctx.message.chat.type === "private")
    await next()
})

bot.use(session({
  initial(): SessionData {
    return {
      reportType: undefined,
      reportContent: undefined,
      reportEntity: undefined,
    }
  }
}))

bot.use(hydrate());
bot.use(hydrateReply);
bot.use(hydrateScene);
bot.use(I18nMiddleware);

bot.api.config.use(parseMode("Markdown"));

bot.catch((err) => {
  const ctx = err.ctx;
  winston.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof BotError) {
    winston.error("Error in bot: ", e.ctx)
  } else if (e instanceof GrammyError) {
    winston.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    winston.error("Could not contact Telegram:", e);
  } else {
    winston.error("Unknown error:", e);
  }
})

export const botPrivate = bot.filter(ctx => ctx.chat?.type === 'private');
