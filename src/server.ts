import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'hey' });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening at port ${PORT}`))