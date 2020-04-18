module.exports = {
    app: {
        port: process.env.PORT || 3000
    },
    mongo: {
        host: process.env.MONGO_HOST || 'mongo',
        port: process.env.MONGO_PORT || '27017',
        user: process.env.MONGO_USER || 'rankdone',
        password: process.env.MONGO_PASSWD || 'r4bb1TmqR4nkD0n3',
        database: process.env.MONGO_DB_NAME || 'rankdone-chat'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-256-bit-secret'
    }
};