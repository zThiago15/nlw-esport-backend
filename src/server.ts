import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import convertHoursToMinutes from './utils/convertHoursToMinutes';
import convertMinutesToHours from './utils/convertMinutesToHours';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors());

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

app.post('/games/:id/ads', async (req: Request, res: Response) => {
  const gameId = req.params.id;

  const {
    name,
    discord,
    weekDays,
    useVoiceChannel,
    yearsPlaying,
    hourStart,
    hourEnd } = req.body;

    const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(','),
      useVoiceChannel,
      hourStart: convertHoursToMinutes(hourStart),
      hourEnd: convertHoursToMinutes(hourEnd)
    }
  })

  return res.status(201).json(ad);
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

  return res.status(200).json(ads.map((ad) => ({ 
    ...ad, 
    weekDays: ad.weekDays.split(','),
    hourStart: convertMinutesToHours(ad.hourStart),
    hourEnd: convertMinutesToHours(ad.hourEnd)
  })));
});

app.get('/ads/:id/discord', async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id
    }
  })

  return res.status(200).json(result);

});

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening at port ${PORT}`))