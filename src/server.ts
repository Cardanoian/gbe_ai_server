import express, { Request, Response, Express } from 'express';
import db from './config/database.config';

db.sync().then(() => {
	console.log('connect to DB');
});

const app: Express = express();
const port: number = 18888;

app.get('/', (req: Request, res: Response) => {
	res.send('<h1>Hello World!!!!!!!!</h1>');
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});
