const redis = require('redis');

const client = redis.createClient({
    password: 'Ldz0n1OTrJcsUCeDDm3pBA6RwCboo0AW',
    socket: {
        host: 'redis-10321.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 10321
    }
});

(async () => {
    await client.connect();
})();
client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = client;