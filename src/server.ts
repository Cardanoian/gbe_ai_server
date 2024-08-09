import express, { Request, Response, Express } from 'express';

const app: Express = express();
const port: number = 18888;

app.get('/', (req: Request, res: Response) => {
	res.send('<h1>Hello World!!!!!!!!</h1>');
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});
