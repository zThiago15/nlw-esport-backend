import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient({
  log: ['query']
});

app.get('/games', async (req: Request, res: Response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          Ad: true
        }
      }
    }
  });
  
  return res.status(200).json(games);
});

app.post('/ads', (req: Request, res: Response) => {
  return res.status(201).json([]);
});

app.get('/games/:id/ads', async (req: Request, res: Response) => {
  const { id } = req.params;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    where: {
      gameId: id
    }, 
    orderBy: {
      createdAt: 'desc'
    }
  });

  return res.status(200).json(ads.map((ad) => ({ ...ad, weekDays: ad.weekDays.split(',') })));
});

app.get('/ads/:id/discord', (req: Request, res: Response) => {
  return res.status(200).json([]);

});

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening at port ${PORT}`))