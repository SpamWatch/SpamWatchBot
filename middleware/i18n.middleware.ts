import { BotContext } from "../constants.ts";
import { i18next } from "../deps.ts";

export default async (ctx: BotContext, next: any) => {
    const lang = ctx.message?.from?.language_code;
    ctx.i18n = i18next.cloneInstance({ lang });
    await next();
}
