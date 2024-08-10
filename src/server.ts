import express, { Request, Response, Express, NextFunction } from 'express';
import db from './config/database.config';
import { v4 as uuidv4 } from 'uuid';
import { TodoInstance } from './model';
import TodoValidator from './validator';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

let API_KEY: string | undefined = process.env.API_KEY;

console.log(`API_KEY: ${API_KEY}`);

db.sync().then(() => {
	console.log('connect to DB');
});

const app: Express = express();
const port: number = 18888;

// JSON형식으로 된 request 입력받을 수 있음.
app.use(express.json());
app.use(cors());

app.get('/pohang/jiwon/kim', (req: Request, res: Response) => {
	console.log('got a request');
	return res.send(API_KEY);
});

app.post(
	'/create',
	TodoValidator.checkCreateTodo(),
	(req: Request, res: Response, next: NextFunction) => {
		const error = validationResult(req);
		if (!error.isEmpty) {
			return res.json(error);
		}
		next();
	},
	async (req: Request, res: Response) => {
		const id = uuidv4();
		try {
			const record = await TodoInstance.create({ ...req.body, id });
			return res.json({ record, msg: 'Successfully create todo' });
		} catch (e) {
			return res.json({ msg: 'fail to create', status: 500, route: '/create' });
		}
	}
);

app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});
