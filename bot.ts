import {
  Bot,
  BotError,
  GrammyError,
  HttpError,
  hydrate,
  hydrateReply,
  hydrateScene,
  parseMode,
  session,
} from "./deps.ts";
import { BOT_TOKEN, BotContext, SessionData } from "./constants.ts";
import I18nMiddleware from "./middleware/i18n.middleware.ts"

if (!BOT_TOKEN) {
  throw new Error("No BOT_TOKEN found");
}

export const bot = new Bot<BotContext>(BOT_TOKEN);

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
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof BotError) {
    console.error("Error in bot: ", e.ctx)
  } else if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
})