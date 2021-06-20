const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./index.js', { token: require('./config').TOKEN ,totalShards:require('./config').SHARD_COUNT});

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id+1}`));
manager.spawn();