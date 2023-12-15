const appRoot = require('app-root-path');
const app = require(`${appRoot}/app/index.js`);
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`app run at ${port} port`);