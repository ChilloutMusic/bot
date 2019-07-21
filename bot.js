var PlugAPI = require('plugapi');
var config = require('./config.json');
const dotenv = require('dotenv');
dotenv.config();

var commands = [];
var triggers;
var users;
var history;

new PlugAPI({
    email: process.env.BOT_EMAIL || '',
    password: process.env.BOT_PASSWD || ''
}, function (err, bot) {
    if (err) {
        console.log('Error initializing PlugAPI: ' + err);
    } else {
        bot.multiLine = true;
        bot.multiLineLimit = 5;
        bot.deleteCommands = false;

        require('./globals')({bot: bot, config: config, triggers: triggers, commands: commands, users: users, history: history});
        require('./init')(commands, triggers, users, history);

        loadTriggers(bot);
        loadCommands(bot);
        loadUsers(bot);
        loadHistory(bot);
        loadGames(bot);
        loadEvents(bot);
        loadFunctions(bot);

        const reconnect = () => { bot.connect(config.settings.room); };
        reconnect();

        bot.on('close', reconnect);
        bot.on('error', reconnect);
    }
});