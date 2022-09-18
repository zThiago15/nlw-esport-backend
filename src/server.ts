import express, { Request, Response } from 'express';

const app = express();

app.get('/games', (req: Request, res: Response) => {
  return res.status(200).json([]);
});

app.post('/ads', (req: Request, res: Response) => {
  return res.status(201).json([]);
});

app.get('/games/:id/ads', (req: Request, res: Response) => {
  const { id } = req.params;

  return res.status(200).json([
    { id: 1, name: 'anuncio 1' }
  ]);
});

app.get('/ads/:id/discord', (req: Request, res: Response) => {
  return res.status(200).json([]);

});

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening at port ${PORT}`))