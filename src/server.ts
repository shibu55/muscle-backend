import express from 'express';
import PingController from './controllers/ping';
const cors = require('cors');

const app = express();
const port = 8080;

const pingController = new PingController();
app.use(cors());
app.get('/ping', (req, res) => pingController.ping(req, res));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});