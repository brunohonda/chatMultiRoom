require('dotenv').config();
require('./src/service/database.service');
const config = require('./src/config');

const app = require('./src/app');
require('./src/service/chat.service').start(app);

app.listen(config.app.port, () => {
    console.log(`Listen port ${config.app.port}`);
});