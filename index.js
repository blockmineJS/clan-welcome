module.exports = (bot, options) => {
    const log = bot.sendLog;
    const settings = options.settings;
    const welcomeMessages = settings.welcomeMessages || [];

    if (welcomeMessages.length === 0) {
        log('[ClanWelcome] Сообщения для приветствия не настроены. Плагин не будет работать.');
        return;
    }

    const onPlayerJoinedClan = (data) => {
        const username = data.username;
        if (!username) return;

        const messageTemplate = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        
        const finalMessage = messageTemplate.replace(/{username}/g, username);

        log(`[ClanWelcome] Игрок ${username} вошел в клан. Отправка приветствия: "${finalMessage}"`);
        
        bot.api.sendMessage('clan', finalMessage);
    };

    bot.events.on('clan:player_joined', onPlayerJoinedClan);

    bot.once('end', () => {
        bot.events.removeListener('clan:player_joined', onPlayerJoinedClan);
        log('[ClanWelcome] Плагин выгружен, слушатель "clan:player_joined" отключен.');
    });

    log('[ClanWelcome] Плагин для приветствия в клане загружен и слушает события от clan-events-keksik.');
};
