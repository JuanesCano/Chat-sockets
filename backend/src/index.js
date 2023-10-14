import express from 'express';
import { socket } from './socket/chatSocket.js';

const app = express();
app.set('port', 5000);

const server = app.listen(app.get('port'), () => {console.log('servidor escuchando por el puerto', app.get('port'));});

socket(server);       