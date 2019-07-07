module.exports = function(commands, triggers, users) {
    loadTriggers = function(bot) {
        triggers = reload('./triggers.json');
        reload('./globals')({bot: bot, config: config, triggers: triggers, commands: commands, users: users});
        console.log("[INIT] Triggers loaded...");
    }
    loadCommands = function(bot) {
        commands = [];
        try {
            var dir = dpath.resolve(__dirname, './commands') + '/';
            fs.readdirSync(dir).forEach(function (file) {
                if (file.indexOf(".js") > -1) {
                    var command = reload(dir + file);
                    commands.push(command);
                }
            });
            reload('./globals')({bot: bot, config: config, triggers: triggers, commands: commands, users: users});
            console.log("[INIT] " + commands.length + " Commands loaded...");
        } catch (e) {
            console.error('Unable to load command: ', e.stack);
        }
    }
    loadGames = function(bot) {
        try {
            var dir = dpath.resolve(__dirname, './games') + '/';
            fs.readdirSync(dir).forEach(function (file) {
                if (file.indexOf(".js") > -1) {
                    reload(dir + file)(bot);
                }
            });
            console.log("[INIT] Games loaded...");
        } catch (e) {
            console.error('Unable to load games: ', e.stack);
        }
    }
    loadEvents = function(bot) {
        try {
            var dir = dpath.resolve(__dirname, './events') + '/';
            fs.readdirSync(dir).forEach(function (file) {
                if (file.indexOf(".js") > -1) {
                    reload(dir + file)(bot);
                }
            });
            console.log("[INIT] Events loaded...");
        } catch (e) {
            console.error('Unable to load event: ', e.stack);
        }
    }
    loadFunctions = function(bot) {
        try {
            var dir = dpath.resolve(__dirname, './functions') + '/';
            fs.readdirSync(dir).forEach(function (file) {
                if (file.indexOf(".js") > -1) {
                    reload(dir + file)(bot);
                }
            });
            console.log("[INIT] Functions loaded...");
        } catch (e) {
            console.error('Unable to load function: ', e.stack);
        }
    }
    loadUsers = function(bot) {
        users = reload('./users.json');
        reload('./globals')({bot: bot, config: config, triggers: triggers, commands: commands, users: users});
        console.log("[INIT] Users loaded...");        
    }
}