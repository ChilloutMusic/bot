module.exports = function(bot) {
	bot.on('advance', function(data) {
		announceSong();
		if (data.lastPlay.media !== null) {
			var basic = {
				"cid": data.lastPlay.media.cid,
				"type": data.lastPlay.media.type,
				"title": data.lastPlay.media.title,
				"artist": data.lastPlay.media.author,
				"duration": data.lastPlay.media.duration,
				"timestamp": data.startTime,
				"woots": data.lastPlay.score.positive,
				"mehs": data.lastPlay.score.negative,
				"grabs": data.lastPlay.score.grabs,
				"skipped": data.lastPlay.score.skipped,
				"listeners": data.lastPlay.score.listeners,
				"user": {
					"username": data.lastPlay.dj.username,
					"id": data.lastPlay.dj.id
				}
			}
			history.last10.unshift(basic);
			history.last10.pop();
			history.last24h.push(basic);
			var i = history.last24h.length;
			while(i--) {
				if (new Date(history.last24h[i].timestamp) < new Date((Math.round(new Date().getTime() / 1000) - 86400)*1000)) {
					history.last24h.splice(i, 0);
				}
			}
			var historyID = data.lastPlay.media.cid;
			if (data.lastPlay.media.format == 1) {
				historyID = 'yt' + data.lastPlay.media.cid;
			} else {
				historyID = 'sc' + data.lastPlay.media.cid
			}
			if (history.all[historyID]) {
				history.all.historyID["latest"] = {
					"timestamp": data.startTime,
					"woots": data.lastPlay.score.positive,
					"mehs": data.lastPlay.score.negative,
					"grabs": data.lastPlay.score.grabs,
					"skipped": data.lastPlay.score.skipped,
					"listeners": data.lastPlay.score.listeners,
					"user": {
						"username": data.lastPlay.dj.username,
						"id": data.lastPlay.dj.id
					}
				}
				history.all.historyID["total"] = {
					"plays": history.all.historyID.total.plays++,
					"woots": history.all.historyID.total.woots + data.lastPlay.score.positive,
					"mehs": history.all.historyID.total.mehs + data.lastPlay.score.negative,
					"grabs": history.all.historyID.total.grabs + data.lastPlay.score.grabs,
					"skips": history.all.historyID.total.skips + data.lastPlay.score.skipped
				}
			} else {
				history.all[historyID] = {
					"cid": data.lastPlay.media.cid,
					"type": data.lastPlay.media.type,
					"title": data.lastPlay.media.title,
					"artist": data.lastPlay.media.author,
					"duration": data.lastPlay.media.duration, 
					"timestamp": data.startTime,
					"latest": {
						"timestamp": data.startTime,
						"woots": data.lastPlay.score.positive,
						"mehs": data.lastPlay.score.negative,
						"grabs": data.lastPlay.score.grabs,
						"skips": data.lastPlay.score.skipped,
						"listeners": data.lastPlay.score.listeners,
						"user": {
							"username": data.lastPlay.dj.username,
							"id": data.lastPlay.dj.id
						}
					},
					"total": {
						"plays": 1,
						"woots": data.lastPlay.score.positive,
						"mehs": data.lastPlay.score.negative,
						"grabs": data.lastPlay.score.grabs,
						"skips": data.lastPlay.score.skipped
					}
				}
			}

			fs.writeFileSync('./history.json', JSON.stringify(history));
			loadHistory(bot);
		}
	});
}