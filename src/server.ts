import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient({
  log: ['query']
});

app.get('/games', async (req: Request, res: Response) => {
  const games = await prisma.game.findMany();
  
  return res.status(200).json(games);
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