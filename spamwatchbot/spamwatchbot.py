#!/usr/bin/env python
import logging
from telegram import Bot, Update, User, Message, Chat
from telegram.ext import CommandHandler, Filters, MessageHandler, Updater
import dbops as db
import config as cfg

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO)

logger = logging.getLogger(__name__)

update_id = None


def start(bot: Bot, update: Update) -> None:
    pass


def bothelp(bot: Bot, update: Update) -> None:
    pass


def forwarded(bot: Bot, update: Update) -> None:
    chat = update.effective_chat  # type: Chat
    msg = update.effective_message  # type: Message
    usr = update.effective_user  # type: User
    print('yay')


def error(bot, update, error):
    logger.warning('Update "%s" caused error "%s"' % (update, error))


def main():
    updater = Updater(cfg.bottoken)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("help", bothelp))
    # dp.add_handler(MessageHandler(Filters.forwarded, forwarded))

    dp.add_error_handler(error)

    updater.start_polling()

    updater.idle()


if __name__ == '__main__':
    main()
