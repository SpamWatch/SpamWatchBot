#!/usr/bin/env python
"""
Main bot module.
"""
import logging
from telegram import Bot, Update, User, Message, Chat, ReplyKeyboardMarkup
from telegram.ext import CommandHandler, Filters, MessageHandler, Updater, ConversationHandler, RegexHandler
import dbops as db
import config as cfg

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO)

logger = logging.getLogger(__name__)

update_id = None

CHOOSING, PROOF, TYPING_CHOICE = range(3)


def start(bot: Bot, update: Update) -> None:
    pass


def bothelp(bot: Bot, update: Update) -> None:
    pass


reply_keyboard = [['Message from the offender'],
                  ['Warn or Ban message from The Guard'],
                  ['Cancel']]
markup = ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True)


def from_offender(bot: Bot, update: Update, user_data) -> None:
    chat: Chat = update.effective_chat
    msg: Message = update.effective_message
    usr: User = update.effective_user
    msg_from: User = user_data["forwarded_update"].forward_from
    msg.reply_text((f'The offender is named {msg_from.first_name} {msg_from.last_name} and has the following ID: {msg_from.id}\n\nDo you want to send proof incase its clearly spam ?'))


def from_the_guard(bot: Bot, update: Update, user_data) -> None:
    chat: Chat = update.effective_chat
    msg: Message = update.effective_message
    usr: User = update.effective_user
    msg.reply_text('from_the_guard')
    msg.forward_from


def fallback(bot: Bot, update: Update) -> None:
    chat: Chat = update.effective_chat
    msg: Message = update.effective_message
    usr: User = update.effective_user
    msg.reply_text('fallback', reply_markup='')
    return ConversationHandler.END


def forwarded(bot: Bot, update: Update, user_data) -> None:
    chat: Chat = update.effective_chat
    msg: Message = update.effective_message
    usr: User = update.effective_user
    user_data['forwarded_update'] = msg
    msg.reply_text(f'What type of message was forwarded ?', reply_markup=markup)
    return CHOOSING


def error(bot, update, error):
    logger.warning('Update "%s" caused error "%s"' % (update, error))


def main():
    updater = Updater(cfg.bottoken)
    dp = updater.dispatcher

    conv_handler = ConversationHandler(
        entry_points=[MessageHandler(Filters.forwarded, forwarded, pass_user_data=True)],

        states={
            CHOOSING: [RegexHandler('^Message from the offender$',
                                    from_offender,
                                    pass_user_data=True),
                       RegexHandler('^Warn or Ban message from The Guard$',
                                    from_the_guard,
                                    pass_user_data=True)
                       ],
            PROOF: []
        },

        fallbacks=[RegexHandler('^Cancel$', fallback)]
    )

    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("help", bothelp))
    dp.add_handler(CommandHandler("cancel", fallback))
    dp.add_handler(conv_handler)

    dp.add_error_handler(error)

    updater.start_polling()

    updater.idle()


if __name__ == '__main__':
    main()
